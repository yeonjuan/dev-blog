# 코딩 컨벤션 업무를 하며 알게 된 것들 - 1

최근 Javascript 코딩 컨벤션 관련 업무를 하고 있습니다. 업무를 하기 전에는, 만들어져 있던 Linter를 사용하기만 했었습니다. 어떤규칙들이 있는지, 왜 이런 규칙이 있는지 자세하게 알아본 적이 없었습니다.  
이번 업무를 통해 [Airbnb](https://github.com/airbnb/javascript)나 [StandardJS](https://standardjs.com/) 등 유명한 가이드의 규칙을 자세히 살펴보았습니다. 또 ESLint에는 어떤 규칙들이 있는지, 왜 이런 규칙이 있는지 찾아보는 좋은 계기가 되었습니다. ESLint 규칙을 찾아보면서 몰랐던 내용이나, 흥미로운 내용을 따로 정리해 보았습니다.

## 1. no-octal

[ESLint: no-octal](https://eslint.org/docs/rules/no-octal)

이 규칙은 8진수를 나타낼 때 0을 앞에 쓴 표현("0"-prefixed octal literals)을 쓰지 말자는 규칙입니다.

ES3에서는 다음과 같이 8진수를 8진수 숫자 앞에 0을 붙여서 나타낼 수 있었습니다.

```js
console.log(010); // 8
console.log(011); // 9
```

그런데 만약 0뒤에 10진수가 온다면 자바스크립트에서는 이를 10진수로 해석합니다.

```js
console.log(080); // 80
console.log(091); // 91
```

이런 경우 개발자가 8진수를 쓰려다 실수를 했는지, 10진수를 쓴건지 판단하기 어렵다고 생각합니다. 때문에 이런 표현을 금지할 수 있는 규칙을 제공하는 것 같습니다.  
  

-   "0"-prefixed octal literals 은 strict 모드나 ES6 이후 버전에서는 SyntaxError 에러를 발생시킵니다.\*

## 2. yoda

[ESLint: yoda](https://eslint.org/docs/rules/yoda)

yoda? 요다?  
이름이 좀 이상한것 같아 찾아보니 찾아보니 **스타워즈**의 요다 였습니다. **요다**가 말하는 방식 (yodish)에서 이름을 따온 룰 이라고 합니다.  
보통 영어에서 "Yoda is a jedi Master" 와 같이 subject, verb, object 순으로 말하는데,  
요다는 "A jedi Master yoda is" 와 같이 object, subject, verb 순으로 말한다더군요.  
  

-   [How to talk like Yoda - yotube](https://www.youtube.com/watch?v=O8yXTxodxrg)

그래서 아래와 같이 변수를 오른쪽에 둔 비교 조건문을 [Yoda condition](https://en.wikipedia.org/wiki/Yoda_conditions) 이라고 합니다.

```js
if ("red" === color) {
  // "만약 'red'가 color면 처럼" 읽힌다!
}
```

위 코드를 의미적으로 읽어보면 **"만약 red 가 color면"** 처럼 읽혀져 직관적이지 않습니다. ESLint 에서 Yoda규칙은 이런 Yoda Condition 을 잡아내거나 강요하는 규칙입니다. Yoda Condition에 대한 규칙이 있는 이유는 가독성 때문입니다. 일반적으로 위와 같은 표현(Yoda Condition) 보다는

```js
if (color === 'red') {
  // "만약 color가 'red'면 처럼" 읽힌다!
}
```

이런 표현이 **"만약 color 가 red 면"** 으로 직관적으로 읽히기 때문에 더 가독성이 좋습니다. 하지만 Yoda Condition 에는 실수를 빨리 알아챌수 있다는 장점이 있습니다.

```js
if (color = 'red') {
  // = 이 하나 빠졌다!
}
```

만약 개발자가 `==`을 의도했지만 실수로 `=`를 하나 빼먹게 된다면 변수 color에는 'red' 라는 값이 할당됩니다. 에러도 발생하지 않고 초기에 버그를 잡기 힘듭니다. 하지만 다음과 같이

```js
if ('red' = color) {
  // = 이 하나 빠졌다!
}
```

조건문을 요다처럼 쓰다가 실수를 한다면, 이 코드는 에러를 발생시키기 때문에 좀더 빠르게 에러를 잡아낼 수 있습니다.  

-   개발 툴도 좋아지고 다른 lint 규칙으로 yodish의 장점을 커버할 수 있기 때문에 많은 곳에서 yoda를 규칙을 never(사용 못 하도록)로 설정합니다.

## 3. no-magic-numbers

[ESLint: no-magic-numbers](https://eslint.org/docs/rules/no-magic-numbers)

no-magic-numbers 규칙은 매직넘버(magic number)를 사용하지 못하도록 하는 규칙입니다. 이 내용은 **클린 코드라는 책의 냄새와 휴리스틱** 부분에도 나오는 내용으로 소프트웨어 개발에서 **오래된 규칙**이라고 합니다. 또한 코드 리뷰를 받을 때 제 코드에서 종종 나온 내용이기도 합니다:)  
  
-   ESLinter 에서는 숫자만 매직넘버로 거르지만 '매직넘버' 라는 용어는 숫자뿐만 아니라 의미가 불분명한 모든 토큰을 가리킵니다.
-   [What is a magic number, and why is it bad? - stackoverflow](https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad)

이 규칙은 아무런 옵션을 주지 않을 경우 이런 경우까지 linter가 잡아냅니다.

```js
// 배열 길이 0 인지
if (someArray.length === 0) {}

// 원의 둘레
const circleCircumference = radius * Math.PI * 2;  
```

그럼 이렇게 해버려야 하나?

```js
const ZERO = 0;
const TWO = 2;

if (someArray.length === ZERO) {}
const circleCircumference = radius * Math.PI * TWO;
```

이런 방식은 Linter는 통과하지만 매직넘버를 쓰지 말자는 의도에도 부합하지 않고,,, 의미가 없다고 생각합니다.  
ignores 옵션으로 특정 숫자들은 사용할 수 있게 하는 설정이 가능합니다. 하지만 어떤 기준으로 어떤 숫자를 허용할 건지에 대한 의문이 생깁니다. 그래서 매직넘버의 예외로 둘 수 있는 기준이 있나? 생각이 들어 찾아보았습니다만 기준에 대한 명확한 자료를 찾지는 못했습니다.  
stackoverflow 나 github의 몇몇 글을 찾아보니 간혹 이 규칙을 적용한 경우에는 예외로 사용할 수 있는 수를 \[0\], \[-1, 0, 1\], \[-1, 0, 1, 2\] 와 같이 비슷하지만 조금씩 다른 옵션들을 사용하고 있었습니다. 하지만 아마 대부분 휴리스틱에 의존한 설정이 아닐까 싶습니다.
