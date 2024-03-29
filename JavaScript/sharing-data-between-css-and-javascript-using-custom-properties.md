# 커스텀 프로퍼티를 이용해 CSS 와 자바스크립트 간 데이터 공유하기

> 원문: https://christianheilmann.com/2021/02/08/sharing-data-between-css-and-javascript-using-custom-properties/

여전히 웹 개발 업계에서 가장 큰 싸움 중 하나는 CSS vs 자바스크립트입니다.
둘 모두 각자의 장점과 고유한 문법 및 사상이 있으며, 이를 이해하기가 어려울 수 있습니다.

그렇기에 두 가지를 서로 소통하게 하고 각각의 장점을 살릴 수 있는 방법이 있다는 점이 맘에 듭니다.
우선, 저는 DOM 요소의 스타일 객체를 조작하는 것이 항상 성가셨습니다.
이는 요소에 접근해서 다양한 스타일 속성을 설정하는 것을 의미하는데요.
결국 직접 작성하고 싶지 않을 인라인 스타일 속성이 탄생하곤 합니다.

개인적으로 훨씬 깔끔한 방법은 CSS 커스텀 프로퍼티를 사용하는 것입니다.
이를 보통 "CSS 변수"라고 하며, `--` 구문을 사용해서 CSS에서 정의합니다.

```css
:root {
  --pagebackground: powderblue;
}
body {
  background: var(--pagebackground);
}
```

"변수"이기 때문에, 스타일 문서 전체에서 재사용할 수 있습니다.

이를 자바스크립트를 사용해 조작하면 흥미로워집니다.
이 예제의 경우 문서의 루트 요소에 CSS 커스텀 프로퍼티가 설정되어 있습니다.
따라서 자바스크립트로 다음과 같이 읽어올 수 있습니다.

```js
let bg = getComputedStyle(document.documentElement).getPropertyValue(
  "--pagebackground"
);
```

또한 루트 요소(또는 커스텀 프로퍼티가 있는 다른 요소)의 스타일에 접근하고 자바스크립트를 통해 속성을 설정할 수 있습니다.

```js
document.documentElement.style.setProperty("--pagebackground", "firebrick");
```

이 예제는 [codepen](https://codepen.io/codepo8/pen/abBZVdp)에서 확인할 수 있습니다:

이것의 좋은 점은 자바스크립트의 힘을 활용해서 CSS가 접근할 수 없는 것을 제공할 수 있다는 것입니다.
예를 들어, CSS는 마우스 커서의 좌표를 읽을 수 없지만 자바스크립트는 읽을 수 있습니다.

CSS에서 두 속성을 0으로 정의할 수 있습니다.

```css
:root {
  --mouse-x: 0;
  --mouse-y: 0;
}
```

그리고 자바스크립트에서는 document에 mousemove 핸들러를 추가하고 이 두 속성을 조작합니다.

```js
let root = document.documentElement;
document.addEventListener("mousemove", (e) => {
  root.style.setProperty("--mouse-x", e.x);
  root.style.setProperty("--mouse-y", e.y);
});
```

이것이 필요한 자바스크립트의 전부입니다.
CSS 커스텀 프로퍼티가 존재하고 값을 변경할 수 있으므로, 예를 들어 마우스 커서가 있는 위치에 원을 표시할 수 있습니다.

HTML:

```html
<div id="ball"></div>
```

CSS:

```css
:root {
  --mouse-x: 0;
  --mouse-y: 0;
}
#ball {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 100%;
  transform: translate(
    calc(calc(var(--mouse-x) - 10) * 1px),
    calc(calc(var(--mouse-y) - 10) * 1px)
  );
}
```

CSS 코드에 대한 설명입니다:

- ball DIV의 너비와 높이를 20픽셀로 설정하고 배경은 흰색으로 설정합니다.
- border-radius를 100%로 추가하면 사각형이 아닌 원이 표시됩니다.
- 그런 다음 `transform: translate`를 사용하여 화면에 원을 배치합니다. 예를 들어 `transform: translate(200px, 300px)`를 사용하여 ball을 가로 200픽셀, 세로 300픽셀에 배치할 수 있습니다.
- 자바스크립트는 CSS 커스텀 프로퍼티를 숫자 값으로 설정하므로 여기에 "1px"를 곱하여 픽셀로 변환해야 합니다.
- ball의 크기가 20픽셀이므로 `--mouse-x`, `--mouse-y`에 바로 배치할 순 없고 커서 중앙에 배치하기 위해 10을 빼야 합니다.

이 트릭을 사용하면 복잡한 계산을 수행하며 브라우저 상태와 인터랙션 상태를 자바스크립트로 읽으면서도 모든 룩앤필(look and feel)을 CSS로 유지할 수 있습니다. 저는 이 방법이 아주 마음에 듭니다

실제로 작동하는 모습을 보고 싶으시다면 이 [codepen](https://codepen.io/codepo8/pen/oNYxBLd)을 사용해 보세요.
또한 마우스 x 및 y 데이터를 재사용하는 방법을 보여주기 위해 배경 효과도 추가했습니다.
