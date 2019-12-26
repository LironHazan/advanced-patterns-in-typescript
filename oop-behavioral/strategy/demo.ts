interface GraphModel {
    name: string;
    id: string;
    children: GraphModel[];
    linksId: string[]
}

interface GraphUpdateStrategy {
    update(): void;
    onNodeClick(): void;
    onLinkHover(): void;
}

class FooGraphUpdater implements GraphUpdateStrategy{

    onLinkHover(): void {
        console.log('hover on node', FooGraphUpdater.name);
    }

    onNodeClick(): void {
        console.log('clicked on node', FooGraphUpdater.name);
    }

    update(): void {
        console.log('updating foo', FooGraphUpdater.name);
    }

}

class BarGraphUpdater implements GraphUpdateStrategy{
    onLinkHover(): void {
        console.log('hover on node', BarGraphUpdater.name);
    }

    onNodeClick(): void {
        console.log('clicked on node', BarGraphUpdater.name);
    }

    update(): void {
        console.log('updating foo', BarGraphUpdater.name);
    }

}

class GraphContext {
    graphUpdater: GraphUpdateStrategy;

    constructor(graphUpdater: GraphUpdateStrategy) {
        this.graphUpdater = graphUpdater;
    }

    clickNode() {
        this.graphUpdater.onNodeClick();
    }
}

const graphComponentA = new GraphContext(new BarGraphUpdater());
graphComponentA.clickNode();

const graphComponentB = new GraphContext(new FooGraphUpdater());
graphComponentB.clickNode();
