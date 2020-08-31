// delay something, lazy eval

function registerAction<T>(calc: () => T) {
    let result: T;
    return (): T => { // thunk
        if (result) return result
        result = calc();
        return result
    }
}

const imLazy = registerAction(() => 5);
console.log('....life gos on');
console.log(imLazy());
