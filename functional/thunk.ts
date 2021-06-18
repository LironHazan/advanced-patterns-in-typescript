// delay something, lazy eval

function registerAction<T>(calc: () => T): () => T {
  let result: T;
  return (): T => {
    // thunk ( a code to be evaluated at a later time, so it’s an appropriate name for a closure that gets stored )
    if (result) return result;
    result = calc();
    return result;
  };
}

const imLazy = registerAction(() => 5);
console.log('....life gos on');
console.log(imLazy());
