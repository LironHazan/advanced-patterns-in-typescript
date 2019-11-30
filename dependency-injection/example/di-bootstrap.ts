import {Injector, Resolver} from "../src/diy/injector";
import {RendererService} from "./services/renderer.service";

class DiBootstrap {

    static run() {
        console.log('---------------- | START | -----------------');

        // Static injector
        // const renderer = Injector.resolve<RendererService>(RendererService);
        // renderer.update();

        const renderer = Resolver.resolve<RendererService>(RendererService);
        renderer.update();

        console.log('---------------- | END | -----------------');
    }
}

DiBootstrap.run();
