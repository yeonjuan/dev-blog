<!--meta
title: position | CSS | dev-blog
description: CSS position 속성에 관해 정리
keywords: position, css position, static, relative, absolute, fixed, sticky
-->

# position

## position: static

- 문서의 일반적인 흐름에 따라 요소가 배치된다.
- `left, right, top, bottom, z-index` 속성을 사용할 수 없다.

## position: relative

- 요소의 현재 위치를 기준으로 상대적으로 배치한다.
- 요소가 차지하는 레이아웃은 `position:static` 일 때와 같다. 즉, 상대적으로 변경된 위치가 다른 요소에 영향을 주지 않는다.
- 자식 또는 자손 요소중 `position:absolute` 인 요소의 배치 기준이 된다.
- `left, right, top, bottom, z-index` 속성을 사용할 수 있다.

## position: absolute

- 요소가 일반적인 흐름에서 벗어난다.
- 부모, 형제의 크기, 위치에 전혀 영향을 미치지 않는다.
- 가장 가까운 조상요소중에서 `position: relative | absolute | fixed | transform` 인 요소를 기준으로 배치된다.
- `left, right, top, bottom, z-index` 속성을 사용할 수 있다.

## position: fixed

- 뷰포트를 기준으로 요소를 배치한다.
- 조상요소중에 `position: transform` 인 요소가 있으면, 해당 요소가 배치 기준이 된다.

## position: sticky

- 스크롤 영역의 뷰포트를 기준으로 고정된 위치를 가진다.
