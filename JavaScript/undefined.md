# undefined

## 1. `undefined`란?

JavaScript에서 `undefined`는 원시 값(primitive value)이며 `Undefined`는 언어에 내장된 타입(built-in types)중 하나입니다.
`Undefined` 타입을 가진 값은 `undefined` 밖에 없습니다.

```js
console.log(typeof undefined); // "undefined"
```

## 2. 변수에 값이 할당되지 않으면, 변수는 `undefined` 값을 가지게 됩니다.

```js
var foo;
console.log(foo); // undefined
```

## 3. 값을 return 하지 않는 함수는 `undefined`를 반환합니다.

```js
function foo() { }
function bar() { return; }

console.log(foo()); // undefined
console.log(bar()); // undefined
```

## 4. `undefined`는 예약어가 아닙니다.

예약어(Reserved Words)는 말 그대로 JavaScript에서 식별자로 사용하지 못하도록 예약해놓은 단어들입니다.
예약어로는 `const`, `var`, `if`, `false`... 등이 있습니다. 
`undefined`는 이 예약어에 속해 있지 않아 식별자로 사용이 가능합니다.

전역 스코프를 제외하고, `undefined` 식별자를 사용하여 `undefined` 식별자의 값을 변경할 수 있습니다.

```js
function foo() {
  var undefined = "foo";
  console.log(undefined);
}

foo(); // "foo"
```

`undefined`를 식별자로 사용할 수 있기 때문에, 믿을 수 있는 `undefined` 값을 얻기 위해 `void` 연산자를 쓰기도 합니다.
`void` 연산자는 뒤에 어떤 피연산자가 오든지 `undefined` 값을 반환합니다.

```js
var foo = void 0;
console.log(foo); // undefined
```

## 5. `undefined` 는 전역 객체의 프로퍼티중 하나입니다.

`undefined`는 전역 객체(Global Object)의 프로퍼티 중 하나로 입니다.
프로퍼티의 값으로는 `undefined`를 가지고 있고, 값이 변경되지 않는 특성을 가지고 있습니다.

> `window`는 브라우저에서 전역 객체 입니다.

```js
console.log(window.undefined); // undefined

Object.getOwnPropertyDescriptor(window, 'undefined');
//  {
//    value: undefined,
//    writable: false,
//    enumerable: false,
//    configurable: false,
//  }
```

`writable` 속성이 false라 전역에서는 `undefined`식별자에 값을 할당해도 값이 변경되지 않습니다.

```js
var undefined = "foo";
console.log(undefined); // undefined
```
