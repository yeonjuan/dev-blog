# this

JavaScript에서 `this`는 런타임에 자동으로 바인딩 되는 식별자입니다.

[Lexical Environment](./lexical-environment.md)의 종류중 하나인 Function Environment 의 Environment Record 의 필드 값중 하나로 함수(화살표 함수 제외)를 호출할 때 `this` 바인딩이 일어나게 됩니다.

때문에 함수를 어떻게 호출하는지에 따라 this 값이 달라지게 됩니다.

## 1. new 호출에서 this

`new` 키워드로 객체 생성시, 호출되는 함수에서 `this` 는 생성되는 객체를 가르킵니다.

```js
class Foo {
  constructor() {
    this.name = "foo";
  }
}

const foo = new Foo();
console.log(foo.name); // "foo"

function Bar() {
  this.name = "bar";
}

const bar = new Bar();
console.log(bar.name); // "bar"
```

## 2. call, apply, bind

call, apply 로 함수를 호출하면 첫 번째 인자로 넘겨진 객체가 `this` 가 되며, 
bind 로 함수를 생성하면 인자로 넘겨진 객체가 `this` 에 바인딩 된 함수가 생성됩니다. 

### call, apply

- `func.call(thisArg[, arg1[, arg2[, ...]]])`
- `func.apply(thisArg, [argsArray])`

```js
function printName() {
  console.log(this.name);
}
printName.call({ name: "foo" }); // "foo"
printName.apply({ name: "foo" }); // "foo"
```

### bind

- `func.bind(thisArg[, arg1[, arg2[, ...]]])`

```js
function printName() {
   console.log(this.name);
}
const printFoo = printName.bind({ name: "foo" });
printFoo(); // "foo"
```

## 3. 객체 문맥상 this

객체에 접근해 함수 호출시 `this` 는 그 객체를 가르킵니다.

```js
var foo = {
   name: null,
   printName() {
     console.log('name:' + this.name);
   },
   setName(name) {
     this.name = name;
   }
}
foo.setName("foo");
foo.printName(); // "foo"
var { printName } = foo;
printName(); // undefined
```

연속해서 객체에 접근 시 문맥상 마지막 객체를 가르킵니다.

```js
var foo = {
   name: null,
   bar: {
      printName() {
        console.log(this.name);
      },
      setName(name) {
        this.name = name;
      }
   }
}
foo.bar.setName("bar");
foo.bar.printName(); // "bar"
foo.name; // null
```

## 4. 그 외

그 외, strict 모드가 아니면 `this`는 전역 객체를 가리킵니다.

```js
function foo() {
  this.name = "foo";
}
foo();
console.log(globalThis.name); // "foo"
```

strict 모드일 경우 `this` 는 undefined 입니다.

```js
function foo() {
  "use strict";
  this.name = "foo"; // TypeError: Cannot set property 'name' of undefined
}
foo();

console.log(globalThis.name);
```

## 화살표 함수

화살표 함수는 호출시 새로운 `this` 바인딩을 수행하지 않습니다. 따라서 화살표 함수에서 `this`는 화살표 함수가 생성될 때의 `this` 를 가르킵니다.

```js
var foo = {
   name: null,
  printName: () => {
    console.log(this.name);
  },
  setName: (name) => {
    this.name = name;
  }
}

foo.setName("foo");
foo.name; // null
globalThis.name; // "foo"
```

bind, call, apply 와 같은 명시적 바인딩도 무시됩니다.

```js
globalThis.name = "globalThis";
var printName = () => {
   console.log(this.name);
}
var printFoo = printName.bind({ name: "foo" });
printFoo(); // "globalThis"
```
