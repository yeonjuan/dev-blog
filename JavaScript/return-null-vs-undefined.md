# return `null` vs `undefined`

## 들어가기 전에

보통 어떤 값을 반환하는 함수에서 마땅히 반환할 값이 없을 때 `null` 또는 `undefined` 을 사용하곤 합니다.

```js
document.getElementById('empty'); // null
[1, 2, 3, 4].find(num => num === 5); // undefined
```

2개월 전 즈음, 회사 내 팀원들과 `null` vs `undefined`로 이야기를 나눈 적이 있었습니다. 이야기를 나누기 전에는 당연하듯 `null` 을 사용했었고 `undefined`를 사용해야겠다는 생각 자체를 안 했었습니다.

그런데 최근 들어 `undefined`를 사용하는 코드를 종종 보게 되었고 `null` vs `undefined`에 대한 고민이 다시 생기게 되어 간략히 정리해 보았습니다.

* [오픈소스 null vs undefined](#오픈소스-null-vs-undefined)
* [null 선호](#null-선호)
* [undefined 선호](#undefined-선호)

## 오픈소스 null vs undefined

먼저 오픈소스들에서는 `null` 과 `undefined` 중 어떤 값을 선호하는지 찾아보았습니다. 모든 오픈소스를 둘러볼 수는 없기에 관심있는 프로젝트만 살펴보았습니다.

<table>
<thead>
<tr>
    <th>언어</th>
    <th>프로젝트</th>
    <th>null vs undefined</th>
</tr>
</thead>
<tbody>
<tr>
    <td rowspan=3>JavaScript</td>
    <td><a href='https://github.com/eslint/eslint'>eslint</a></td>
    <td>null</td>
</tr>
<tr>
    <td><a href='https://github.com/facebook/react'>react</a></td>
    <td>null</td>
</tr>
<tr>
    <td><a href='https://github.com/GoogleChrome/lighthouse'>lighthouse</a></td>
    <td>null</td>
</tr>
<tr>
    <td rowspan=3>TypeScript</td>
    <td><a href='https://github.com/typescript-eslint/typescript-eslint'>typescript-eslint</a></td>
    <td>null</td>
</tr>
<tr>
    <td><a href='https://github.com/romefrontend/rome'> rome </a></td>
    <td>undefined</td>
</tr>
<tr>
    <td><a href='https://github.com/microsoft/TypeScript'> TypeScript</a></td>
    <td>undefined</td>
</tr>

</tbody>
</table>

찾아본 프로젝트 수가 적어서 큰 의미는 없지만 조사한 프로젝트에서는, JavaScript는 `null`, TypeScript는 `undefined` 를 사용하는 경우가 보입니다. 여기서 조금 놀랐는데, 당연히 모두 `null`을 사용하고 있을 줄 알았습니다. (근거 없음)

* [ESLint - example](https://github.com/eslint/eslint/blob/master/lib/rules/utils/ast-utils.js#L87-L99)

```js
function getUpperFunction(node) {
    for (let currentNode = node; currentNode; currentNode = currentNode.parent) {
        if (anyFunctionPattern.test(currentNode.type)) {
            return currentNode;
        }
    }
    return null; // <--
}
```

* [TypeScript - example](https://github.com/microsoft/TypeScript/blob/7b942b4fa875f2877a90d201cf146e6196b0c07b/src/compiler/watchUtilities.ts#L42-L46)

```ts
 export function createCachedDirectoryStructureHost(host: DirectoryStructureHost, /* ...*/): CachedDirectoryStructureHost | undefined {
        if (!host.getDirectories || !host.readDirectory) {
            return undefined; // <--
        }
```

살펴본 오픈소스 프로젝트에서도 선호하는 컨벤션에 대한 명확한 이유를 찾을 수는 없었습니다. 이에 `null`, `undefined` 각각 선호하는 이유에 대해 정리해보았습니다.

# null 선호

## 1. ECMASpec

> **4.3.10 undefined value**  
> primitive value used when a variable has not been assigned a value 
> 
> **4.3.12 null value**  
> primitive value that represents the intentional absence of any object value

ECMA 10 스펙을 보면 `undefined` 와 `null` 값을 위와 같이 설명하고 있습니다
해석해 보면 `undefined`는 "변수에 값이 할당되지 않았을 때", `null` 은 "객체 값의 부재를 의도적으로 표현할 때" 쓰인다고 되어있습니다. 때문에 스펙상으로는 어떤 값의 부재를 표현할 때는 `null`이 더 적절해 보입니다.

## 2. 명시적인 반환값 표현

```js
function foo () { console.log("foo"); }

var ret = foo();
ret; // unedfined
```

JavaScript 함수에서 return 문이 없거나 뒤에 반환 값이 없으면 `undefined`를 반환하게 됩니다. 

때문에 `undefined`를 사용하면 **값을 반환하지 않는 함수** 와 **값을 반환 하지만 없는 값을 표현하는 함수**를 명확하게 구분 지을 수 없습니다.

```js
// 반환 값이 없는 함수
function printFoo() {
  console.log("foo");
}

// 반환 값이 있는 함수
function getBar() {
  if (barExists()) {
    return "bar";
  }
  return null;
}
```

반면 `null` 을 사용하면 위와 같이, 이 둘을 구분 지울 수 있습니다.

## 3. undefined 식별자

```js
var null = 1; // Uncaught SyntaxError: Unexpected token 'null'

var undefined = 2; // no error
```

`null` 은 식별자로 사용할 수 없습니다. 반면 `undefined`는 예약어가 아니기 때문에 식별자로 사용될 수 있습니다.

```js
function foo() {
  var undefined = 2;
  console.log(undefined);
}
foo();
```

때문에 중첩된 스코프에서 `undefined` 식별자에는 다른 값이 할당될 수 있습니다. (전역스코프에선 안됩니당)

# undefined 선호

## 1. Optional Chaining

[ECMA Propsal 4의 Optional Chaining](https://github.com/tc39/proposal-optional-chaining) 은 프로퍼티 접근에서 참조가 nullish(`null` or `undefined`)일 경우에 더 이상 참조하지 않고 반환값을 `undefined`로 종결짓습니다.

```js
function getBaz() {
  return foo?.bar?.baz?.();
}
```

반환값을 `undefined`로 사용할 경우 값의 부재를 위와 같이 간단하게 표현할 수 있습니다.

```js
function getBaz() {
  return foo?.bar?.baz?.() ?? null;
}
```

반면 `null`만을 사용하게 된다면 Optional Chaining이 `undefined`를 반환하기 때문에 반환값을 `null`로 바꿔주는 처리가 필요합니다.

> 실제로 [typescript-eslint 에서 코드를 작성할 때](https://github.com/typescript-eslint/typescript-eslint/pull/2156/files#diff-bcb5a3b3b1ba2154d91dbf1ebd8c54d2R56), 이 경험을 했었는데 다소 어색했습니다.

## 2. typeof

`undefined`의 타입은 Undefined 이고 `null`의 타입은 Null 입니다. 그럼에도 `typeof` 연산자는 `null` 값에 대해서 "object"를 반환합니다.

```js
function returnNull() { return null };
function returnUndefined() { return null };

typeof returnNull(); // "object"
typeof returnUndefined(); // "undefined"
```

이는 JavaScript에 익숙하지 않은 개발자들이 어떤 값을 `if(typeof ret === "object")`를 이용해 검증할 때 종종 문제가 됩니다.

## 그 밖에...

그 밖에 상황에 따라 장, 단점이 되는 `null`과 `undefined`의 다른 동작들입니다.

### JSON.stringify

`JSON.stringify`를 이용해 객체를 직렬화하면 `undefined`는 생략되지만 `null` 은 생략되지 않습니다

```js
JSON.stringify(undefined);
JSON.stringify(null); // "null"
JSON.stringify({a: undefined, b: null}); // "{"b": null}"
```

### Default Parameter

매개변수의 기본값을 사용할 때 `null`은 명시적인 값으로 인식되기 때문에, 기본값이 할당되지 않습니다.

```js
function foo(a = {}) {
  return a;
}

foo(undefined); // {}
foo(null);  // null
```

# 결론

알아보기 전에는 딱히 고민 없이 `null` 을 사용해야 한다고 생각했었습니다. 이는 첫 프로그래밍 언어가 C였기 때문에 당연히 그렇게 생각했던 것 같습니다.

알아보면서 놀란 점은 `undefined` 사용을 권장하는 경우가 은근히 많다는 사실이었습니다.
  - [TypeScript Coding guidelines - Use undefined. Do not use null.](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined)
  - [Douglas Crockford - I have stopped using null](https://www.youtube.com/watch?v=PSGEjv3Tqo0&t=563s)

개인적으로는 `null` 을 사용해야 한다는 입장에서, `undefined` 든 `null` 이든 하나의 컨벤션에 따라 일관되게만 작성하면 된다는 입장을 가지게 되었습니다.
