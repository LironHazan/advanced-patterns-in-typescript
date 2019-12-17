
class MyFunctorContext {

    private items: any[];

    constructor(items: any) {
        this.items = items
    }

    map(transformFn: (arg: any) => any ): MyFunctorContext {
        const newItems = [];

        for (const item of this.items) {
            newItems.push(transformFn(item));
        }

        //following could work as well
        //this.items = newItems;
        //return this;

        return new MyFunctorContext(newItems);
    }
}



const bananas = [
    {isYellow: true},
    {isYellow: false},
    {isYellow: true},
    {isYellow: false}
    ];


const myTypedFunctor = new MyFunctorContext(bananas);

const bestBananas = myTypedFunctor
    .map((banana: any) => ({
    isYellow: banana.isYellow,
    hasMagnesium: true}))
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
