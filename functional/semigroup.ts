// The Semigroup represents a set with an associative binary operation.
// This makes a semigroup a superset of monoids.
// Semigoups have no other restrictions, and are a very general typeclass.
// (a <> b) <> c == a <> (b <> c)
// https://wiki.haskell.org/Data.Semigroup
import { add } from './foldl';

interface Semigroup<T> {
    concat: (a: T, b: T) => T
}

function getSemiSum(): Semigroup<number> {
    return { concat: add }
}

const sumSemiGroup = getSemiSum();
sumSemiGroup.concat(1, 3);
