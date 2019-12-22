class MyFunctorContext<T> {

    items: T[];

    constructor (items: T[]) {
        this.items = items
    }

    map(transformFn: <T, V> (arg: T) => V ): MyFunctorContext<T> {
        const newItems = [];

        for (const item of this.items) {
            newItems.push(transformFn(item));
        }

        return new MyFunctorContext(newItems);
    }
}



const bananas: any = [
    {isYellow: true},
    {isYellow: false},
    {isYellow: true},
    {isYellow: false}
    ];


const myTypedFunctor = new MyFunctorContext(bananas);

const bestBananas = myTypedFunctor
    .map((banana: any) => {
    if (banana.isYellow) {
        banana.tasty = true;
        return banana;
    }
    banana.tasty = false;
    return banana;
});

console.log(bestBananas);

// result
// MyTypedFunctor
// {
//     items: [
//         {isYellow: true, hasMagnesium: true, tasty: true},
//         {isYellow: false, hasMagnesium: true, tasty: false},
//         {isYellow: true, hasMagnesium: true, tasty: true},
//         {isYellow: false, hasMagnesium: true, tasty: false}
//     ]
// }
