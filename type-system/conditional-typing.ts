// simple conditional typing

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

// angular components - used it about 4 times?

interface ITree<T> {
  id: string;
  children: ITree<T>[];
  parent: ITree<T> | null;
}

export type Children<T> = T extends ITree<infer Child> ? Child : null;
