import * as ts from 'typescript';

const source = `
  const sixsixsix = 666;
`;

function numToStringTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
  return (context) => {
    const visit: ts.Visitor = (node) => {
      if (ts.isNumericLiteral(node)) {
        // check why is it deprecaated
        return ts.createStringLiteral(node.text);
      }
      return ts.visitEachChild(node, (child) => visit(child), context);
    };

    return (node) => ts.visitNode(node, visit);
  };
}

let result = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
  transformers: { before: [numToStringTransformer()] },
});

console.log(result.outputText);
