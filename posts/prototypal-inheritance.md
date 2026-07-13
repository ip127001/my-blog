---
title: Prototypal Inheritance in JavaScript — explained with real-world examples
date: "2026-07-13"
description: What is prototypal inheritance in JavaScript, how the prototype chain works, ways to create inheritance, real-world patterns, and interview questions.
tags: javascript, prototypes, inheritance, programming, interviewpreperation, frontend
---

**Prototypal inheritance** is JavaScript's built-in way of sharing behavior between objects. When you access a property or method on an object, JavaScript looks on that object first. If it is not found, it walks up the **prototype chain** until it finds a match or reaches `null`.

In plain words: objects can inherit from other objects — not by copying, but by **linking** through a hidden reference called `[[Prototype]]` (exposed as `__proto__` or via `Object.getPrototypeOf()`).

Unlike classical OOP languages where you define a class blueprint and instantiate copies, JavaScript objects **delegate** to a prototype object when they need something they do not have themselves.

## How does the prototype chain work?

Every JavaScript object (except those created with `Object.create(null)`) has an internal link to another object — its **prototype**.

```javascript
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  },
};

const rabbit = {
  jumps: true,
};

// Link rabbit's prototype to animal
Object.setPrototypeOf(rabbit, animal);

rabbit.jumps;  // true  — own property
rabbit.eats;   // true  — inherited from animal
rabbit.walk(); // "Animal walks" — inherited method
```

Here is what happens step by step:

1. You access `rabbit.walk()`.
2. JavaScript checks `rabbit` — no `walk` property.
3. It follows `rabbit`'s prototype link to `animal`.
4. It finds `walk` on `animal` and calls it with `rabbit` as `this`.

That lookup chain continues until the prototype is `null`, which is the end of every chain.

```javascript
const obj = {};
Object.getPrototypeOf(obj) === Object.prototype; // true
Object.getPrototypeOf(Object.prototype);         // null — chain ends here
```

### Prototype vs `__proto__` vs `.prototype`

These three terms confuse everyone in interviews. Here is the distinction:

| Term | What it is |
|------|------------|
| `[[Prototype]]` | Internal link every object has to its parent object |
| `__proto__` / `Object.getPrototypeOf()` | How you **read** that internal link |
| `.prototype` | A property that exists **only on functions** — it becomes the `[[Prototype]]` of instances created with `new` |

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

const rohit = new Person("Rohit");

Object.getPrototypeOf(rohit) === Person.prototype; // true
rohit.greet(); // "Hi, I'm Rohit"
```

`Person.prototype` is **not** Person's own prototype. It is the object that `new Person()` instances inherit from.

## Real-world examples

### 1. Built-in types you use every day

You already rely on prototypal inheritance constantly — you just do not see it.

```javascript
const nums = [1, 2, 3];

nums.push(4);       // Array.prototype.push
nums.map((n) => n * 2); // Array.prototype.map
nums.toString();    // Array.prototype.toString → Object.prototype.toString
```

The chain looks like this:

```
nums → Array.prototype → Object.prototype → null
```

When you call `nums.map()`, JavaScript does not find `map` on the array instance itself. It walks up to `Array.prototype`, finds it, and runs it with `nums` as `this`.

This is why you can add a helper to **all arrays** by extending `Array.prototype` (use sparingly in production — namespace collisions are real):

```javascript
Array.prototype.last = function () {
  return this[this.length - 1];
};

[1, 2, 3].last(); // 3
```

### 2. Sharing methods without duplicating memory

If you attach methods inside a constructor, **every instance gets its own copy** of the function — wasteful for large apps.

```javascript
// Bad — new function created for every user
function UserBad(name) {
  this.name = name;
  this.greet = function () {
    return `Hello, ${this.name}`;
  };
}
```

With prototypes, **one function object** is shared across all instances:

```javascript
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const a = new User("Alice");
const b = new User("Bob");

a.greet === b.greet; // true — same function in memory
```

This pattern is everywhere in older codebases, libraries, and frameworks written before ES6 classes.

### 3. ES6 classes are syntactic sugar

When you write a `class`, JavaScript still uses prototypes under the hood.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Max");
dog.speak(); // "Max barks"
```

