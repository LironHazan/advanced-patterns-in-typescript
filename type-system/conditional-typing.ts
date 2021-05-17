// simple conditional typing

import { List } from 'ts-toolbelt/out/List/List';

type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;
type testH = Head<[1, 2, 3, 4]>;
const one: testH = 1; // valid
const two: testH = 2; // Type '2' is not assignable to type '1'

interface BarModel {
  tag: string;
  index: number;
  parent: BarModel | null;
}

type MaybeChild<A> = A extends {
  tag: string;
  index: number;
}
  ? BarModel
  : A;

const child: MaybeChild<BarModel> = {
  tag: 'foo',
  index: 0,
  parent: { tag: 'fooParent', index: 1, parent: null },
};

const nonChild: MaybeChild<{ tag: string }> = {
  tag: 'baz',
};

// researched the use of "infer" keyword - my findings:

// vscode - used it about ~ 7 times

// type ComputedEditorOptionValue<T extends IEditorOption<any, any>> =
//     T extends IEditorOption<any, infer R> ? R : never;

// copied from official utility types
type ReturnTypeT<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
