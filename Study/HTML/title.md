<!--meta
title: title 요소
description: title 요소에 대해 정리한 글
keywords: title 요소
-->

# title

## title 요소

title 요소는 문서의 제목이나 이름을 나타내는 요소이다.
title 요소는 head 요소 아래에 단 1개만 사용해야 하며 태그 내에는 공백 문자로만 이뤄지지 않은 문자열이 들어가야 한다.

**👎 Bad**

```html
<!-- 잘못된 위치 -->
<body>
  <title> </title>
</body>

<!-- 빈 문자열 -->
<title> </title>

<!-- 2개 이상의 title -->
<body>
  <title> Page A </title>
  <title> Nice Page </title>
</body>
```

**👍 Good**

```html
<head>
  <title> Page A</title>
</head>

```

## SEO 

검색엔진은 title 요소의 값을 주요 키워드로 사용하고, 검색 결과로도 보여지기 때문에 title은 SEO에 중요한 요소중 하나이다.

## title 구분자

보통 `-`, `|` 등을 활용하여 타이틀에 여러 키워드를 구분하여 사용한다. 문서를 설명 하는 더 구체적인 키워드가 앞쪽에 오도록 사용한다.

**예시**

- Google

  ![google 예시](./assets/google-title-ex.png)

- W3C

  ![w3c 예시](./assets/w3c-title-ex.png)
