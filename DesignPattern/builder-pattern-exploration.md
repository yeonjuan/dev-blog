# JavaScript 빌더(Builder) 탐구

> 이 글은 [An Exploration of JavaScript Builders](http://ryanogles.by/an-exploration-of-javascript-builders/)를 원작자(Ryan Oglesby)의 허락을 받아 번역하였습니다.

[이전에 블로그에서도 포스팅](http://ryanogles.by/how-your-mother-can-help-you-build-cleaner-unit-tests/part-i/)했듯이, 빌더는 저에게 흥미로운 주제입니다.
이번엔, 빌더를 JavaScript 관점으로 살펴보았습니다.
이 글에서는 현대적인 언어 특징을 활용하여 JavaScript, 특히 ES6에서 빌더를 모델링 하는 세 가지 기법을 살펴보겠습니다.

> 글에서 모든 예제는 오직 테스트 목적으로 작성되었습니다.
> 실제 코드에 빌더 패턴을 사용할 수 있지만, 아래 표시된 빌더에는 기본값이 미리 포함되어 있어 프로덕션 코드에는 적합하지 않습니다.

## 고전적인 방식

먼저 객체의 상태를 빌드 하기 위해 "withers"를 사용하는 간단하고 이해하기 쉬운 빌더 부터 시작하겠습니다.
각 "wither"는 체이닝을 하기 위해 `this`를 반환합니다. `build` 메서드는 결국 일반 JavaScript 객체를 반환합니다.

```js
class ProductBuilder {
  constructor() {
    this.name = 'A Product'
    this.price = 9.99
    this.category = 'other'
  }

  withName(name) {
    this.name = name
    return this
  }

  withPrice(price) {
    this.price = price
    return this
  }

  withCategory(category) {
    this.category = category
    return this
  }

  build() {
    return {
      name: this.name,
      price: this.price,
      category: this.category,
    }
  }
}

console.log(
  new ProductBuilder()
    .withName('Harry Potter')
    .withCategory('book')
    .build()
)
// =>
//    {
//      name: 'Harry Potter',
//      price: 9.99,
//      category: 'book'
//    }
```

간단하고 익숙하지만 장황합니다. 빌더는 세 개의 필드만 필요하지만 벌써 꽤 커졌고 많은 보일러 플레이트가 필요합니다.
이 크기는 필드의 수에 따라 선형적으로 증가합니다.

이 기법도 괜찮지만, 강력한 JavaScript의 기능을 사용하지 않고, Java-스러운 접근법을 취하고 있습니다. 이 점을 좀 더 살펴봅시다.

## 메타 프로그래밍을 통한 빌더 생성

앞의 예시중 몇 가지 단점, 즉 반복적인 "wither"에 대해 이야기해 봅시다. 각각의 "withers" 메서드를 수동으로 입력하기보다는 자동으로 생성해 봅시다.

```js
class ProductBuilder {
  constructor() {
    this.name = 'A metaprogrammed product'
    this.price = 9.99
    this.category = 'other'

    // 각 프로퍼티에 따라 "wither" 메서드 생성
    Object.keys(this).forEach(key => {
      const witherName = `with${key.substring(0, 1).toUpperCase()}${key.substring(1)}`
      this[witherName] = value => {
        this[key] = value
        return this
      }
    })
  }

  build() {
    // 빌더에서 함수가 아닌 프로퍼티의 배열을 가져옴
    const keysNoWithers = Object.keys(this).filter(key => typeof this[key] !== 'function')

    // 키 배열을 객체로 변환
    return keysNoWithers.reduce((returnValue, key) => {
      return {
        ...returnValue,
        [key]: this[key],
      }
    }, {})
  }
}

console.log(
  new ProductBuilder()
    .withName('Harry Potter')
    .withCategory('book')
    .build()
)
// =>
//    {
//      name: 'Harry Potter',
//      price: 9.99,
//      category: 'book'
//    }
```

이 패턴은 첫 번째 예제와 같은 결과를 만듭니다. 생성자에서는 객체의 프로퍼티를 통해, 자동으로 "wither" 메서드를 생성합니다. 그리고, `build` 메서드에서는 결과 객체를 만들기 위해 객체의 프로퍼티를 한 번더 사용합니다. 여기서 JavaScript의 멋진 기능인 [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)와 [object rest spread](https://github.com/tc39/proposal-object-rest-spread)를 사용하고 있습니다.

처음에는 지나치게 복잡해 보일 수 있습니다.(한 개의 빌더는 복잡합니다), 진짜 강력함은 빌더가 많을 때 발휘됩니다.
일반화된 부분을 공통의 슈퍼클래스로 쉽게 추출할 수 있어, 새로운 빌더를 엄청 쉽게 만들 수 있습니다.

```js
class BaseBuilder {
  init() {
    Object.keys(this).forEach((key) => {
      const witherName = `with${key.substring(0,1).toUpperCase()}${key.substring(1)}`;
      this[witherName] = (value) => {
        this[key] = value;
        return this;
      };
    });
  }

  build() {
    const keysNoWithers = Object.keys(this).filter((key) => (
      typeof this[key] !== 'function'
    ));

    return keysNoWithers.reduce((returnValue, key) => {
      return {
        ...returnValue,
        [key]: this[key]
      };
    }, {});
  }
}

class ProductBuilder extends BaseBuilder {
  constructor() {
    super();

    this.name = 'A metaprogrammed product';
    this.price = 9.99;
    this.category = 'other';

    super.init();
  }
}

class SandwichBuilder extends BaseBuilder {
  constructor() {
    super();

    this.meat = 'ham';
    this.cheese = 'swiss';

    super.init();
  }
}


console.log(
  new ProductBuilder()
    .withName('Harry Potter')
    .withCategory('book')
    .build()
);
console.log(
  new SandwichBuilder()
    .withMeat('Roast Beef'
    .withCheese('Havarti')
    .build()
);
// =>
//    {
//      name: 'Harry Potter',
//      price: 9.99,
//      category: 'book'
//    }
// =>
//    {
//      name: 'Roast Beef',
//      cheese: 'Havarti'
//    }
```

ES6 상속하에 구축된 이 일반적인 구조를 사용함으로써, 공통 인터페이스의 예측 가능성과 새로운 빌더 생성의 단순함을 얻게 됩니다.
필요에 따라 사용자 정의 기능을 추가하기 위해 쉽게 추가 메서드를 삽입할 수 있기 때문에, 빌더들은 여전히 확장 가능성을 열어두고 있습니다. 

하지만 여전히 장황한 "wither" 구문을 따르고 있습니다. 이 접근법은 본질적으로 객체 지향적입니다. OOP에서는 문제가 없지만 JavaScript는 유연성이 뛰어나고 여러 패러다임을 채택합니다.
좀 더 함수형 프로그래밍 기법을 활용해 빌더에 접근하면 어떨까요?

## 단순 함수 사용

클래스를 제거해봅시다. "withers"를 제거해봅시다. 대신 빌더를 함수로 모델링 해봅시다.

```js
const buildProduct = (overrides = {}) => {
  const defaults = {
    name: 'A functional product',
    price: 9.99,
    category: 'other',
  }

  return { ...defaults, ...overrides }
}

console.log(
  buildProduct({
    name: 'Harry Potter',
    category: 'book',
  })
)
// =>
//    {
//      name: 'Harry Potter',
//      price: 9.99,
//      category: 'book'
//    }
```

여기서 우리는 두 객체를 합치기 위해 object rest spread 을 사용합니다.

우아하지만 가장 명백한 단점은, `overrides` 객체의 내용에 대한 통제가 없다는 점이며, 이로인해 실수를 발생시킬 수 있습니다.
위의 예에서 `buildProduct({nme: 'Harry Potter'})`를 한다면 기본 name 을 가지고 추가 프로퍼티 "nme" 를 가진 객체를 만들어 낼 것입니다.
이는 이상적이지 않습니다. 그걸 고쳐보겠습니다.

```js
import { difference } from 'lodash';

const buildProduct = (overrides = {}) => {
  const defaults =
    name: 'A functional product',
    price: 9.99,
    category: 'other'
  };

  // overrides에 추가 키를 도입하지 못하도록 막음 
  const extraOverrides = difference(
    Object.keys(overrides),
    Object.keys(defaults)
  );
  if (extraOverrides.length > 0) {
    throw new Error(`Invalid builder! ${extraOverrides}`);
  }

  return {...defaults, ...overrides};
};

console.log(
  buildProduct({
    name: 'Harry Potter',
    category: 'book',
    keyThatDoesNotExist: 'oops'
  })
);
// => Error: Invalid builder! keyThatDoesNotExist
```

[lodash의 배열 비교 유틸리티](https://lodash.com/docs/4.17.15#difference)를 사용하여, 이 문제를 예방할 수 있습니다.
그리고 다른 재사용 가능한 코드 조각들과 마찬가지로. 이를 많은 빌더들이 사용하는 함수로 추출할 수 있습니다.

위의 모든 예에서 만들어지는 개체는 단순합니다. 이 함수형 기법은 여러 중첩된 객체를 포함하는 더 크고 복잡한 객체를 제대로 관리하지 못합니다. 깊은 합병(deep merging)을 할 수 있지만, 이는 추론하기 힘들기 때문에 피하겠습니다. 대신 여러 빌더를 함께 합성하는 것을 추천합니다.

```js
import { difference } from 'lodash'

const preventExtraOverrides = (defaults, overrides) => {
  const extraOverrides = difference(Object.keys(overrides), Object.keys(defaults))

  if (extraOverrides.length > 0) {
    throw new Error(`Invalid builder! ${extraOverrides}`)
  }
}

const buildProductName = (overrides = {}) => {
  const defaults = {
    name: 'A product',
    description: 'A product description',
  }

  preventExtraOverrides(defaults, overrides)

  return { ...defaults, ...overrides }
}

const buildProductPrice = (overrides = {}) => {
  const defaults = {
    price: 50,
    taxRate: 0.08,
  }

  preventExtraOverrides(defaults, overrides)

  return { ...defaults, ...overrides }
}

const buildProduct = (overrides = {}) => {
  const defaults = {
    name: buildProductName(),
    price: buildProductPrice(),
    category: 'other',
  }

  preventExtraOverrides(defaults, overrides)

  return { ...defaults, ...overrides }
}

console.log(
  buildProduct({
    name: buildProductName({ name: 'Harry Potter' }),
    price: buildProductPrice({ price: 9.99 }),
  })
)
// =>
//  {
//    name: {
//      name: 'Harry Potter',
//      description: 'A product description'
//    },
//    price: {
//      price: 9.99,
//      taxRate: 0.08
//    },
//    category: 'other'
//  }
```

빌더를 합성함으로써, 객체를 작고 독립적으로 분해했기 때문에 쉽게 추론할 수 있습니다.
각 빌더는 비슷한 패턴을 따르지만, 스스로 포함되기 때문에 특정 상황에 맞춤화할 수 있습니다.

## 그래서 어떤 방법이 최고일까요?

상황에 따라 다릅니다. 듣고 싶었던 말은 아니겠죠?  그렇게 쉽지 않습니다.
당신이 겪는 독특한 상황에는 어떤 패턴이 다른 것들 보다 더 적절할 수 있습니다.
당신의 팀이 아직 JavaScript 의미론에 익숙하지 않은 전직 Java 개발자로 가득한 팀인가요?
아마 고전적인 접근법으로 시작해서 메타 프로그래밍 기법을 향해 나아가는 것이 결국 적절할 것입니다.
당신의 팀은 함수형 패러다임에 열성적인가요? 함수형 접근법을 사용하세요.
 
전반적으로, JavaScript는 다중 패러다임 언어로, 많은 요구에 맞게 변화할 수 있다는 것을 기억세요. Enjoy!
