//  the Monoid typeclass is a class for types which have a single most natural operation for combining values,
//  together with a value which doesn't do anything when you combine it with others (this is called the identity element).
// https://wiki.haskell.org/Monoid

import { add } from './foldl';

interface Monoid<T> {
    empty: () => T;
    combine: (a: T, b: T) => T
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
