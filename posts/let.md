---
title: JavaScript let
date: "2020-02-10"
description: This article will cover everything to know about let variable declaration in JavaScript
tags: javascript, programming, interviewpreperation, frontend
---

ES6 introduced the `let` keyword to declare variables for all types of data like boolean, object, integer, etc.

In my [last blog](/posts/var), I discussed the introduction to variables in JavaScript, hoisting, and the `var` keyword.

### The let

- The let keyword declares a block-scoped variable in Javascript.
- Same variable can't be declared again but can be initialized again.
- Variable declared with `let` are hoisted and but remain uninitialized.

### 1. Syntax

```javascript
let x = 5;
console.log(x); //5

let y;
y = false;
console.log(y); //false
```

### 2. Block scoping

variables declared with `let` create block scoping.

**Example-1:**

```javascript
let range = 10;
if (range > 10) {
  let food = "Pizza";
  console.log(food); //Pizza
}
console.log(food); // ReferenceError: food is not defined
```

Here `let` created a block scope. That's why the `food` variable is only accessible inside the if-statement not outside of it.

**Example-2:**

```javascript
for(let i = 0; i < 5; i++) {
    // some task
}
console.log(i); // ReferenceError: i is not defined
```

Due to block scope, the `i` variable is only accessible inside the for-loop not outside of it.

### 3. Redeclaration and re-initialization

When using `let` we can't re-declare variables. JavaScript throws the Syntax Error. Only one declaration for one variable but variables can be re-initialized with any value.

**Re-declaration**

```javascript
let a = true;
let a = false;
console.log(a); 
// SyntaxError: Identifier 'a' has already been declared
```

**Re-initialization**

```javascript
let a = true;
a = false;
console.log(a); // false
```

> If we only declare variable with let and not assign a value, then Javascript assigns `undefined` to it. Later, when code execution reaches the variable assignment new values replace the `undefined` value.

```javascript
let a;
console.log(a); // undefined

a = 10;
console.log(a); // 10
```

### 4. Hoisting

`let` declarations are hoisted but they are not initialized at the compile time. Due to this if we try to access a variable before it was declared, Javascript throws us an error.

Example:

```javascript
str = "hello";
let str;
// ReferenceError: Cannot access 'str' before initialization
```

**Explanation:**
When our code is compiled `let` declarations are hoisted but they are not initialized. They will only get initialized when during runtime code execution reaches the assignment. So, we can't access the variable before it was declared in code.

----------------------------------------------------------------------------

Thanks for reading the article!