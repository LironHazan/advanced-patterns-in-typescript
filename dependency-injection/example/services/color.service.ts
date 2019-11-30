export class ColorService {

    constructor() {
        console.log('init ColorService');
    }

    private _color: string = 'red';

    colorPicker = ['red', 'blue', 'green'];

    set color(color: string) {
        this._color = color;
    }

    get color(): string {
        return this._color;
    }

}
