---
title: What is hoisting in JavaScript
date: "2022-06-24"
description: This article will try to answer most asked questions related to hoisting in JavaScript
tags: javascript, beginners, programming, interviewpreperation, frontend
---

### Most asked Interview questions regarding Hoisting

1. What is hoisting in JavaScript?
2. What is Temporal Dead Zone?
3. Are function expressions hoisted?

----

**Definition:** JavaScript Hoisting is the process where the declaration of functions or variables moves to the top of their scope during compile time before execution of code. Due to hoisting, we can access variables or functions before their declaration in code.

### Function Hoisting

Function declarations are hoisted and can be accessed before their declaration in code like the below:

```javascript
foo();

function foo() {
  console.log("foo");
}
```

But how is that possible?
During compile time the `foo` function declaration moves to the top of the scope.
Then code execution happens

- interpreter reaches the line `foo();` which says call the function `foo`
- So, the interpreter calls the function as it is already available on top of the scope in memory
- Function foo executes successfully.

```javascript
/*
Above foo declaration moves to the 
top of the scope in memory
*/
function foo() {
  console.log("foo");
}
foo();
// foo is printed on console
```

Without hoisting the above code would throw an error. With hoisting, we can declare a function even on the 10th line and can access it on the first line in scope.

### Variable Hoisting

Variables declaration are also hoisted to the top of scope but they are hoisted differently in case of var and let/const.

#### 1. var

In the case of var, variables are hoisted to the top and initialized with `undefined` as the value in memory and if we try to access the variable before its initialization we get `undefined` in the console.

```javascript
console.log(a);
var a = 15;

// Above code is actually compiled this like below
var a = undefined;
console.log(a); //undefined
var a = 15;
```

#### 2. let/const

In the case of let/const, variables are hoisted to the top but they are never initialized with any value until their actual initialization in code. So, if we try to access the variable we would get `ReferenceError` because the variable is actually on the top of the scope but doesn't hold any value, not even `undefined`.

> **This is called the Temporal Dead Zone(TDZ) where we are trying to access a variable that has been defined but not initialized with any value**. So let and const also hoist but they are not initialized with any value and stay in TDZ until they are initialized in code.

```javascript
console.log(a); // ReferenceError: a is not defined
let a = 15;
```

### Function Expressions

Only declarations are hoisted, so when using function expressions only the variable is hoisted not the expression. In the below example if we try to access foo, we will get `undefined` because the foo variable is hoisted not the function expression.

```javascript
console.log(foo); //undefined
var foo = function () {
  console.log("foo");
};
```

### Annoucement

I am starting a series on [JavaScript Interview Guide](/frontend-interview-guide) which will help in preparation for JavaScript Interviews. This series will cover basics, advanced topics, DOM, common patterns, performance, and much more. This blog will be the first blog for this series.

### Read more

- https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
- https://wsvincent.com/javascript-temporal-dead-zone/

Thanks for reading the blog!
