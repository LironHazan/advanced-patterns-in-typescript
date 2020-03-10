type BinOp = (a: number, b: number) => number;
const add: BinOp = (num1: number, num2: number) => num1 + num2;

const foldl = <T>(binOp: BinOp, initVal: number, list: number[]) => {
    return list.reduce((acc, val) => { return binOp(acc, val)}, initVal);
};

const folderResult = foldl(add, 0, [1, 2, 3, 4]);
// 10

console.log(folderResult);

type first = <T, X> ([a, b]: [T, X]) =>  T
const fst: first = ([a]) => a;
console.log(fst(['foo', 666]));


interface Instrument {
    play: () => void;
}

class Guitar implements Instrument {
    play() {
        console.log(`drawing Circle`)
    }
}

class Drums implements Instrument {
    play() {
        console.log(`drawing Rectangle`)
    }
}

const playPart:PlayFn = (instrumets) => {
    instrumets.forEach(instrument => instrument.play());
};

playPart([new Guitar(), new Drums()]);



type PlayFn = <I extends Instrument>(instruments: I[]) => void;
