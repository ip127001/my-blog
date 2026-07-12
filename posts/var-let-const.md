---
title: Difference between var, let, and const
date: "2022-06-26"
description: This article will try to answer most asked questions related to variable declaration in JavaScript
tags: javascript, beginners, programming, interviewpreperation, frontend
---

It is the most common question asked in a JavaScript interview. `var` was the only option for variable declaration in Javascript before ES6 but after ES6 let and const were announced. I have covered [var](/posts/var), [let](/posts/let) and [const](/posts/const) in their seperate blogs in-depth.

### Q.1) What is the difference between var and ES6 new declarations (let/const)?

| var                          | let/const|
| :-------------:              |:-------------:|
| var can't create block scope | let/const creates block scope |
| var can be re-declared       | let/const can't be re-declared |
| var declarations are hoisted and initialized with `undefined` | let/const declarations are hoisted but are not initialized |

### Q.2) What is the difference between let and const?


| let | const|
| ------------- |:-------------:|
| variable declared with let can be re-assigned. | const declarations can't be re-assigned.|
| If the variable(declared with let) is not initialized with any value, JavaScript assigns `undefined` to it. | If the variable(declared with const) is not initialized with any value, JavaScript throws an error.|
| `let a;` //a = undefined | `const a;` //SyntaxError: Missing initializer in const declaration |
| `let a = 10; a = 5;` //a = 5 | `const a = 5; a = 10;` //TypeError: Assignment to constant variable |

### Q.3) Can you change the value of a variable declared with `const`?

Yes, only if it is a reference type. 

`const` declaration can't be assigned again that doesn't mean you can't change the existing value.
Take the example of assigning an array to a const declaration. We can't assign another array but we can change the value of the existing array because the reference is not changing.

```javascript
const arr = [1,2,3];
arr.push(4);
console.log(arr); //[1,2,3,4]

const arr = [1,2,3];
arr = [4,5,6];
TypeError: Assignment to constant variable
```
So use `let` in such cases where array values will be changed in the future like in the above example to avoid the confusion created by the meaning of `const`.
You can use const anywhere if the values will not be changed in the future.

----------------

#### Conclusion:
- In my current coding style I don't use `var`. 
- I use `let` where values can be changed in the future.
- I use `const` for cases where values will not be changed like imports, exports, constant values, etc. 

--------------------

This blog will be 2nd blog in the series [JavaScript Interview Guide](/frontend-interview-guide). I covered [Hoisting in JavaScript](/posts/hoisting) in last blog. Do check it out.

Thanks for reading the blog!
