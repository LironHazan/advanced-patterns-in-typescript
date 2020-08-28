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

// dynamic dispatch
const playPart:PlayFn = (instrumets) => {
    instrumets.forEach(instrument => instrument.play());
};

playPart([new Guitar(), new Drums()]);



type PlayFn = <I extends Instrument>(instruments: I[]) => void;
