interface Nothing { id: 'Nothing' }
interface Just<T> { id: 'Just', value: T }
type Maybe<T> = Nothing | Just<T> // Sum type

interface Left<L> { id: 'Left', left: L }
interface Right<R> { id: 'Right', right: R }
type Either<L, R> = Left<L> | Right<R> // sum type

type Pair<A, B> = [A, B] // product type 
