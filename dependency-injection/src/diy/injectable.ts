import {Ctr} from "../../../common/types";
type ClazzDecorator<T> = (target: T) => void;

export function Injectable <T>(): ClazzDecorator<Ctr<T>> {
    return (target: Ctr<any>) => {
     // this is needed so the design:paramtypes could be collected
     console.log('inside: Injectable decorator');
     console.log(target.name, ' is used');
    };
}
