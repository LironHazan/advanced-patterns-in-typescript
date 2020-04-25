interface TreeNode {
    marked: boolean;
    children: TreeNode[];
}

interface NodeVisitor<T extends { marked: boolean }> {
     visit(node: T): void;
}

class Visitor implements NodeVisitor<TreeNode> {
    visit(node: TreeNode): void {
        node.marked = true;
    }

    // Opinion - I implemented a similar purpose visitor just in a static way without using
    // much abstractions
    static checkNode(node: TreeNode) {
        node.marked = true;
    }
}

interface Visitable {
    accept(visitor: NodeVisitor<TreeNode>, node: TreeNode): void;
}

class TreeComponent implements Visitable {
    root: TreeNode = { marked: false, children: [{ marked: false, children: []}, { marked: false, children: [{ marked: false, children: []}]}]};
    constructor(private visitor: Visitor) {}

    accept(visitor: NodeVisitor<TreeNode>, node: TreeNode): void {
        visitor.visit(node);
    }

    checkNodes(root: TreeNode) { // dfs
        for (const node of root.children) {
           //Opinion: clearer-->  Visitor.checkNode(node);
            this.accept(this.visitor, node);
            if (node.children.length !== 0) {
                this.checkNodes(node);
            }
        }
    }

    doSomething() {
        this.accept(this.visitor, this.root);
        if (this.root.children.length === 0) return;
        this.checkNodes(this.root);
    }
}

const tVisitor = new Visitor();
const tc = new TreeComponent(tVisitor);
console.log(JSON.stringify(tc.root));
tc.doSomething();
console.log(JSON.stringify(tc.root));

