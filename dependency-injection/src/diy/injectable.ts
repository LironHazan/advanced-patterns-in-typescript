export interface Ctr<T> { new(...args: any[]): T; }

type ClazzDecorator<T> = (target: T) => void;


export const Injectable = () : ClazzDecorator<Ctr<any>> => {
    return (target: Ctr<any>) => {
        // this is needed so the design:paramtypes could be collected
        console.log('inside: Injectable decorator');
        console.log(target.name, ' is used');
    };
};
