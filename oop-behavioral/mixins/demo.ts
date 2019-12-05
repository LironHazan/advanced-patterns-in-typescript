import {Ctr} from "../../common/types";

interface IElementX {
    name: string;
    classList: string[];
}

const ElementX = {
    name: 'foo',
    classList: []
};

// Explicit mixin util
const mixinStyle = (base: Ctr<any>) : Ctr<any>  => {
    return class extends base {

        constructor(...args: any[]) {
            super(...args);
        }

        public addClass(element: IElementX, cssClass: string) {
            element.classList.push(cssClass);
            console.log(cssClass, 'was added');
        }
    }
};


class classB  {
    constructor() {}

    private thing = 'Write code';

    public doSomething() {
        return this.thing;
    }
}

const MixedClass: Ctr<any> & typeof classB = mixinStyle(classB);

// classA doesn't need to extend classB in order to get its methods - gets them by the MixedClass
class classA extends MixedClass {
    constructor() {
        super();
    }

    public useMixinFn() {
        return this.doSomething();
    }
}

const instanceA = new classA;

console.log(instanceA.useMixinFn());
instanceA.addClass(ElementX, 'sparkling');
new MixedClass().addClass(ElementX, 'invalid');
console.log(Reflect.has(instanceA, 'doSomething'));


console.log('---------------------- playing with objects -------------------');
// Using Object assign for classes wont work, classes are constructor functions

const mix = (obj1: Ctr<any>, obj2: Ctr<any>) => {
    return { ...obj1, ...obj2};
};

const mixed = mix(classA, classB);

console.log(mixed);
console.log(Reflect.has(mixed, 'doSomething'));
