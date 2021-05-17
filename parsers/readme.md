Parsers are fun, parsers combinators are fun to think of :)

Let's use parsimmon to enforce the following dummy query lang:

```code
let textWithSpaces = `foo == "hey there" && foo == "eatPizza"`;
let text = `foo=="hey there"`;
```

foo == "hey there"
foo != "cool"

BTW - Chevrotain is a great choice (I really like it..) for building robust parsers as well, more of a DSLish 
style, comes with a lexer, has best performance according to 
[this banchmark](https://chevrotain.io/performance/) and overall fun to work with.

