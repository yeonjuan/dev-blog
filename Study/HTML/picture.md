<!--meta
title: picture 요소
description: picture 요소에 대해 정리한 글
keywords: HTML, HTML picture, WebP
-->

# picture

`picture` 요소는 `img`를 포함하는 컨테이너이다. 사용자의 화면 해상도나, 뷰포트 크기 등을 기반으로 브라우저에 보일 리소스를 정하기 위한 힌트를 줄 수 있다.

다음과 같이 `source` 와 `img`를 활용해 사용자 환경에 따라 브라우저가 사용할 리소스를 지정한다.

```html
<picture>
    <source media="(min-width: 650px)" srcset="/image-for-650.jpg">
    <source media="(min-width: 400px)" srcset="/image-for-400.jpg">
    <source media="(min-width: 300px)" srcset="/image-for-400.jpg">
    <img src="/image-for-fallback">
</picture>
```

브라우저는 `source` 요소의 media 속성값을 확인해, 처음으로 조건에 만족하는 `source`를 이미지로 채택해 사용하며 나머지 요소는 무시한다.
모든 `source` 조건에 만족하지 않을 경우, `img`의 src 속성이 가리키는 리소스를 사용한다.

## picture 를 이용한 WebP 지원

WebP는 구글에서 개발한 이미지 포맷으로 웹사이트의 트래픽 감소 및 로딩 속도 단축을 위한 목표로 제시된 포맷이다.
WebP는 일부 브라우저에서는 미지원 상태이다. 미지원 브라우저에서는 다른 이미지 포맷 (png, jpeg) 등을 표시하기 위해 `picture`를 활용할 수 있다.

다음과 같이 사용하면 WebP를 지원하지 않는 브라우저에서는 `img`의 src 속성이 가리키는 리소스가 사용된다.

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png">
</picture>
```




