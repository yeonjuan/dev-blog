# Functional JavaScript First Steps

> [FrontEnd Masters: Functional JavaScript First Steps](https://frontendmasters.com/courses/functional-first-steps) 수강후 정리한 글.

## What is Functional Programming

- 프로그래밍 패러다임

### Programming Paradigms
- Imperative
  - 명령의 연속
- Object-Oriented
  - 자신의 상태를 가진 객체들과 객체간에 메시지로 사호작용하는 형태로 구성
-  Declarative
  - 선언형으로 구성
  - 어떻게 보다는 무엇에 집중

### Pure Function
- 블랙박스로 생각할 수 있음
- 동일 입력에 따라 동일 출력을 보장
- 사이드 이펙트가 없는 함수
- 사이드 이펙트
  - 입력/출력을 제외한 다른 영역과 영향을 미치는 행위

```js
// Not pure
let name = 'Alonzo';

function greet() {
  console.log(`Hello, ${name}!`);
}

greet(); // Hello Alonzo!
name = 'Alan';
greet(); // Alonzo, Alan
// 입력이 같지만 다른 결과

// Pure
function greet(name) {
  return `Hello, ${name}!`;
}
greet('Alonzo'); // "Hello Alonzo!"
greet('Alan'); // "Hello Alan!"
```

### Why functional programming
- 순수 함수를 통해 결과가 예측 가능해져 안전함
- 테스트와 디버깅이 쉬움
- 함수형이 적절하지 않은 경우도 있음

### Why functional JavaScript
- OOP JS 의 어려운 부분: prototype, this...

### Side Effect
- 함수 내에서 외부 데이터를 수정하는 행위
- 인자를 자외하고 외부에서 데이터를 가져오는 행위
- 함수 내에서 외부 데이터를 업데이트 하는 행위

-> Functional: 사이드 이펙트 대신 인자로 주어진 데이터를 복사해서 새로운 데이터로 반환

## Recursion

- Iteration
  - Imperative
  - looping
  - stateful

- Recursion
  - functional
  - self-referential
  - stateless


- iteration:
```js
function sum (numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}
```

- recursion:

```js
function sum(numbers) {
  if (numbers.length === 1){
    return numbers[0];
  }
  return numbers[0] + sum(numbers.slice(1));
}
```

### Performance: iteration vs recursion

- call stack
- 같은 입력에 대해 동일한 처리를 여러번 함 => 메모이제이션으로 해결

## Higher-order functions
- 함수를 입력 또는 출력으로 가지는 함수를 지칭함

## Closure

### Functions can define functions
- 내부 함수를 반환함으로써 스코프를 기억하게 할 수 있다.

```js
function makeAdjectifier(adjective) {
  return function (noun) {
    return adjective + " " + noun;
  }
}

const coolify = makeAdjectifier("cool");
coolify("workshop"); // "cool workshop";

```

## Currying

## Function composition

- 간단한 함수들로 복잡한 함수를 생성

### pipeline

```js
function pipeline(...functions) {
  const pipe = (arg) => functions.reduce((ret, func) => func(ret), arg);
  return function(input) {
    return pipe(input);
  };
}


const somePipe = pipeline(func1, func2, ...);
const output = somePipe(input);
```

### Immutability

- Mutation 을 피하기 위해서 데이터를 카피해 새로운 데이터를 생성해야함 -> 효율적이지 않음 -> Immutable Data Structure 를 사용

- Immutable Data Structure
  - 트리형태로 구성된 데이터
  - 실제 카피가 필요한 데이터만 카피
  - https://github.com/immutable-js/immutable-js
  - https://immerjs.github.io/immer/
