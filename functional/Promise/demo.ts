
interface Thenable {
    then(callback: Function): Thenable;
    catch(callback: Function): Thenable;
    finally(callback: Function): Thenable;
}

type Executor = (resolveFn: Function, rejectFn: Function) => void;

enum states {
    pending = 'pending',
    resolved = 'resolved',
    rejected = 'rejected'
}

class MyPromise implements Thenable {
    private status: 'pending' | 'resolved' | 'rejected';
    readonly thenCallbacks: Function[];
    private catchCallback: Function = () => {};
    private finallyCallback: Function = () => {};
    private value: any;
    private error: Error | null = null;

    constructor(executor: Executor) {
        this.thenCallbacks = [];
        this.status = states.pending;
        executor((arg: any) => this.resolve(arg),
            (err: Error) => this.reject(err));
    }

    then(callback: Function): MyPromise {
        if (this.status === states.resolved) {
            this.value = callback(this.value);
        } else {
            this.thenCallbacks.push(callback);
        }
        return this;
    }

    catch(callback: Function): MyPromise {
        if (this.status === 'rejected') {
            callback(this.error);
        } else {
            this.catchCallback = callback;
        }
        return this;
    }

    finally(callback: Function): MyPromise {
        if (this.status === states.resolved || this.status === states.rejected) {
            callback(this.value);
        } else {
            this.finallyCallback = callback;
        }
        return this;
    }

    private resolve(arg: any) {
        this.status = states.resolved;
        this.value = arg;
        console.log(this.thenCallbacks.length);
        for (const cb of this.thenCallbacks) {
            this.value = cb(this.value);
        }
        if (typeof this.finallyCallback !== 'undefined') {
            this.finallyCallback(this.value);
        }
    }

    private reject(arg: any) {
        this.status = states.rejected;
        this.error = arg;
        if (typeof this.catchCallback !== 'undefined') {
            this.catchCallback(this.error);
        }
        if (typeof this.finallyCallback !== 'undefined') {
            this.finallyCallback(this.value);
        }
    }

    // static resolve(){}
    // static reject(){}
    // static all(){}
    // static allSettled(){}
    // static race(){}
}

const promisified = () => {
  return new MyPromise((resolve, reject) => {
      setTimeout(() => resolve('inside timeout'), 1500)
  })
};

promisified()
    .then(() => {
        console.log('done!');
        return promisified();
    })
    .then((result: any) => result)
    .then((res: any) => console.log(res));

