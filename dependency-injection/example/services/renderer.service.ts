// renderer/updater service

import {Injectable} from "../../src/diy/injectable";
import {DrawerService} from "./drawer.service";

@Injectable()
export class RendererService {

    constructor(private drawer: DrawerService){
        console.log('init RendererService');
    }

    update() {
        this.drawer.drawShape('line');
        this.drawer.paint();
        console.log('updating drawing');
    }
}
