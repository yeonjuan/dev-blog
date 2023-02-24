# well-known 심볼

> 원문: https://h3manth.com/posts/Well-known-symbols/

최근 공개 포럼에서 찾아보지 않고 well-known 심볼을 세 개 이상 말할 수 있는 사람이 있는지 물었는데, 아는 사람이 거의 없어서 이 포스팅을 작성하게 되었습니다.

well-known 심볼은 모든 영역에서 동일하게 사용되는 등록되지 않은 심볼입니다. well-known symbol을 나열하면 다음과 같습니다.

- Symbol.iterator
- Symbol.toStringTag
- Symbol.toPrimitive
- Symbol.asyncIterator
- Symbol.hasInstance
- Symbol.isConcatSpreadable
- Symbol.species
- Symbol.match
- Symbol.matchall
- Symbol.replace
- Symbol.search
- Symbol.split
- Symbol.unscopables
- Symbol.dispose

이 심볼 값들이 정말 유용한지 알기 위해 몇 가지 예를 살펴보겠습니다.

`Symbol.iterator`: 이 심볼은 객체의 기본 반복자를 정의하는 데 사용됩니다.
for-of 루프 또는 스프레드 연산자를 사용하여 객체에 대한 반복을 활성화하는 데 사용됩니다.

```js
const obj = { a: 1, b: 2, c: 3 };

obj[Symbol.iterator] = function* () {
  for (const key of Object.keys(this)) {
    yield [key, this[key]];
  }
};

for (const [key, value] of obj) {
  console.log(`${key}: ${value}`);
}
```

`Symbol.toStringTag`: 이 심볼은 객체에서 호출될 때 `Object.prototype.toString` 메서드가 반환하는 문자열 값을 지정하는 데 사용됩니다.
객체에 대한 사용자 지정 문자열 표현을 제공하는 데 사용할 수 있습니다.

```js
class MyClass {
  static [Symbol.toStringTag] = "MyClass";
}

const myInstance = new MyClass();

console.log(myInstance.toString()); // 결과 '[object MyClass]'
```

`Symbol.toPrimitive`: 이 심볼은 암묵적으로 호출되는 객체의 `valueOf` 및 `toString` 메서드의 동작을 지정하는 데 사용됩니다.
객체에 대한 사용자 지정 문자열 및 숫자 표현을 제공하는 데 사용할 수 있습니다.

```js
class Life {
  valueOf() {
    return 42;
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "number":
        return this.valueOf();
      case "string":
        return "Forty Two";
      case "default":
        return true;
    }
  }
}

const myLife = new Life();
console.log(+myLife); // 42
console.log(`${myLife}`); // "Forty Two"
console.log(myLife + 0); // 42
```

`Symbol.asyncIterator`: 이 심볼은 객체에 대한 비동기 반복자를 정의하는 데 사용됩니다.
객체에 대한 비동기 반복을 활성화하는 데 사용됩니다.

```js
class MyAsyncIterable {
  async *[Symbol.asyncIterator]() {
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      yield i;
    }
  }
}

(async () => {
  for await (const value of new MyAsyncIterable()) {
    console.log(value);
  }
})();

// 1초 후 결과:
// 0
// 2초 후 결과:
// 1
// 3초 후 결과:
// 2
// 4초 후 결과:
// 3
// 5초 후 결과:
// 4
```

`Symbol.hasInstance`: 이 심볼은 객체가 생성자의 인스턴스인지 확인하는 데 사용됩니다.
`instanceof` 연산자의 동작을 변경하는 데 사용할 수 있습니다.

```js
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

const arr = [1, 2, 3];
console.log(arr instanceof MyArray); // true
```

`Symbol.isConcatSpreadable`: 이 심볼은 다른 객체와 연결될 때 객체를 평탄하게 해야 하는지를 결정하는 데 사용됩니다.
`Array.prototype.concat` 메서드의 동작을 변경하는 데 사용할 수 있습니다.

```js
const arr1 = [1, 2, 3];
const spreadable = {
  [Symbol.isConcatSpreadable]: true,
  0: 4,
  1: 5,
  2: 6,
  length: 3,
};

console.log([].concat(arr1, spreadable)); // [1, 2, 3, 4, 5, 6]
```

`Symbol.species`: 이 심볼은 파생 객체를 생성할 때 생성자를 지정하는 데 사용됩니다.
새 객체를 생성하는 내장 메서드 동작을 커스터 마이징 하는데 사용할 수 있습니다.

