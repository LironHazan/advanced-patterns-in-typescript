export type BinOp = (a: number, b: number) => number;
export const add: BinOp = (num1: number, num2: number) => num1 + num2;

const foldl = <T>(binOp: BinOp, list: number[], initVal = 0) => {
    return list.reduce((acc, val) => { return binOp(acc, val)}, initVal);
};

const foldr = <T>(binOp: BinOp, list: number[],  initVal = 0) => {
    return list.reduceRight((acc, val) => { return binOp(acc, val)}, initVal);
};

const res1 = foldl(add, [1, 2, 3, 4]);
const res2 = foldr(add, [1, 2, 3, 4]);
// 10

console.log(res1 === res2); // associativity kept

type first = <T, X> ([a, b]: [T, X]) =>  T
const fst: first = ([a]) => a;
console.log(fst(['foo', 666]));


