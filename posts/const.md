---
title: JavaScript const
date: "2020-02-20"
description: This article will cover everything to know about const variable declaration in JavaScript
tags: javascript, programming, interviewpreperation, frontend
---

Variable declaration: const

ES6 introduced the `const` keyword to declare variables for all types of data like a boolean, object, integer, etc.

### The const

- Variable declared with `const` needs to be initialized at the time of declaration.
- Same variable can't be declared again.
- Same variable can't be initialized again.
- The const keyword declares a block-scoped variable in Javascript.
- `const` declarations are hoisted and but remain uninitialized.

### 1. Syntax

Variables declared with `const` can't be left uninitialized like `var` or `let`. They need to be initialized at the time of declaration.

```javascript
const x = 5;
console.log(x); //5

const y;
y = 10;
// SyntaxError: Missing initializer in const declaration
```

### 2. Re-declaration and Re-initialization

When using `const` we can't re-declare or re-initialize variables. JavaScript throws error.

**Re-declaration**

```javascript
const a = true;
const a = false;
console.log(a); 
// SyntaxError: Identifier 'a' has already been declared
```

**Re-initialization**

```javascript
const a = true;
a = false;
//TypeError: Assignment to constant variable.

const arr = [1,2,3,4];
arr = [5,4,56];
//TypeError: Assignment to constant variable.
```

> Note: Sometimes `const` can be referred to as constant value assignment. Once assigned can't be changed. But it is not the case. It should be considered as **NO RE-INITIALIZATION**.
Like in the above example with the array `arr` we tried to assign a new array then JavaScript throws an error. But we tried to change the values in the already assigned array then Javascript won't throw an error. See the example below:

```javascript
const arr = [1,2,3,4];
arr.push(5);
console.log(arr); // [1,2,3,4,5]
// JavaScript doesn't throw any error
```

### 3. Block scoping

variables declared with `const` create block scoping.

```javascript
const const = 10;
if (a > 10) {
  const fav = "twitter";
  console.log(fav); //twitter
}
console.log(fav); // ReferenceError: fav is not defined
```

Here `const` created a block scope. That's why the `fav` variable is only accessible inside the if-statement not outside of it.

### 4. Hoisting

`const` declarations are hoisted but they are not initialized at the compile time. Due to this if we try to access a variable before it was declared and initialized, Javascript throws us an error.

Example:

```javascript
console.log(isLoading);
const isLoading = true;
// ReferenceError: Cannot access 'isLoading' before initialization
```

**Explanation:**
When our code is compiled `const` declarations are hoisted but they are not initialized. They will only get initialized when during runtime code execution reaches the assignment. So, we can't access the variable before it was declared and assigned in code.

----------------------------------------------------------------------------

**Conclusion:**
Including this article, I have covered all three variable declarations var, let, and const in JavaScipt. Now you can checkout most common asked Javascript Interview Question **Difference between var/let/const** [here](/posts/var-let-const)

Thanks for reading the article!