

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

export type Children<T> = T extends ITree<infer Child>? Child : null;

// WIP
