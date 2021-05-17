import Parsimmon, { whitespace } from 'parsimmon';
const P = Parsimmon;

let MyFooQueryLang = P.createLanguage({
  // `r` eq rules.
  expression: (r) => P.alt(r.base, r.sub),
  query: (r) => r.expression.many(),

  base: (r) => P.seq(r.field, r.operator, r.value),
  sub: (r) => P.seq(P.alt(r.and, r.or), r.base),

  field: () => P.string('foo').skip(P.optWhitespace).desc('field'),

  operator: () => P.string('==').skip(P.optWhitespace).desc('operator'),

  and: () => P.string('&&').skip(P.optWhitespace).desc('and'),
  or: () => P.string('||').skip(P.optWhitespace).desc('or'),

  value: () =>
    P.string('"')
      .then(P.regex(/[^"]+/))
      .map((lifted) => `${lifted} 🍕`) // fp awesomeness 🤟
      .skip(P.string('"'))
      .skip(P.optWhitespace)
      .desc('value'),
});

let textWithSpaces = `foo == "hey there" && foo == "eatPizza"`;
let text = `foo=="hey there"`;

function prettyPrint(x: any) {
  let opts = { depth: null, colors: 'auto' };
  console.log(x, opts);
}

let ast = MyFooQueryLang.query.tryParse(textWithSpaces);
prettyPrint(ast);
