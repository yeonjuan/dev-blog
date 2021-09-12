# BeM

## BEM 명명 규칙

**Block**: 재사용 가능한 독립적인 블록

**Element**: 블록을 구성하는 종속적인 하위 요소

**Modifier**: 블록 또는 요소의 변형 (모양, 산태, 동작)

https://en.bem.info/methodology/quick-start/


## BEM 특징

1. 의미론적 클래스 선택자를 사용
2. 다른 형식의 선택자 사용을 제한
3. 전역에서 유일한 이름 권장
4. 낮은 선택자 특이성 유지
5. HTML/CSS 연결이 느슨


## BEM 형식

```css
.block { /* ... */}
.block__element { /* ... */}
.block__element--modifier { /* ... */}
.block--modifier { /* ... */}
```

- 예시

  **Good**

  ```html
  <button class="btn">
  <button class="btn btn--submit">
  ```

  **Bad**

  ```html
  <button class="btn--submit"> <!-- Block 클래스 이름이 누락됨 -->
  ```
