The Promise:

A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved.
 
Promised is often mentioned as a "monad".

According to the book by Luis Atencio:  "Functional Programming in JavaScript - How to Improve Your JavaScript Programs":

` "Let’s explore the Promise monad. Just to give you a rough idea, imagine a monad that wraps a long
computation (this isn’t the actual Promise interface, but a close analogy):
Promise.of(<long computation>).map(fun1).map(fun2);//-> Promise(result)"`
