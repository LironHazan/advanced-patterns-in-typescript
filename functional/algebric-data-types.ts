interface Point {
    x: number;
    y: number
}
const point: Point = {
    x: 10,
    y: 3
}

// ADT and examples..
// Sum types

type Maybe<T> = None | Just<T>; // Option<T>

class Just<A> {
    constructor(private value: A) {}

    map<B>(f: (param: A) => B): Just<B> {
        return new Just(f(this.value));
    }
}

class None {
    map(): None {
        return this;
    }
}

// Maybe[A].map(fn: A => B) : Maybe[B]
class MaybeFunctor<A> {
    constructor(private value: A) {}

    map<B>(f: (param: A) => B): Maybe<B> {
        if (!this.value) { return new None() }
        return new Just(f(this.value));
    }
}

// Transforms any 2D point to maybe 3D struct
function fromMaybePoint(maybeP: Point | null): Maybe<Point> {
    return new MaybeFunctor(maybeP).map((p: any) => {
        p.x += 1;
        p.y += 1;
        p.z = 10;
        return p;
    });
}

const noResult = fromMaybePoint(null);
const pppoint = fromMaybePoint(point)
    .map(() => point)
    .map(() => point)
    .map(() => point);

console.log(noResult);
console.log(pppoint);


// Either pattern for error handling
type Either<L, R> = Left<L> | Right<R> // Result<Error, Option>

class Right<A> { // Option<T>
    constructor(private value: A) {}

    map<B>(f: (param: A) => B): Right<B> {
        return new Right(f(this.value));
    }
}

class Left<A> { // Err
    constructor(private value: A) {}
    map(): Left<A> {
        return new Left(this.value);
    }
}

function either(result: Point, injectErr?: () => {}): Either<Error, Point> {
    try {
        injectErr && injectErr();
        return new Right(result);
    } catch (e) {
        return new Left(new Error);
    }
}

const right = either(point);

console.log(either(point, () => { throw new Error()}));
console.log(right);


// Product types
type Pair<A, B> = [A, B]

