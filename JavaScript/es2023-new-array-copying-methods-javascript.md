# ES2023에는 자바스크립트에 새로운 배열 복사 메서드가 도입됩니다.

> 원문: https://www.sonarsource.com/blog/es2023-new-array-copying-methods-javascript/

![](https://assets-eu-01.kc-usercontent.com/6cc4ce1e-8db0-0171-a6b3-352aa24017de/7a119115-0abd-412f-9587-36c77808db7a/javascript-array-copying-methods_blog-index.webp?w=1200&h=628&auto=format&fit=crop)

[ECMAScript 2023 스펙](https://tc39.es/ecma262/)이 최근 확정되었습니다.
이번 스펙에는 자바스크립트 프로그램을 더 예측 가능하고 유지 보수하기 쉽도록 하는 데 도움이 되는 배열 객체에 대한 몇 가지 새로운 메서드가 포함되어 있습니다.
`toSorted`, `toReversed`, `toSpliced`, `with` 메서드를 사용하면, 원본 데이터를 변경하지 않고 복사본을 만들어 변경하는 방식으로 배열에 대한 연산을 수행할 수 있습니다.
그럼 변경된 내용과 프로젝트에서 이를 사용하는 방법을 살펴보겠습니다.

## 변경(Mutation)과 사이드 이펙트

배열 객체에는 몇 가지 이상한 점이 있었습니다.
`sort`, `reverse`, `splice` 같은 메서드는 원본 배열을 변경합니다.
`concat`, `map`, `filter` 같은 다른 메서드들은 배열의 복사본을 만들고 복사본에다가 작업을 수행합니다.
객체에 변형을 일으키는 작업을 수행하면 사이드 이펙트가 발생하고, 시스템의 다른 곳에서 예기치 않은 동작이 발생할 수 있습니다.
예를 들어, 배열을 반전시키면 다음과 같은일이 일어납니다.

```js
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const reversed = languages.reverse();
console.log(reversed);
// => [ 'CoffeeScript', 'TypeScript', 'JavaScript' ]
console.log(languages);
// => [ 'CoffeeScript', 'TypeScript', 'JavaScript' ]
console.log(Object.is(languages, reversed));
// => true
```

보시다시피 원본 배열이 반전되었고 배열을 반전시킨 결과를 새 변수에 할당했지만 두 변수 모두 동일한 배열을 가리키고 있습니다.

## 배열 변경과 리액트

배열을 변경하는 배열 메서드와 관련하여 가장 잘 알려진 문제 중 하나는 배열을 리액트 컴포넌트에서 사용할 때입니다.
배열 자체는 동일한 객체이므로 배열을 변경한 다음 새 상태로 설정하면 렌더링이 새로 발생하지 않습니다.
대신에 먼저 배열을 복사하고, 복사본을 수정한 뒤에 새 상태로 설정해야 합니다.
이 때문에 리액트 문서에는 [배열을 업데이트 하는 방법](https://react.dev/learn/updating-arrays-in-state)을 설명하는 문서가 있습니다..

## 복사후 변경

이 문제를 해결하는 방법은 배열을 먼저 복사한 다음 변경하는 것이었습니다.
배열의 복사본을 만드는 방법에는 다음과 같은 여러 가지가 있습니다. ` Array.from`, 스프레드 연산자, 인자 없이 `slice` 함수를 호출하는 방법 등이 있습니다.

```js
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const reversed = Array.from(languages).reverse();
// => [ 'CoffeeScript', 'TypeScript', 'JavaScript' ]
console.log(languages);
// => [ 'JavaScript', 'TypeScript', 'CoffeeScript' ]
console.log(Object.is(languages, reversed));
// => false
```

해결 방법이 있다는 것은 좋지만, 여러 복사 방법 중 하나를 먼저 수행해야 한다는 것을 기억해야 하는 것은 좋지 않습니다.

## 복사본을 수정하는 새로운 메서드

이것이 새로운 메서드들이 생긴 배경입니다.
`toSorted`, `toReversed`, `toSpliced`, `with` 모두 원본 배열을 복사하고 복사본을 변경한 뒤에 반환합니다.
하나의 함수만 호출하면 되므로 각 작업을 더 쉽게 작성할 수 있고, 배열을 복사하는 네 가지 방법 중 하나를 먼저 분석할 필요가 없으므로 더 쉽게 읽을 수 있습니다.
그래서 각 메서드는 어떤 역할을 할까요?

### Array.prototype.toSorted

[toSorted 함수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)는 정렬된 새로운 배열을 반환합니다.

```js
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const sorted = languages.toSorted();
console.log(sorted);
// => [ 'CoffeeScript', 'JavaScript', 'TypeScript' ]
console.log(languages);
// => [ 'JavaScript', 'TypeScript', 'CoffeeScript' ]
```

[sort 함수에는 몇 가지 예상치 못한 동작](https://philna.sh/blog/2019/08/26/how-not-to-sort-an-array-in-javascript/)이 있으며, 복사하는 것 이외에도 `toSorted`는 해당 동작을 공유합니다.
숫자나 악센트가 있는 문자를 정렬할 때는 여전히 조심해야합니다.
원하는 결과를 만들기 위해 ([String의 localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) 같은) [비교함수](https://rules.sonarsource.com/javascript/rspec-2871/?_gl=1*1a1uyk3*_gcl_au*MzE4NDQ3NTgzLjE2OTUwNDAwOTg.*_ga*MTg0MDkwMjM2My4xNjk1MDQwMDk4*_ga_9JZ0GZ5TC6*MTY5NTY0MDUwMy40LjEuMTY5NTY0MTU1Ny41OC4wLjA.)를 반드시 제공해야 합니다.

```js
const numbers = [5, 3, 10, 7, 1];
const sorted = numbers.toSorted();
console.log(sorted);
// => [ 1, 10, 3, 5, 7 ]
const sortedCorrectly = numbers.toSorted((a, b) => a - b);
console.log(sortedCorrectly);
// => [ 1, 3, 5, 7, 10 ]
```

```js
const strings = ["abc", "äbc", "def"];
const sorted = strings.toSorted();
console.log(sorted);
// => [ 'abc', 'def', 'äbc' ]
const sortedCorrectly = strings.toSorted((a, b) => a.localeCompare(b));
console.log(sortedCorrectly);
// => [ 'abc', 'äbc', 'def' ]
```

### Array.prototype.toReversed

[`toReversed 함수`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)를 사용하면 반전된 배열을 반환합니다.

```js
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const reversed = languages.toReversed();
console.log(reversed);
// => [ 'CoffeeScript', 'TypeScript', 'JavaScript' ]
```

Sonar에는 [reverse와 같이 오해의 소지가 있는 메서드 사용을 다루는 규칙](https://rules.sonarsource.com/javascript/RSPEC-4043/)이 있습니다.
`reverse`의 결과를 새 변수에 할당하는 것은 원래 배열도 변이되었기 때문에 오해의 소지가 있습니다.
이제 `toReversed` 또는 `toSorted`를 사용하여 배열을 복사하고 원본 대신 복사본을 변경할 수 있습니다.

### Array.prototype.toSpliced

[`toSpliced` 함수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)는 기존 버전의 `splice`와는 조금 다릅니다.
`splice`는 제공된 인덱스에서 요소를 삭제 및 추가하여 기존 배열을 변경하고 배열에서 삭제된 요소가 포함된 배열을 반환합니다.
`toSpliced`는 제거된 요소 없이 새로운 요소가 포함된 새 배열을 반환합니다.
여기 어떻게 동작하는지 보세요:

```js
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const spliced = languages.toSpliced(2, 1, "Dart", "WebAssembly");
console.log(spliced);
// => [ 'JavaScript', 'TypeScript', 'Dart', 'WebAssembly' ]
```

`splice`를 반환값 때문에 사용한다면 `toSpliced`가 대체제가 될수는 없습니다.
원본 배열을 변경하지 않고 삭제된 요소를 알고 싶다면 복사 메서드 [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)를 사용해야 합니다.

실망스럽게도 `splice`는 `splice`와 다른 인수를 사용합니다.
`splice`는 인덱스와 해당 인덱스 뒤의 제거할 요소 수를 받지만, `slice`는 시작과 끝의 두 인덱스를 받습니다
`splice` 대신에 `toSplice`를 사용하면서 삭제된 요소도 가져오고 싶다면 다음과 같이 원본 배열에 `toSplice` 및 `slice`를 적용하면 됩니다.

```js
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const startDeletingAt = 2;
const deleteCount = 1;
const spliced = languages.toSpliced(
  startDeletingAt,
  deleteCount,
  "Dart",
  "WebAssembly"
);
const removed = languages.slice(startDeletingAt, startDeletingAt + deleteCount);
console.log(spliced);
// => [ 'JavaScript', 'TypeScript', 'Dart', 'WebAssembly' ]
console.log(removed);
// => [ 'CoffeeScript' ]
```

### Array.prototype.with

`with` 함수는 배열의 한 요소를 변경하기 위해 대괄호 표기법을 사용하는 것과 같은 복사 기능입니다.
따라서 이렇게 배열을 직접 변경하는 대신

```js
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
languages[2] = "WebAssembly";
console.log(languages);
// => [ 'JavaScript', 'TypeScript', 'WebAssembly' ]
```

복사본을 만들어 변경을 할 수 있습니다.

```js
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const updated = languages.with(2, "WebAssembly");
console.log(updated);
// => [ 'JavaScript', 'TypeScript', 'WebAssembly' ]
console.log(languages);
// => [ 'JavaScript', 'TypeScript', CoffeeScript' ]
```

## 배열뿐만 아니라

일반 배열 객체만이 새로운 메서드의 이점을 누릴 수 있는 것은 아닙니다.
`Int8Array`부터 `BigUint64Array`까지 모든 [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)에 `toSorted`, `toReversed`, `with`를 사용할 수도 있습니다.
`TypedArray`에는 `splice` 메서드가 없으므로 `toSpliced` 메서드도 없습니다.

## 주의사항

위에서 `map`, `filter`, `concat`과 같은 메서드가 이미 복사 작업을 수행한다고 언급했습니다.
하지만 이러한 메서드와 새로운 복사 메서드 사이에는 차이가 있습니다.
내장된 `Array` 객체를 확장하고 인스턴스에서 `map`, `flatMap`, `filter` 또는 `concat`을 사용하면 동일한 타입의 새 인스턴스가 반환됩니다.
`Array`를 확장하고 `toSorted`, `toReversed`, `toSpliced`를 사용하는 경우 결과는 다시 일반 `Array`가 됩니다.

```js
class MyArray extends Array {}
const languages = new MyArray("JavaScript", "TypeScript", "CoffeeScript");
const upcase = languages.map((language) => language.toUpperCase());
console.log(upcase instanceof MyArray);
// => true
const reversed = languages.toReversed();
console.log(reversed instanceof MyArray);
// => false
```

`MyArray.from`을 사용하여 이를 다시 사용자 정의 `Array`로 되돌릴 수 있습니다.

```js
class MyArray extends Array {}
const languages = new MyArray("JavaScript", "TypeScript", "CoffeeScript");
const reversed = MyArray.from(languages.toReversed());
console.log(reversed instance of MyArray);
// => true
```

## 지원

ECMAScript 2023 사양은 매우 새롭지만 이러한 [새로운 배열 방식에 대한 지원](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#browser_compatibility)은 이미 잘 이루어지고 있습니다.
Chrome 110, Safari 16.3, Node.js 20, Deno 1.31은 네 가지 방법을 모두 지원하며, [아직 지원하지 않는 플랫폼을 위한 폴리필과 심(shim)](https://github.com/tc39/proposal-change-array-by-copy#implementations)을 사용할 수 있습니다.

## JavaScript 는 계속 개선됩니다.

예측 가능한 코드를 더 쉽게 작성할 수 있도록 ECMAScript 표준에 이와 같은 기능이 추가되는 것은 매우 반가운 일입니다.
ES2023에 포함된 [다른 몇 가지 제안](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md)도 있으니 관심이 있으시다면 확인해 보세요.
[TC39 제안 레포지토리 전체](https://github.com/tc39/proposals)에서 이 사양에 합류할 예정인 다른 제안서를 확인해보세요.
