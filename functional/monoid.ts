import { add, BinOp } from './foldl';

interface Monoid<T> {
    empty: () => T;
    combine: BinOp
}

function getSumMonoid(): Monoid<number> {
    return {
        empty: () => 0,
        combine: add
    }
}

const sumMonoid = getSumMonoid();
console.log(sumMonoid.empty());
// 0

console.log(sumMonoid.combine(6, 2));
console.log(sumMonoid.combine(2, 6) === sumMonoid.combine(6, 2)); // associative
// true

console.log()
