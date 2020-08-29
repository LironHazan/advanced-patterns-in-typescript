What is a Functor?

According to the book by Luis Atencio:  "Functional Programming in JavaScript - How to Improve Your JavaScript Programs":

`"In essence, a functor is nothing more than a data structure that you can map functions over with the purpose of lifting values into a wrapper, modifying them, and then
putting them back into a wrapper. It’s a design pattern that defines semantics for how
fmap should work. Here’s the general definition of fmap:
fmap :: (A -> B) -> Wrapper(A) -> Wrapper(B)"` 

The most commonly used functor example is the Array - it contains the Array.map()
(and other higher order functions used for transformation)
using the map function we modify the giving data and return a new array ref (the wrapper).

BTW I also recommend reading Eric Elliot's [post](https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8) on Functors and Monads 
