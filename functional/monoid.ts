import { add, BinOp } from './foldl';

interface Monoid<T> {
    id: () => T; // empty
    combine: BinOp //fold/concat etc..
}

function getSumMonoid(): Monoid<number> {
    return {
        id: () => 0,
        combine: add
    }
}

const sumMonoid = getSumMonoid();
console.log(sumMonoid.id());
// 0

console.log(sumMonoid.combine(6, 2));
console.log(sumMonoid.combine(2, 6) === sumMonoid.combine(6, 2)); // associative
// true

console.log()
