// Real life example of a functional I implemented on one of my projects:

export type Result<E, T> = Error<E> | Just<T>;
type Just<T> = T;
type Error<E> = Just<E>; //LOL :)

type ANY = any;

export class ResultT<E, T> {
  private readonly result: Result<ErrorClassification, T>;

  constructor(result: Result<ErrorClassification, T>) {
    this.result = result;
  }

  /**
   * Result mapper
   * @param onSuccessFn
   */
  ok(onSuccessFn: (lifted: T) => ResultT<E, T>): ANY | ResultT<E, T> {
    return isError(this.result) ? this : onSuccessFn(this.result as T);
  }

  /**
   * Error mapper
   * @param onFailureFn
   */
  err(onFailureFn: (error: ErrorClassification) => ResultT<E, T>): ANY | ResultT<E, T> {
    return isError(this.result) ? onFailureFn(this.result as ErrorClassification) : this;
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
  .err((transformedErr: ErrorClassification) => {
    console.log(transformedErr.message);
    return mockedErr;
  });
