# falsy & truthy

**falsy** 와 **truthy**는 ECMA 스펙에 등장하는 단어는 아닙니다. JavaScript 동작을 이해하기 쉽게 하기위해 사용되는 단어입니다.
번역해보면 **truthy**는 "참 같은 값", **falsy**는 "거짓 같은 값" 정도로 해석되며, 다음과 같이 정리할 수 있습니다.

**falsy**: 불리언 값으로 평가되는 문맥에서, **false**로 평가되는 값.
  * undefined, null, false, 0, -0, NaN, ""(빈문자열), 0n 등이 있음 (ECMA 2020 기준)

**truthy**: 불리언 값으로 평가되는 문맥에서, **true**로 평가되는 값.
  * **falsy**를 제외한 값들

**truthy**와 **falsy** 개념은 JavaScript의 값이 특정 문법, 연산에서 **true**나 **false**로 동작한다는 것을 말해줍니다.

그럼 ECMA 스펙에서 어떤 부분이 **falsy**와 **truthy** 개념을 만들어 내는지 살펴 보겠습니다.
스펙 문서는 [ECMA 2020](https://tc39.es/ecma262/2020/) 기준입니다.

## ToBoolean

ECMA 스펙에서 어떤 값을 **true**, **false**로 변환하는 연산은 [7.1.2 ToBoolean](https://tc39.es/ecma262/2020/#sec-toboolean)에 정의되어 있습니다.
이 연산은 추상 연산(Abstract Operation)으로 ECMASCript 언어의 런타임 스펙을 정의할 때 사용되는데, 값을 불리언 값으로 변환하는 역할을 합니다.

**추상 연산(Abstract Operation)** : 스펙을 위해 정의된 연산으로, 스펙 내에서만 존재하며 실제로 구현되어 있는 연산은 아닙니다.

ToBoolean 스펙을 일부 번역한 내용을 살펴보겠습니다.

[7.1.2 ToBoolean ( *argument* )](https://tc39.es/ecma262/2020/#sec-toboolean)

**7.1.2 ToBoolean ( *argument* )**
추상 연산 ToBoolean 은 *argument*를 인자로 받고, **Table 10** 에 따라 *argument* 를 Boolean 타입 값으로 변환한다:  

**Table 10: ToBoolean 변환**

| *argument* 타입 | 결과 |
| --- | --- |
| Undefined | **false** 반환 |
| Null | **false** 반환 |
| Boolean | *argument* 를 그대로 반환 |
| Number | *argument* 가 0, -0, NaN 이면 **false**, 그 외 **true** 반환 |
| String | *argument* 가 빈 문자열(길이가 0인)이면 **false**; 아니면 **true** 반환 |
| Symbol | **true** 반환 |
| BigInt | *argument* 가 **0n** 이면 **false** 반환, 그외 **true** 반환 |
| Object | **true** 반환 |

ToBoolean(*argument*)의 *argument* 타입과 값에 따라 **true**를 반환하는지, **false**를 반환하는지 정의되어 있습니다.

값으로 정리해보면, undefined, null, false, 0, -0, NaN, ""(빈문자열), 0n 의 8개의 값만 **false**로 변환되고, 그 외의 값은 **true**로 변환되는 것을 알 수 있습니다.
우리가 이미 알고 있는 **truthy**, **falsy** 에 해당하는 값들과 일치합니다.

왠지 **false**로 변환될 것 같은 [], {} 도 Object 타입이기 때문에 **true**로 변환되는 값인 걸 알 수 있습니다.

## 런타임 스펙에서 사용되는 ToBoolean

이제 런타임 스펙에서 ToBoolean이 사용되는 모습을 살펴보겠습니다.
ToBoolean은 Not 연산자(!), if, while, for, 삼항 연산자 ...등의 런타임 스펙에서 특정 값을 불리언 타입 값으로 변환하는데 사용됩니다.

* 참고: 아래에서 ToBoolean 앞의 **!** 표시는 해당 연산이 추상 연산이라는 표시입니다.

[12.5.9  Logical NOT Operator ( ! )](https://tc39.es/ecma262/2020/#sec-logical-not-operator)

**12.5.9 NOT 논리 연산자**  
  
*UnaryExpression*: ! *UnaryExpression*  
1. *expr* 는 *UnaryExpression* 을 평가한 결과이다.
1. *oldValue* 은 !**ToBoolean**(? GetValue(*expr*)) 이다.
1. *oldValue* 가 true면, false를 반환한다.
1. true를 반환한다.

2번 단계에서 평가된 표현식의 값을 ToBoolean 을 통해 불리언 타입으로 바꾸는 것을 확인할 수 있습니다.
그리고 그 값이 **true**면 **false**, 아니면 **true**를 반환합니다.

```js
console.log( !"a" ); // false
console.log( !null ); // true
```

[13.6 The if Statement](https://tc39.es/ecma262/2020/#sec-logical-not-operator)

**13.6 if 문**  

*IfStatement* : if ( *Expression* ) *Statement*  

1. *exprRef* 는 Expression을 평가한 결과이다.  
1. *exprValue* 는 !**ToBoolean**(? GetValue(exprRef)) 이다.  
1. *exprValue* 가 false 이면  
  a. NormalCompletion(undefined)를 반환한다.  
1. 아니면  
  a. *stmtCompletion* 은 *Statement* 를 평가한 결과이다.  
  b. Completion(UpdateEmpty(stmtCompletion, undefined)) 를 반환한다.

if 문 런타임 스펙의 2번 단계에서도 평가된 표현식의 값에 **ToBoolean** 연산을 수행해 값을 불리언 타입으로 바꿉니다.
그리고 그 값이 **false** 면 종료하고, 아니면 if 문의 *Statement* 를 실행하는 것을 알 수 있습니다.

```js
if ("") console.log("출력 X");

if ([]) console.log("출력 O"); // "출력 O"
```

스펙에 따라 실행되면서 ToBoolean 에 의해 값들이 불리언 값으로 변환됩니다.
이런 스펙이 개발자 관점에서는 특정 문맥에서 불리언처럼 동작하는 **truthy**, **falsy** 개념을 만들어 내는 것을 알 수 있습니다.   

## Summary

1. **truthy**, **falsy**는 ECMA 스펙의 추상 연산 ToBoolean과 이 연산을 사용하는 런타임 스펙들에 의해 만들어집니다.

2. 사실 아래 두 가지 내용만 알아두면 충분합니다.
  * **falsy**: 불리언 값으로 평가되는 문맥에서(ex 조건문), **false** 로 평가되는 값.
    * undefined, null, false, 0, -0, NaN, ""(빈문자열), 0n

  * **truthy**: 불리언 값으로 평가되는 문맥에서(ex 조건문), **true** 로 평가되는 값.
    * **falsy** 가 아닌 나머지

많은 글에서 **truthy**, **falsy**에 대해 설명하고 있고 이미 알고 있던 내용이었지만, 스펙에서 직접 확인하니 마음이 편안해졌습니다. 😚