This is roughly equivalent to:

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function () {
  return `${this.name} barks`;
};
```

`extends` sets up the prototype chain. `super()` calls the parent constructor. Method definitions land on the prototype — same mechanism, cleaner syntax.

### 4. Object composition in modern JavaScript

Prototypal inheritance is not only about `class` hierarchies. Libraries and apps often compose behavior by linking plain objects.

```javascript
const canEat = {
  eat(food) {
    console.log(`Eating ${food}`);
  },
};

const canWalk = {
  walk() {
    console.log("Walking...");
  },
};

const person = {
  name: "Rohit",
};

Object.assign(person, canEat, canWalk);

person.eat("pizza"); // "Eating pizza"
person.walk();       // "Walking..."
```

For **true prototype delegation** (lookup at read time, not copy at assign time), use `Object.create`:

```javascript
const person = Object.create(canEat);
Object.assign(person, { name: "Rohit" });

// Or mix multiple prototypes with a helper
const person2 = Object.assign(Object.create(canEat), canWalk, { name: "Alex" });
```

This "mixins via prototypes" pattern appears in state machines, game entities, and plugin systems where objects gain capabilities dynamically.

### 5. Framework internals — React class components (legacy)

Before hooks, React class components used prototypal inheritance heavily:

```javascript
class MyComponent extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}
```

`MyComponent` inherits lifecycle methods and `setState` from `React.Component` through the prototype chain. Understanding prototypes helps when debugging `this` binding issues in older React code or reading library source.

## Ways to create prototypal inheritance

### 1. Constructor functions + `prototype`

The classic pre-ES6 pattern. Still common in interviews and legacy code.

```javascript
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.start = function () {
  return `${this.type} started`;
};

function Car(brand) {
  Vehicle.call(this, "car"); // inherit instance properties
  this.brand = brand;
}

// Set up prototype chain: Car → Vehicle
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.honk = function () {
  return `${this.brand} goes beep!`;
};

const myCar = new Car("Toyota");
myCar.start(); // "car started"
myCar.honk();  // "Toyota goes beep!"
```

Key steps:
- `Vehicle.call(this, ...)` — copy parent **instance** properties
- `Object.create(Vehicle.prototype)` — link child **prototype** to parent
- Reset `constructor` so it points back to `Car`

### 2. `Object.create()`

Creates a new object with an explicit prototype link — the purest form of prototypal inheritance.

```javascript
const animal = {
  init(name) {
    this.name = name;
    return this;
  },
  speak() {
    return `${this.name} makes a sound`;
  },
};

const dog = Object.create(animal);
dog.init("Max");

dog.speak(); // "Max makes a sound"
```

Inheritance between two plain objects:

```javascript
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};

const dog = Object.create(animal);
dog.speak = function () {
  return `${this.name} barks`;
};

Object.create(animal).speak === animal.speak; // methods live on the prototype
```

`Object.create` is great when you want **delegation without constructors** — configuration objects, factory patterns, and object literals that share behavior.

### 3. ES6 `class` + `extends`

The modern, readable approach. Same prototype machinery, better ergonomics.

```javascript
class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    return `A ${this.color} shape`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

const c = new Circle("red", 5);
c.describe(); // "A red shape"
c.area();     // 78.53...
```

Use `class` in new code unless you need the flexibility of raw prototypes or are working in a legacy codebase.

### 4. Mixins (composition over deep hierarchies)

When inheritance trees get too deep, mixins copy or delegate behavior from multiple sources.

```javascript
const Serializable = {
  toJSON() {
    return JSON.stringify(this);
  },
};

const Timestamped = {
  touch() {
    this.updatedAt = Date.now();
  },
};

class Post {
  constructor(title) {
    this.title = title;
  }
}

Object.assign(Post.prototype, Serializable, Timestamped);

