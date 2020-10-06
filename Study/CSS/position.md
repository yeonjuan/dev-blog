# CSS - position

`position` 속성은 요소의 위치를 결정한다.

## `static`

```css
.foo {
  position: static;
}
```

문서 흐름에 따라 배치된다.

기본값, `top`, `right`, `bottom`, `left`, `z-index` 속성이 아무런 영향도 주지 않는다.

## `relative`

```css
.foo {
  position: relative;
}
```

자기 자신을 기준으로 `top`, `right`, `bottom`, `left` 속성에 따라 위치가 조정된다.

## `absolute`

```css
.foo {
  position: absolute;
}
```

가장 가까운 부모중에서 `position` 이 지정된 (`static` 제외) 요소를 기준으로 상대적으로 배치된다.

부모중에 `position`이 지정된 요소가 없다면 `body` 를 기준으로 배치된다.

## `fixed`

```css
.foo {
  position: fixed;
}
```

일반적인 문서 흐름에서 벗어나게 된다. 페이지 레이아웃의 공간도 차지하지 않는다.

기본적으로 `body` 를 기준으로 배치되며 `top`, `right`, `bottom`, `left` 에 따라 위치가 정해진다.
