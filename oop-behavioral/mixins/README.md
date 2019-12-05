
Definition:

Mixin programming is a style of software development, 
in which units of functionality are created in a class and then mixed in with other classes.

** Disclaimer - Generally I prefer to avoid inheriting classes due to the "coupling" it causes, but  in specific cases 
in which you'll want to "decorate" a certain class with another classes specific behaviors, this is kind of a nice approach. 
This implementation is quit simple and only involve 2 classes at a time, you can basically implement your own merge function that could iterate on more than 2 classes.

Read my [related post](https://itnext.io/exploring-the-mixin-pattern-by-code-1dbe5e3124eb).
