// Real life example of a functional I implemented on one of my projects:

export type Result<E, T> = Error<E> | Just<T>;
type Just<T> = T;
type Error<E> = Just<E>; //LOL :)

export class ResultT<E, T> {
  private result: Result<ErrorClassification, T>;

  constructor(result: Result<ErrorClassification, T>) {
    this.result = result;
  }

  /**
   * Result mapper
   * @param onSuccessFn
   */
  ok(onSuccessFn: (lifted: T) => ResultT<E, T>): ResultT<E, T> {
    return isError(this.result) ? this : onSuccessFn(this.result as T);
  }

  /**
   * Error mapper
   * @param onFailureFn
   */
  err(onFailureFn: (error: ErrorClassification) => ResultT<E, T>): ResultT<E, T> {
    return isError(this.result) ? onFailureFn(this.result as ErrorClassification) : this;
  }

  map<A>(transformFn: (a: T) => A): ResultT<never, T> {
    this.result = transformFn(this.result as T) as any;
    return this;
  }
}

export enum ErrorType {
  ErrOne = 'Unsupported',
  ErrTwo = 'Invalid',
}

export interface ErrorClassification {
  message: string;
  type: ErrorType;
}

/**
 * Since we don't have a type based pattern matching we're using "tags" runtime check
 * @param result
 */
export function isError<T, E extends ErrorClassification>(result: Result<E, T>): result is E {
  return typeof result === 'object' && 'message' in result && 'type' in result;
}

// Example

const err: ErrorClassification = {
  message: 'haha',
  type: ErrorType.ErrOne,
};

const mockedErr = new ResultT(err);
mockedErr
  .ok(() => mockedErr) // no operation in our case
  .err((err: ErrorClassification) => {
    console.log(err.message);
    err.message = 'transformed err message';
    return mockedErr;
  })
  .map(console.log);

const result = new ResultT({ a: 'foo', b: 'bar' });

result
  .ok((res) => {
    res.a = 'not foo';
    return result;
  })
  .map((res: { a: any }) => ({
    a: res.a,
    c: 'mako',
  }))
  .map(console.log);

// Closer look into map:
// Identity: object.map(x => x) ≍ object
const isInstanceofResultT = result.map((a) => a) instanceof ResultT;
console.log('isInstanceofResultT', isInstanceofResultT);

function one(s: string) {
  const one = 'one';
  return one + s;
}
function two(s: string) {
  const two = 'two';
  return two + s;
}

// composition: object.map(compose(f, g)) ≍ object.map(g).map(f)
const fooBox = new ResultT('foo');
const isResultT =
  fooBox.map(() => two(one('foo'))).map(console.log) ===
  fooBox
    .map(() => one('foo'))
    .map(two)
    .map(console.log);
console.log('isResultT', isResultT);
