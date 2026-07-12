---
title: 5 ways to delete an element from an array in JavaScript
date: "2020-07-11"
tags: javascript, programming, interviewpreperation, frontend
---

**Situation:**
Whenever we need to delete an element from an array based on an index or certain condition, we can use the following 5 ways.

- **[1] Array pop() method:-**

This removes the last element from the original array.

```javascript
let numbers = [1,2,3,4,5]

let result = numbers.pop()

result: 5
numbers: [1,2,3,4]
```

> pop() method returns the deleted value and removes that value from the original array.

-----

- **[2] Array shift() method:-**
This removes the first element from the original array.

```javascript
let numbers = [1,2,3,4,5]

let result = numbers.shift()

result: 1
numbers: [2,3,4,5]
```

> shift() methods return the deleted value and remove that value from the original array.

-----

- **[3] Array splice() method:-**
This removes a specific element based on a given index.[Example:arrow_down:]

[3.1] `With indexOf() method`

```javascript
let fruits = ['orange', 'mango', 'banana'];

//first find the index of element to be removed.
let index = fruits.indexOf('mango') // 1

//now use splice() method
let result = fruits.splice(index, 1); // ['mango']

fruits: ['orange', 'banana'] //element removed from original array
```

[3.2] `With findIndex() method`

```javascript
let fruits = ['orange', 'mango', 'banana'];

//first find the index of element to be removed based on any condition
const index = fruits.findIndex(element => element === 'mango'); // 1

//now use splice() method
const result = fruits.splice(index, 1); // ['mango']

fruits: ['orange', 'banana'] //element removed from original array
```

> splice() takes two optional parameters first being the index of the element to be deleted and the second is the number of elements to be deleted. In our case, we just wanted to remove one element so we passed 1 as the second parameter.

> findIndex() provide a callback function which will be executed on each element of array unless it returns true based on your condition and returns the index of element truthy condition.

----

- **[4] Array filter() method:-**
This method returns the new array with elements that passes a particular condition passed in callback function i.e. filtering elements.[Example:arrow_down:]

```javascript
let numbers = [1,2,3,4,5];

let result = numbers.filter(el => el === 3);

result: [3] // returns the new array that elements that passed the condition in callback function
numbers: [1,2,3,4,5] // doesn't change the original array
```

-----

- **[5] JavaScript delete operator-**
delete operator remove the element from the array but it creates an empty space or kind of hold in the array.[Example:arrow_down:]

```javascript
let numbers = [1,2,3,4,5];

delete numbers[2];

numbers: [1,2,empty,4,5] //chrome dev tools prints empty for the deleted value

numbers[2] // undefined but numbers[2] is not an undefined value
```

> delete operator doesn't change the length of the array or the index position of elements and also creates an empty slot.

**_If you still want to use this approach, then assign undefined to the element instead of using the delete operator. [Example:arrow_down:]_**

```javascript
let numbers = [1,2,3,4,5];

numbers[2] = undefined;

numbers: [1,2,undefined,4,5] // this doesn't create an empty slot.
```

----

## Conclusion:

- Array pop(), shift(), splice(), and delete operator mutates the original array.
- Array filter() follows the immutability pattern.

So, there is also the argument of mutability vs immutability. There are cases where the immutability pattern is best like when passing the array as props to other components or storing values in a redux store. But that doesn't mean mutation is bad. I often use splice() with findIndex() to delete an element because the use-case is like that. Consider the example below:

```javascript
const myFunc = (id) => {
  let arr = [1,2,3,4];
  if(id >= 5) {
    arr.push(5) 
  } 
  return arr;
}
```

So if you know what the code is really doing you can use any pattern.

Thanks for reading the blog!
