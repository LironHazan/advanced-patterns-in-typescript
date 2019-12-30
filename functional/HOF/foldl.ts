type BinOp = (a: number, b: number) => number;
const add: BinOp = (num1: number, num2: number) => num1 + num2;

const foldl = <T>(binOp: BinOp, initVal: number, list: number[]) => {
    return list.reduce((acc, val) => { return add(acc, val)}, initVal);
};

const folderResult = foldl(add, 0, [1, 2, 3, 4]);
// 10

console.log(folderResult);