const post = new Post("Hello");
post.touch();
post.toJSON(); // '{"title":"Hello","updatedAt":1710000000000}'
```

Prefer **composition** (mixins, object spread, modules) over long `extends` chains — deep inheritance is hard to reason about and refactor.

## Common mistakes with prototypes

**Forgetting to reset `constructor` after `Child.prototype = Object.create(Parent.prototype)`.** Tools and `instanceof` checks can break if `constructor` still points to the parent.

**Checking own properties vs inherited ones.** Use `obj.hasOwnProperty("key")` or `Object.hasOwn(obj, "key")` when you only want properties defined directly on the object.

**Mutating shared prototype objects unexpectedly.** If you modify `Array.prototype` or a shared parent prototype at runtime, **all** instances and future objects see the change.

**Assuming `class` is classical inheritance.** JavaScript still delegates through a prototype chain — there are no copied class instances like in Java or C++.

## Interview questions on Prototypal Inheritance

#### 1. What is prototypal inheritance in JavaScript?

Prototypal inheritance is a mechanism where objects inherit properties and methods from another object through a prototype link. When a property is not found on an object, JavaScript looks up the prototype chain until it finds the property or reaches `null`.

#### 2. What is the difference between `__proto__` and `prototype`?

`__proto__` (or `Object.getPrototypeOf(obj)`) is the prototype link **of any object** — where it inherits from. `prototype` is a property **only on constructor functions** — it becomes the `[[Prototype]]` of instances created with `new`.

#### 3. How does property lookup work on the prototype chain?

JavaScript first checks the object itself. If the property is not found, it moves to the object's prototype, then that prototype's prototype, and so on until it finds the property or the chain ends at `null`.

#### 4. What is the difference between classical and prototypal inheritance?

Classical inheritance (Java, C++) copies structure from a class blueprint into instances. Prototypal inheritance links objects to a shared prototype object — instances **delegate** lookups rather than receiving copied methods.

#### 5. How do ES6 classes relate to prototypes?

ES6 classes are syntactic sugar over constructor functions and prototypes. Methods defined in a class body are placed on the class's `prototype`. `extends` sets up the prototype chain between child and parent prototypes.

#### 6. What does `Object.create()` do?

`Object.create(proto)` creates a new object with `proto` as its `[[Prototype]]`. It is the direct way to implement prototypal inheritance without constructors.

#### 7. What is the output?

```javascript
function A() {}
A.prototype.x = 1;

const a = new A();
const b = new A();

a.x = 2;

console.log(a.x); // ?
console.log(b.x); // ?
console.log(A.prototype.x); // ?
```

`a.x` is `2` (own property on `a`). `b.x` is `1` (inherited from `A.prototype`). `A.prototype.x` is still `1` — assigning to `a.x` does not mutate the prototype.

#### 8. How do you check whether a property is own vs inherited?

```javascript
const obj = { a: 1 };
Object.setPrototypeOf(obj, { b: 2 });

Object.hasOwn(obj, "a"); // true
Object.hasOwn(obj, "b"); // false
"b" in obj;               // true — includes inherited
```

#### 9. Implement inheritance using constructor functions.

```javascript
function Parent(name) {
  this.name = name;
}
Parent.prototype.greet = function () {
  return `Hi, ${this.name}`;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

#### 10. What is `instanceof` checking under the hood?

`instanceof` walks the prototype chain of an object and checks whether any link equals the `prototype` property of the constructor function.

```javascript
function Animal() {}
const a = new Animal();

a instanceof Animal;           // true
a instanceof Object;             // true — Object.prototype is in the chain
Animal.prototype instanceof Object; // true
```

#### 11. Can you inherit from multiple parents in JavaScript?

Not with a single prototype link — each object has exactly one `[[Prototype]]`. Use **mixins** (`Object.assign` onto the prototype), composition, or multiple delegation layers to combine behavior from several sources.

#### 12. What happens when you modify a prototype after creating instances?

Existing and future instances that inherit from that prototype immediately see the new or changed properties — because lookup happens at **access time**, not copy time.

```javascript
function User() {}
const u = new User();

User.prototype.role = "guest";
u.role; // "guest" — even though it was added after u was created
```

## Summary

Prototypal inheritance is not an optional feature of JavaScript — it **is** how the language shares behavior. Every array method, every class method, and every object literal participates in a prototype chain.

Whether you use constructor functions, `Object.create`, or ES6 classes, the underlying idea is the same: objects delegate to a linked prototype when they need something they do not define themselves. Understanding that chain is what separates "I can use `.map()`" from "I know why this works and how to debug it when it does not."
