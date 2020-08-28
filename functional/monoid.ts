import {add, BinOp } from "./foldl";

interface Monoid<T> {
    id: () => T; // empty
    combine: BinOp //fold/concat etc..
}

function sumMonoid(): Monoid<number> {
    return {
        id: () => 0,
        combine: add
    }
}

const id = sumMonoid().id();
// 0
const sum = sumMonoid().combine(6, 2);
// 8

console.log()
