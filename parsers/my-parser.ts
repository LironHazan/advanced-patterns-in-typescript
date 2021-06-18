import Parsimmon from 'parsimmon';
const P = Parsimmon;

let MyFooQueryLang = P.createLanguage({
  // `r` eq rules.
  dummy_query: (r) => r.expression.many(),

  expression: (r) => P.alt(r.base, r.sub),

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

export function parseDummyQL<T>(query: string): T {
  return MyFooQueryLang.dummy_query.tryParse(query);
}
