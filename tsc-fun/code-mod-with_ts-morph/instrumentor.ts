import { Project } from 'ts-morph';

export async function injectDummyProfiler(filePath: string, className: string, methodName: string) {
  const project = new Project();
  project.addSourceFileAtPathIfExists(filePath);
  const sourceFile = project.getSourceFiles()[0];
  const method = sourceFile.getClassOrThrow(className).getMethodOrThrow(methodName);

  method.insertStatements(0, `console.time('profiling');`);
  method.addStatements(`console.timeEnd('profiling');`);

  console.log(sourceFile.getFullText());
  await project.save();
}

injectDummyProfiler(
  '/Users/lironh/dev-liron/advanced-patterns-in-typescript/tsc-fun/code-mod-with_ts-morph/modify-me.ts',
  'Runner',
  'run'
).then((_) => console.log('done'));
