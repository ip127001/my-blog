---
title: 5 ways to add an element at the last index of the array in JavaScript
date: "2020-11-10"
tags: javascript, programming, interviewpreperation, frontend
---

### 1. Array.push() method

- push method adds the element at the last index.
- It mutates the original array.

```javascript
let arr = [1,2,3,4];
arr.push(5);

console.log(arr); // [1,2,3,4,5]
```

### 2. Array.length property

- length property returns the length of the array.
- If an Array has a length of 3, then it is indexed from 0 to length-1 [2]. So the next position of the array is length[3]. Now, using `array[index]` syntax we can add a new element at the end of the array.
- It changes the length of original array ie.e mutates the original array.

```javascript
let arr = [1,2,3,4];
arr[arr.length] = 5;

console.log(arr); // [1,2,3,4,5]
```

### 3. Arry.splice() method

- splice changes the content of the array by removing elements or adding new elements.
- It takes 3 optional arguments:
  - start of the index of the array from which deletion starts
  - total no of elements to be deleted
  - elements to be replaced in the original array

```javascript
let arr = [1,2,3,4];
arr.splice(arr.length, 0, 5);

console.log(arr); // [1,2,3,4,5]
```

It mutates the original array.

### 4. Array.concat() method

- It is used to merge two or more arrays.
- It returns the new array, so it doesn't mutate the original array.

```javascript
let arr = [1,2,3,4];
let newArr = arr.concat([5]);

console.log(newArr); // [1,2,3,4,5]
```

### 5. Spread operator

- Spread operator(...) copy the original array [shallow copy] and returns the new array.
- Doesn't change the original array.

```javascript
let arr = [1,2,3,4];
let newArr = [...arr, 5];

console.log(newArr); // [1,2,3,4,5]
```

> Spread operator shallow copy of the original array. That's why it is not useful in the case of reference type elements.

_Example:_ Look out for reference types:

```javascript
let obj1 = {value: 5};
let obj2 = {value: 10};

let arr = [obj1, obj2];

let newArr = [...arr];

newArr[0].value = 15;
newArr[1].value = 15;

newArr // [{value: 15}, {value: 15}]
arr // [{value: 15}, {value: 15}]
```

For more on shallow and deep copying check out [my article](https://dev.to/ip127001/copying-objects-in-javascript-440b) on this topic.

### Conclusion

There is also the argument of mutability vs immutability. There are cases where the immutability pattern is best like when passing the array as props to other components or storing values in a redux store. But that doesn't mean mutation is bad.

- I mostly use `Array.push()` for most tasks because the use-cases are like that.
- I use the `Spread operator` approach for any immutability pattern.

If you know what the code is really doing you can use any pattern.

--------

### References

1. [Array.push on Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
2. [Array.length on Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
3. [Array.splice on Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
4. [Array.concat on Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
5. [Spread operator on Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Thanks for reading the blog!
