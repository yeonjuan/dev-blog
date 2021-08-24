# Composing Software

> [Composing Software](https://www.amazon.com/Composing-Software-Exploration-Programming-Composition/dp/1661212565)를 읽고 정리한 글

## JS 와 FP

### JS의 FP 특성

**First Class Function**
  - JS는 함수를 인자로 넘기거나, 함수를 반환하거나, 함수를 변수에 할당하는 등 함수를 데이터 값으로 다룰 수 있다. 덕분에, High-Order-Function, Partial Application, Curry, Composition을 활용할 수 있다.

**익명 함수와 간결한 람다 문법**
  - 간결한 람다 문법으로 High-Order-Function 을 활용하기 쉽다.

**Closure**
  - 클로저는 함수를 렉시컬 환경과 함께 생성하는 것이다. 클로저를 활용해 고정된 인자를 가진 함수를 만들어 낼 수 있다.

### FP언어에 비해 JS에 부족한 FP 특성

**Purity (순수성)**
  - 일부 FP 언어에서는 순수성이 강제된다.
  - JS 에서 순수성은 컨벤션을 통해 보장해야 하기 때문에 쉽게 순수성이 깨질 수 있다.

**Immutability (불변성)**
  - 일부 FP 언어에서는 Mutation 이 불가능하다. Mutation을 피하기 위해 매번 새로운 데이터를 생성해 내는데, FP 언어레벨에서 Trie 형태의 데이터를 이용해 효율적인 Immutability 데이터를 다룰 수 있도록 보장한다.
  - JS 에서는 기본적으로는 이런 특징을 제공하지 않는다. 이를 도와주는 [Immutable.js](https://github.com/immutable-js/immutable-js) 와 같은 라이브러리가 존재한다.

**Recursion (재귀)**
  - 일부 FP 언어에서는 반복문 대신 재귀를 사용하도록 강제한다.
  - JS에서도 재귀 사용이 가능하지만 꼬리 재귀 최적화와 같이 언어적으로 스택과 프레임을 재사용하도록 하는 효율적인 재귀 사용 지원이 부족하다.
  - 꼬리 재귀 최적화 없이 많은 재귀문을 사용하면 스택오버플로우의 위험이 있다.
  - 일부 최신 브라우저에서는 꼬리 재귀 최적화를 지원한다.


