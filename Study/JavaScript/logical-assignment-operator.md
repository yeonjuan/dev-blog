# Logical Assignment Operator

Logical Assignment Operator(논리 할당 연산자)는 ECMA 2021 스펙에 추가될 연산자로 논리 연산자 `||`, `&&`, `??` 와 할당 연산자 `=` 가 합쳐진 형태입니다.

## `&&=`

AND 논리 연산자 `&&` 와 `=` 가 합쳐진 형태로 동작은 다음과 같습니다.
 - 왼쪽 피연산자 값이 `truthy` 일 경우 오른쪽 피연산자 값을 할당합니다. 
 - 왼쪽 피연산자 값이 `falsy` 일 경우, 할당하지 않습니다.

```js
let a = true;
a &&= "foo";
a; // "foo" 가 할당된다.

let b = false;
b &&= "foo";
b; // false. "foo"는 할당되지 않는다.
```

## `||=`

OR 논리 연산자 `||` 와 `=`가 합쳐진 형태로 동작은 다음과 같습니다.
 - 왼쪽 피연산자 값이 `truthy` 일 경우. 할당하지 않습니다.
 - 왼쪽 피연산자 값이 `falsy`일 경우, 오른쪽 피연산자 값을 할당합니다.

```js
let a = true;
a ||= "foo";
a; // true. "foo"가 할당되지 않는다.

let b = false;
b ||= "foo";
b; // "foo" 가 할당된다.
```

## `??=`

Nullish coalescing 논리 연산자 (`??`) 와 `=` 가 합쳐진 형태로 동작은 다음과 같습니다.
 - 왼쪽 피연산자 값이 `null` 혹은 `undefined` 일 경우, 오른쪽 피연산자 값을 할당합니다.
 - 왼쪽 피연산자 값이 `null` 혹은 `undefined` 가 아니면, 할당하지 않습니다.

```js
let a = null;
a ??= "foo";
a; // "foo" 가 할당된다.

let b = false;
b ??= "foo";
b; // false. "foo"가 할당되지 않는다.
```
