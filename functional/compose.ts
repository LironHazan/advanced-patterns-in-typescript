function compose(f: Function, g: Function) {
    return <T>(x: T) => f(g(x));
}

function normalize(str: string): string {
    return str.trim().toLowerCase(); // I don't mind mutating..
}

function addSufix(str: string) {
    return str.concat('666');
}

const result = compose(normalize, addSufix)('MY_NAME_IS_LIRON');
console.log(result);
console.log(compose(normalize, addSufix)('MY_NAME_IS_LIRON') === compose(addSufix, normalize)('MY_NAME_IS_LIRON'));
