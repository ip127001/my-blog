---
title: Avoid Reconciliation using shouldComponentUpdate()
date: "2020-08-16"
tags: javascript, programming, interviewpreperation, frontend, react
---

There are many performance optimization concepts in react which helps us to build faster applications.

Today I am going to discuss one of most discussed concept in performance optimization: how to avoid Reconciliation

<iframe
  src="https://codesandbox.io/embed/new?codemirror=1"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<!-- ### Table Of Content

* [What is Reconciliation](#topic-1)
* [Ways to avoid Reconciliation](#topic-2)
  * [shouldComponentUpdate](#topic-3)
    * [Codesandbox url](#sandbox-1)
  * [PureComponent](#topic-4)
    * [Codesandbox url](#sandbox-2)
  * [React.memo](#topic-5) -->

### **What is Reconciliation? <a name="topic-1"></a>**

1. React maintains the internal representation of UI by creating a tree like structure of every `DOM object` in memory which is called **Virtual DOM**:

Basically it is just a javascript object which keeps information of every DOM object.

[Imagine virtual DOM as a javascript object which keeps information about every element]

```javascript
{
    node: 'html',
    properties: {
        attributes: [],
        classes: [],
        events: []
    },
    children: {
        node: 'body'
        properties: {
            attributes: [],
            classes: [],
            events: []
        },
        children: [
            {        
                node: 'div',
                properties: {
                    attributes: [],
                    classes: [],
                    events: []
                },

            },
            {
                node: 'button',
                properties: {
                    attributes: [],
                    classes: [],
                    events: []
                }
            }
        ]
    }
}
```

2. Whenever we update the state or props changes:

* Component returns the elements.
* React compares the newly returned elements with the previously rendered ones by comparing `virtual DOM` snapshot of new object with last updated object. This way React has to update only changed nodes in React DOM.

> This whole process is how React updates DOM which is called `Reconciliation`.
This process is way faster than Real DOM manipulation.

Even though React is clever enough to update only changed nodes. But when props and state changes, re-rendering takes place which takes some time.

So we need to avoid unnecessary re-rendering for such cases.

------------------------------------------------------------

### **The Case where we need to avoid Reconciliation or stop the re-rendering process: <a name="topic-2"></a>**

When parent component renders, all its child components are re-rendered even if their props or states didn't change.
And if child component contains a very slow computation then,  it will be computed in every re-render.

[Our Case **Example-1** <a name="example-1"></a>]

The parent component contains:

* button element which changes the counter value.
* A child component which is dependent of parent prop called `color` which is changed by selecting a color from select element.

In child component:

* There is a delay function which replicates a time taking computation.

Even if you change the counter value using button element in Parent, the child component re-renders hence the computation along with it takes place which is quite noticable in example below.

Parent Component:

```javascript
import React from 'react';
import Child from './Child';

class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      color: 'red'
    }
  }

  render() {
    console.log('[Parent] rendered');

    return (
      <div className="container">
          <div>Counter:  {this.state.counter}</div>

          <button onClick={() => this.setState({counter: this.state.counter + 1})}>Click me to change counter</button>

          <select defaultValue="red" onChange={(e) => this.setState({color: e.target.value})}>
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="grey">grey</option>
          </select>

          <Child color={this.state.color} />
      </div>
    )
  }
}

export default Parent;
```

Child Component:

```javascript
import React from 'react';

class Child extends React.Component {
    delay() {
        console.log('[Delay] function called');

        for(let i = 0; i < 5000000000; i++) {
            i++;
        }
        return 'delayed text';
    }

    render() {
        console.log('[Child] rendered');

        return (
            <div className="child">
                <hr />
                <div>{this.delay()}</div>
                Selected Color: {this.props.color}
            </div>
        )
    }
}

export default Child;
```

------------------------------------------------------------

That's where `shouldComponentUpdate()` comes in. It is the lifecycle method which is called before re-rendering starts in class based components.

### **1. How shouldComponentUpdate() works:<a name="topic-3"></a>**

```javascript
shouldComponentUpdate(nextProps, nextState)
```

- Invoked before re-rendering.
* It receives updated prop object and state.
* Returns `true` by default which means component will re-render by default.
* we can compare previous prop and state changes with nextProps and nextState respectively and return false if we don't want to re-render.
* If we retun false then UNSAFE_componentWillUpdate(), render(), and componentDidUpdate() will not be invoked - Hence no re-rendering.
* This lifecycle method can be skipped when used forceUpdate().

[Example:]

```javascript
/* Assume props = {color: 'red'} state={counter: 0} */

class Parent extends React.Component {
shouldComponentUpdate(nextProps, nextState) {
  if(this.nextProps.color === this.props.color) {
    return false;
  }
  if(this.nextState.counter === this.state.counter) {
    return false;
  }
  return true;
}
```

> so if the color prop and counter variable in state doesn't change then this component won't re-render.

#### **Optimizing performance of above example:**
**[Example-1](#example-1)**

Now we use shouldComponentUpdate() to compare the props and return false if props doesn't changes.

Child Component with shouldComponentUpdate:

```javascript
import React from "react";

class Child extends React.Component {
  delay() {
    console.log("[Delay] function called");

    for (let i = 0; i < 800000000; i++) {
      i++;
    }
    return "delayed text";
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color === nextProps.color) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    console.log("[Child] rendered");

    return (
      <div className="child">
        <hr />
        <div>{this.delay()}</div>
        Selected Color: {this.props.color}
      </div>
    );
  }
}

export default Child;
```

_________________________________________________

#### **Live Example:**
I have added the codesandbox urls below for both state of application before optimization and after optimization with shouldComponentUpdate().

> In the example I have also added consoles so that we can observe which component are rendered and re-rendered.

1. Without any performance optimization: <a name="sandbox-1"></a>

[![Edit jolly-sky-d785y](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jolly-sky-d785y?fontsize=14&hidenavigation=1&theme=dark)

2.With shouldComponentUpdate():

[![Edit nervous-yonath-r8mdc](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nervous-yonath-r8mdc?fontsize=14&hidenavigation=1&theme=dark)

-------------------------------------------------------------

### **2. React.PureComponent: <a name="topic-4"></a>**
React also provides `React.PureComponent` which does shallow comparision of props and state to skip the re-rendering.

Using this we don't have to write shouldComponentUpdate() manually, PureComponent internally manages it.

**[Example-1](#example-1):** our case when delay() function should be skipped if prop or state does not changes. We can achieve it using PureComponent.

```javascript
import React from "react";

class Child extends React.PureComponent {
  delay() {
    console.log("[Delay] function called");

    for (let i = 0; i < 800000000; i++) {
      i++;
    }
    return "delayed text";
  }

  render() {
    console.log("[Child] rendered");

    return (
      <div className="child">
        <hr />
        <div>{this.delay()}</div>
        Selected Color: {this.props.color}
      </div>
    );
  }
}

export default Child;
```

> It is much clearer code and does the work if shallow comparision works fine.

------------------------------------------------------

**But it does not work if there is complex data structure or state is mutated in any way [Like exmaple below]:**

* Parent component use select to push selected colors to array.
* child component receives the color prop as array of colors.

Parent Component:

```javascript
import React from "react";
import Child from "./Child";

class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      color: ["red"]
    };
  }

  render() {
    return (
      <div className="container">
        <select
          onChange={(e) => {
            console.log(this.state.color);
            let updatedColor = this.state.color;
            if (Array.isArray(this.state.color)) {
              updatedColor.push(e.target.value);
            }
            return this.setState({ color: updatedColor });
          }}
        >
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="grey">grey</option>
        </select>

        <Child color={this.state.color} />
      </div>
    );
  }
}

export default Parent;

```

Child Component:

```javascript
import React from "react";

class Child extends React.PureComponent {
  render() {
    return (
      <div className="child">
        <hr />
        Selected Color:
        <ul>
          {this.props.color.map((el, index) => {
            return <li key={index}>{el}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Child;
```

> Here child component doesn't re-render even if you change the values in colors array.

> Array is a reference type data struture in javascript and because PureComponent only does shallow comparision and both references are same each time.

> To avoid this we can avoid mutation and send new array or objects each time.

#### Live codesandbox url of PureComponent example where it state is mutated:<a name="sandbox-2"></a>

* Please check the console here: as we select any color it adds it to the state array but doesn't re-render the child component.

[![Edit silly-solomon-m2jwk](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/silly-solomon-m2jwk?fontsize=14&hidenavigation=1&theme=dark)

------------------------------------------------------------------
### **3 React.memo: <a name="topic-5"></a>**

* It is a higher order component.
* It is similar to React.PureComponent but for function components instead of classes.
* But only shallow compares the props not state as there is no single state object to compare.

**[Example-1](#example-1):** our case when delay() function should be skipped if prop or state does not changes. We can achieve it using memo().

```javascript
import React from "react";

function Child (props) {
    function delay() {
        for (let i = 0; i < 800000000; i++) {
            i++;
        }
        return "delayed text";
    }

    return (
    <div className="child">
        <hr />
        <div>{delay()}</div>
        Selected Color: {props.color}
    </div>
    );
}

export default React.memo(Child);
```

> just wrap your component in React.memo() and it does shallow comparision on props.

-----------------------------------------------------------------------

**Note by React docs:** `All the above methods only exists as a performance optimization. Do not rely on it to prevent a render, as this can lead to bugs`

**References:**
[React docs](https://reactjs.org/docs)

------------------------------------------

Thanks for reading article!
