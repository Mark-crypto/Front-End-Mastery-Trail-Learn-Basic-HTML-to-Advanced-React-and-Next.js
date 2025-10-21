# JavaScript ES6+ Features Overview

## Var, Let, Const

**Var** declarations are function-scoped or globally-scoped. This means a variable declared with `var` can only be accessed within the function it's declared in. If it's declared outside of any function, it becomes a global variable. It does not respect block scope, for example, inside an `if` statement block.

**Let** and **Const** are block-scoped, meaning they are only accessible within the block they are declared in, like inside a pair of curly braces `{}`. However, a variable declared with `const` cannot be reassigned after its declaration, while `var` and `let` can be.

`var` can also be redeclared within the same scope, while `let` and `const` cannot. If you try to redeclare `let` or `const`, you will get a SyntaxError.

Given this, for modern JavaScript you are advised to use `let` for variables that change. The use of `var` is highly discouraged.

## Arrow Functions

Arrow functions provide a concise way to write function expressions introduced in ES6, offering a shorter syntax. They are ideal for short inline functions and callbacks in array methods like `map` and `filter`.

To shorten them further:

- For a function with a single return value, you can omit the curly braces `{}` and the `return` keyword.
- For a function with a single parameter, you can omit the parentheses `()`.

Arrow functions also behave differently from traditional functions regarding the `this` keyword [(Read More On This Keyword)](https://medium.com/@mark.onyango_95482/how-this-works-in-javascript-classes-and-why-it-bites-beginners-da52a845c907). They do not have their own `this` binding and instead inherit it from the surrounding scope, which is called lexical scoping.

### A few things to watch out for with arrow functions:

- There is no `arguments` object – you must use rest parameters if you need to access all arguments passed to the function.
- They do not have a `prototype` property [(Read More On Prototype)](https://medium.com/@mark.onyango_95482/why-you-should-learn-prototypes-as-a-javascript-developer-a7e8253776e0).
- Be careful with the implicit return behavior – if you forget to use curly braces for a function with multiple statements, it can lead to unexpected results or `undefined`.

## Template Literals

Template literals provide an enhanced way to work with strings in JavaScript. They are enclosed by backticks (``).

- **Multi-line strings** – you can write strings over multiple lines without needing to use `\n`.
- **String interpolation** – you can embed expressions directly into the string using `${}`, which removes the need for `+` concatenation.
- The embedded expressions can be any valid JavaScript expression, like a function call.
- **Tagged templates** can be created by placing a function name right before the opening backtick. This function receives the parts of the string and the interpolated values, allowing you to customize how the template is processed.

## Destructuring

Destructuring allows you to extract values from arrays or properties from objects into separate variables.

- **Array destructuring** – lets you take values from an array and assign them to individual variables.
- **Object destructuring** – lets you take properties from an object and assign them to variables that have the same name as the properties.

## Spread/Rest

Both the spread and rest operators use the three-dot syntax (`...`).

- The **spread operator** is used to expand an iterable, like an array, into its individual elements. It can also be used to expand an object into its key-value pairs. It's useful for:

  - Creating new arrays or merging arrays
  - Creating new objects or merging objects

- The **rest operator** is used to collect multiple elements into a single array. It is often used in function parameters to handle an indefinite number of arguments.
