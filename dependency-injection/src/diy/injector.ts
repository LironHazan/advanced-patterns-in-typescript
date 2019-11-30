import 'reflect-metadata';
import {Ctr} from './injectable';

export class Injector {

    private depInstances: Map<string, Ctr<any>> = new Map<string, Ctr<any>>();

    // Not storing an instances map
    static resolve<T>(target: Ctr<any>): T {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: any) => Injector.resolve<any>(token));
        return new target(...injections);
    }

    // Storing Instances map so a service will only have one instance
    resolve<T>(target: Ctr<any>): any {

        if (this.depInstances && this.depInstances.has(target.name)) {
            console.log(target.name, 'instance exists');
            return this.depInstances.get(target.name);
        }

        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: any) => Resolver.resolve<any>(token));
        this.depInstances.set(target.name, target);

        console.log(this.depInstances);

        return new target(...injections);
    }
}

export const Resolver = new Injector();
