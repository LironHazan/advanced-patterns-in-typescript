import { parseDummyQL } from './my-parser';

function prettyPrint(x: any) {
  let opts = { depth: null, colors: 'auto' };
  console.log(x, opts);
}

let textWithSpaces = `foo == "hey there" && foo == "eatPizza"`;

let ast = parseDummyQL(textWithSpaces);
prettyPrint(ast);
