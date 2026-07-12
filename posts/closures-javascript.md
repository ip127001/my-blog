---
title: Closures in JavaScript — explained with real-world examples
date: "2026-07-12"
description: What is a closure in JavaScript, how it works, and real-world patterns like module pattern, memoization, currying, and event handlers — plus interview questions.
tags: javascript, closures, programming, interviewpreperation, frontend
---

A **closure** is a function that remembers and accesses variables from its **lexical scope** — the scope where it was created — even when it runs outside that scope.

In plain words: a function carries a backpack of variables from where it was born, no matter where it travels later.

## How does a closure work?

When a function is defined inside another function, the inner function gets access to the outer function's variables. Even after the outer function has finished running, the inner function still holds on to those variables.

```javascript
function outer() {
  const message = "Hello from outer";

  function inner() {
    console.log(message); // still has access to `message`
  }

  return inner;
}

const fn = outer();
fn(); // "Hello from outer"
```

Here is what happens step by step:

1. `outer()` runs and creates `message`.
2. `inner` is returned — but it **closes over** `message` before `outer` finishes.
3. `outer()` is done, but `message` is **not garbage-collected** because `inner` still references it.
4. When `fn()` runs later, it reads `message` from that closed-over scope.

That "remembering" is the closure.

## Real-world examples

### 1. Data privacy / Module pattern

Before ES modules, closures were the standard way to hide private state in JavaScript.

```javascript
function createCounter() {
  let count = 0; // private — not accessible from outside

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// counter.count      // undefined — private!
```

`count` lives inside `createCounter`'s scope. The returned methods form a closure over it. This is the same idea behind **encapsulation** in OOP — only the methods you expose are public.

In React, this pattern shows up in custom hooks: state and logic are "private" inside the hook, and only the returned values are exposed to the component.

### 2. Memoization

Memoization caches the result of expensive function calls. Closures are perfect for holding that cache.

```javascript
function memoize(fn) {
  const cache = {}; // closed over by the returned function

  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const slowSquare = memoize((n) => {
  console.log("computing...");
  return n * n;
});

slowSquare(5); // computing... → 25
slowSquare(5); // (from cache) → 25, no log
```

The `cache` object persists across calls because the returned function closes over it. Libraries like `lodash.memoize` and React's `useMemo` / `useCallback` are built on this same idea.

### 3. Currying pattern

Currying transforms a function that takes multiple arguments into a chain of functions that each take one argument. Each step closes over the arguments collected so far.

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

const add = curry((a, b, c) => a + b + c);

add(1)(2)(3);    // 6
add(1, 2)(3);    // 6
add(1)(2, 3);    // 6
```

> Currying is useful when you want to **partially apply** configuration upfront and fill in the rest later — common in functional libraries and API design.

### 4. Event handlers with config

In the browser, event listeners are classic closure territory. The handler closes over variables from when it was created.

```javascript
function setupButtons() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    const label = btn.dataset.label;

    btn.addEventListener("click", function () {
      // `label` is captured from the forEach scope
      console.log(`Clicked: ${label}`);
    });
  });
}
```

This is also where the famous **loop + `var` bug** comes from — `var` is function-scoped, so all handlers in a `for` loop shared the same `i`. Using `let` (block-scoped) or an IIFE with a closure fixes it:

```javascript
// Bug with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

// Fix with let (each iteration gets its own binding)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// Fix with closure (IIFE)
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 100); // 0, 1, 2
  })(i);
}
```

## Common mistakes with closures

**Stale closures in React.** A `useEffect` or event handler that captures state from an old render can read outdated values. Fix with functional updates (`setCount(c => c + 1)`) or by listing correct dependencies.

**Memory leaks.** Closures keep references alive. An event listener that closes over a large object and is never removed will prevent garbage collection.

**Accidental shared state.** Multiple closures over the same mutable variable (like in a loop with `var`) can cause surprising shared state.

## Interview questions on Closures

#### 1. What is a closure in JavaScript?

A closure is a function that retains access to variables from its lexical (outer) scope even after that outer function has finished executing. It is formed when a function is defined inside another function and references the outer function's variables.

#### 2. When is a closure created?

A closure is created at **function creation time**, not at call time. Every time a function is defined inside another scope and references outer variables, a closure is formed.

#### 3. Give a real-world use case of closures.

Data privacy (module pattern), memoization, currying, event handlers that need configuration, debounce/throttle utilities, and React hooks that encapsulate state and logic.

#### 4. What is the difference between scope and closure?

Scope determines **where** a variable is accessible. A closure is what allows a function to **remember** variables from an outer scope even after that scope is no longer on the call stack.

#### 5. Can closures cause memory leaks?

Yes. If a closure holds a reference to a large object or DOM node and the closure itself is kept alive (e.g. a long-lived event listener), the referenced data cannot be garbage-collected until the closure is released.

#### 6. Explain the classic `for` loop + `setTimeout` closure problem.

With `var`, all iterations share one `i`. By the time timeouts run, the loop has finished and `i` is 3. Fix with `let` (block scope per iteration) or an IIFE that captures each value in its own closure.

#### 7. How do closures relate to React hooks?

Each call to `useState` or `useEffect` creates closures over the component's state and props for that render. This is why stale closures happen when effects or callbacks capture old values — and why the dependency array matters.

#### 8. What is an IIFE and how does it relate to closures?

An Immediately Invoked Function Expression runs right after it is defined. It creates a private scope, and any functions returned or assigned from inside it form closures over that scope. This was the pre-ES-module way to avoid polluting the global namespace.

#### 9. Implement a `once` function using closures.

```javascript
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
```

The inner function closes over `called` and `result`, ensuring `fn` runs only once.

#### 10. Implement `debounce` using closures.

```javascript
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
```

Each returned function shares the same `timerId` via closure, resetting the timer on every call.

## Summary

A closure is not a special syntax — it is what happens naturally when a function remembers its birthplace. That simple mechanism powers data privacy, caching, currying, event handling, and much of how modern JavaScript frameworks work. Understanding closures means understanding how JavaScript actually keeps variables alive.
