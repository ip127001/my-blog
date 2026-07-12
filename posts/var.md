---
title: JavaScript var
date: "2020-01-24"
description: This article will cover everything to know about var variable declaration in JavaScript
tags: javascript, programming, interviewpreperation, frontend
---

Variables represent a memory location where data can be stored. Basically, they are names of boxes in which we can put data values. But to use variables we need to declare a variable, then assign a data value to it. In Javascript, variables are declared with keywords `var`, `let`, and `const`.

**Note**: In Java and many other languages variables are declared with different keywords like `int` for integer type of data values or `char` for characters. But in JavaScript, we have general keywords for all types of data values whether they are integer, decimal, boolean, or strings.

ES6 introduced let and const keywords but var was the only option before 2015. In this article, we are going to discuss `var` specifically.

### The var

- The var declares a function-scoped or globally-scoped variable in Javascript.
- It doesn't create a "block" scope.
- Same variable can be declared many times.
- Variable declared with `var` are hoisted and initialized with `undefined` value.

### 1. Syntax

```javascript
var x = 5;
console.log('value of x is: ', x); // value of x is: 5

var str = "I am a string";
console.log(str);  // I am a string

var myFunction = function() {
   console.log('hey');
}
console.log(myFunction);  // ƒ () {console.log('hey');}
```

**Javascript Variable Naming constraints**: The name must contain only letters, digits, or the symbols $ and _, and the first character must not be a digit.

### 2. Scope

var declares a function-scoped or globally-scoped variable but can't create block scope.

**2.1 Global Scope:**

```javascript
var value = 10;
function logger() {
  console.log(value); //10
}
console.log(value); //10
```

The `value` variable is in the global scope so, we can access it anywhere in this scope whether it is inside a function or after 10000 lines.

**2.2 Function Scope:**

```javascript
function mood() {
  var happy = true;
  console.log(happy);  // true
}
console.log(happy);  // ReferenceError: happy is not defined
```

The `value` variable is in the function scope so, we can access it only in the mood function but not outside of it. It will give us a Reference error.

**2.3 Block Scope:**

```javascript
var a = 10;
if (a > 10) {
  var name = 'hashnode';
}
function logger() {
  console.log(name);
}
logger(); // hashnode
console.log(name); // hashnode
```

Here `name` variable doesn't create block scope but instead, it is visible everywhere like a variable in the global scope. So, we can't declare any private variables in this if block i.e block scope is not possible.

Before 2015 when var was the only option to declare variables then to obtain block scoping we could use the IIFE pattern.

**IIFE:** Immediately invoked function expressions.
It describes a function expression that can be called immediately and has its own private variables.
Example:

```javascript
(function() {
  var greeting = "Good Morning!";
  console.log(greeting ); // Good Morning!
})();
```

In this syntax, the function is wrapped by parenthesis and then immediately called using `()`.

**Solution:** To create a block in our example above we can define the if condition in IIFE like below:

```javascript
var a = 10;
(function() {
  if (a > 10) {
    var name = 'hashnode';
  }
})();
console.log(name); // ReferenceError: name is not defined
```

### 3. Redeclaration and re-initialization

Variables declared with `var` can be declared and initialized again. Javascript doesn't throw any error.

```javascript
var browser = 'Mozilla';
var browser = 'Chrome';
console.log(browser); //Chrome
```

The latest assigned value replaces the last value.

### 4. Hoisting

Variable declarations are processed first before any code is executed. So, declaring a variable anywhere in the code is equivalent to declaring it at the top. This behavior is called "hoisting", as it appears that the variable declaration is moved to the top of the scope: the function or global.

```javascript
test = 10;
var test;

// In simple terms above code is processed as below 
var test;
test = 10;
```

With `var`, we can assign value first then declare the variable it won't throw an error. There are three steps happening here:

1. variable declared with var is hoisted
2. during the compile-time variable is assigned the `undefined` value.
3. when it reaches initialization like in our example `test = 10`, then the updated value is assigned to the variable.

> Note: Declarations are hoisted but not the assignment.

Example:

```javascript
console.log(band); // undefined
// ---some code
band = "Coldplay";
console.log(band); //coldplay
// ---some code
var band;
```

The `band` variable is processed before the first console due to hoisting but the only declaration is hoisted not the assignment. So, its value is `undefined` initially. It is like assigning the `undefined` value to the `band` variable. During execution when the real assignment is done then the value `Coldplay` is assigned to the `band` variable.

-----------------------------------------------------------------------------------------

### Miscellenious Example

```javascript
for(var i = 0; i < 5; i++) {
    console.log(i); 
}
console.log(i); // 5
```

> Block scoping is also not created in case of `for` loop:

-----------------------------------------------------------------------------------------

**References:**

- [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- [JavaScript Info](https://javascript.info/var)

Thanks for reading the article!
