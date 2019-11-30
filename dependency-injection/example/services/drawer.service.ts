// canvas/other drawer service

import { Injectable } from "../../src/diy/injectable";
import {ColorService} from "./color.service";

@Injectable()
export class DrawerService {

    constructor(private colorService: ColorService){
        console.log('init DrawerService');
    }

    drawShape(shape: 'line' | 'circle') {
        console.log('drawing shape: ', shape);
    }

    paint() {
      this.colorService.color = this.colorService.colorPicker[1];
        console.log('paint to ', this.colorService.color);
    }
}
