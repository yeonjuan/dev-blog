# meta - viewport 태그

- 뷰포트 (viewport)는 화면에 보여지는 영역을 의미한다.

- meta 태그에 viewport 를 지정해서 **모바일 기기**에서 `뷰포트의 크기`와 `초기 화면 배율(zoom)`, `최대 - 최소 배율`을 설정할 수 있다.

- viewport 는 HTML 표준은 아니지만 대부분의 모바일 브라우저가 지원한다.

## 사용법

```html
<html>
  <head>
    <meta name="viewport" content="...">
  </head>
  ...
</html>
```

`content` 에는 다음과 같은 속성이 들어갈 수 있다.

| 속성 | 값 | 설명 |
| --- | --- | --- | 
| width | 숫자(px 단위) | 뷰포트의 너비 설정 <br> device-width 를 사용하면 기기의 너비로 설정됨 |
| height | 숫자(px 단위) | 뷰포트의 높이 설정 <br> device-height 를 사용하면 기기의 높이로 설정됨 |
| initial-scale | 0.0 ~ 10.0 | 화면의 초기 배율 |
| user-scalable | no 또는 yes | 사용자 웹 페이지 배율 가능 여부 |
| minimum-scale | 0.0 ~ 10.0 | 가능한 최소 확대 비율 |
| maximum-scale | 0.0 ~ 10.0 | 가능한 최대 확대 비율 |


`,` 로 여러 속성을 동시에 사용가능하며 일반적으로 다음과 같은 설정을 많이 사용한다.

```html
<meta name="viewport" content="width=device-width, initial-sclae=1.0">
```


## 사용 예시

- 뷰포트 너비를 기기의 스크린 너비로 설정 (width, device-width)

    ```html
    <meta name="viewport" content="width=device-width">
    ```


- 뷰포트 너비를 px 로 지정 (width)

    ```html
    <meta name="viewport" content="width=400">
    ```

- 초기 화면 배율 설정 (initial-scale)

    ```html
    <meta name="viewport" content="initial-scale=2.0">
    ```

- 최대, 최소 화면 배율 설정 (minimum-scale, maximum-scale)

    ```html
    <meta name="viewport" content="minimum-scale=1.0, maximum-scale=2.0">
    ```