```js
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const myArray = new MyArray(1, 2, 3);
const mappedArray = myArray.map((x) => x * 2);

console.log(mappedArray instanceof MyArray); // false
console.log(mappedArray instanceof Array); // true
```

추신: 이 기능은 [향후](https://github.com/tc39/proposal-rm-builtin-subclassing) 삭제될 수 있습니다.

`String.match`: 이 심볼은 `String.prototype.match` 메서드를 사용할 때 검색할 값을 결정하는 데 사용됩니다.
이 메서드는 유사 RegExp 객체에 대한 `match` 메서드 동작을 변경하는 데 사용할 수 있습니다.

```js
const myRegex = /test/;
"/test/".startsWith(myRegex); // TypeError 발생

const re = /foo/;
re[Symbol.match] = false;
"/foo/".startsWith(re); // true
"/bar/".endsWith(re); // false
```

추신: 이 심볼의 존재는 객체를 "정규식이 되도록" 표시합니다.

```js
const myRegex = /foo/g;
const str = "How many foos in the the foo foo bar?";

for (result of myRegex[Symbol.matchAll](str)) {
  console.log(result); // 일치하는 값들을 받습니다.
}
```

`Symbol.replace`: 이 심볼은 `String.prototype.replace` 메서드를 사용할 때 대체 값을 결정하는 데 사용됩니다.
유사 RegExp 객체에 대한 `replace` 메서드의 동작을 변경하는 데 사용할 수 있습니다.

```js
const customReplace = (str) => str.replace(/\d+/g, (match) => `-${match}-`);

const customString = {
  [Symbol.replace]: customReplace,
};

const originalString = "foo123bar456baz";

const result = originalString.replace(customString, "*");

console.log(result); // 결과 "foo-123-bar-456-baz"
```

`Symbol.search`: 이 심볼은 `String.prototype.search` 메서드를 사용할 때 검색할 값을 결정하는 데 사용됩니다.
유사 RegExp 객체에 대한 `search` 메서드의 동작을 변경하는 데 사용할 수 있습니다.

```js
const customSearch = (str) => str.search(/\d+/);

const customRegExp = {
  [Symbol.search]: customSearch,
};

const string = "foo123bar456baz";

string.search(customRegExp); // 결과 3
```

`Symbol.split`: 이 심볼은 `String.prototype.split` 메서드를 사용할 때 분할할 값을 결정하는 데 사용됩니다.
유사 RegExp 객체에 대한 `split` 메서드의 동작을 변경하는 데 사용할 수 있습니다.

```js
const { Symbol } = require("es6-symbol");

const customSplit = (str) => str.split(/\d+/);

const customRegExp = {
  [Symbol.split]: customSplit,
};

const string = "foo123bar456baz";

string.split(customRegExp); // 결과 [ 'foo', 'bar', 'baz' ]
```

`Symbol.unscopables`: 이 심볼은 with 문의 스코프에서 제외해야 하는 객체의 프로퍼티를 결정하는 데 사용됩니다.
with 문의 동작을 변경하는 데 사용할 수 있습니다.

```js
const person = {
  age: 42,
};

person[Symbol.unscopables] = {
  age: true,
};

with (person) {
  console.log(age);
  // 예상되는 결과: Error: age is not defined
}
```

`Symbol.dispose`: 명시적 리소스 관리는 명령적 방법(`Symbol.dispose`와 같은) 또는 선언적 방법 (`using` 과 같은 블록스코프 선언)을 사용하여 사용자가 "리소스"의 수명을 명시적으로 관리하는 시스템을 말합니다.

```js
{
  console.log(1);
  using {
    [Symbol.dispose]() {
      console.log(2);
     }
  };
  console.log(3);
}
// 1, 3, 2 이 로깅 됩니다.
```

이 글은 자바스크립트 언어에 내재된 잘 알려진 심볼에 대해 더 깊이 이해할 수 있도록 돕기 위해 작성되었습니다.
Symbol.iterator, Symbol.toStringTag, Symbol.for와 같은 심볼은 코드의 동작을 보강하고 조절하는 데 활용할 수 있는 정교하고 다재다능한 도구입니다.
자바스크립트 환경에서 사용 가능한 심볼을 넓게 이해하는 것은 고성능, 유지 관리 및 확장 가능한 응용프로그램을 개발하는 데 중요합니다.
따라서 프로젝트의 개념화 및 구현 단계에서 심볼들을 도입할 수 있는지를 판단해서 코드를 간소화하고 더 정교하고 우아한 방식으로 원하는 결과를 얻을 수 있도록 하는 것이 좋습니다.
