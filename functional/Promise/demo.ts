
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

// Explanation:
// The Promise is an elegant functional wrapper

// How it works: (tried to simplify)

// 1. User passes the exec function to the constructor - that will be invoked immediately on construction
// 2. The exec function accepts 2 args which are callback functions ref of the Promise
// 3. The user runs the resolve fn on success or the reject on error.
// 4. Promise has a state machine - on construction it marked as "pending"
// 5. When we use the Promise by calling "then" and passing our callback the Promise will store that callback in a callbacks list
// 5. The user code runs, operates an async task and by the end of it the user will calls resolve (or error on failure)
// 6. Once resolved -
//  // a. The Promise state will be marked as "resolved"
//  // b. The callback that was passed to the promisifiedOperation.then(cb) will then be executed

export class MyPromise implements Thenable {
    private status: 'pending' | 'resolved' | 'rejected';
    readonly thenCallbacks: Function[];
    private catchCallback: Function = () => {};
    private finallyCallback: Function = () => {};
    private value: any;
    private error: Error | null = null;

    constructor(executor: Executor) {
        this.thenCallbacks = [];
        this.status = states.pending;
        executor((arg: any) => this.resolve(arg), (err: Error) => this.reject(err));
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

