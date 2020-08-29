type Nothing = null | undefined;
type Just<T> = T; //Some<T>
type Maybe<T> = Nothing | Just<T>; // Option<T>

type Left<L> = L; // Error
type Right<R> = R; // Option<T>
type Either<L, R> = Left<L> | Right<R> // Result<Error, Option>

type Pair<A, B> = [A, B] // product type 

// Error handling
