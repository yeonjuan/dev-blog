# Design Systems with React & Storybook

> [FrontEnd Masters: Design Systems with React & Storybook](https://frontendmasters.com/courses/design-systems/) 수강후 정리한 글.

## 디자인 시스템

### 왜 디자인 시스템이 중요한가.
  - **접근성**: 애플리케이션에서 환경에 상관없이 모든 유저가 같은 결과를 얻을 수 있어야 한다.
  - **일관성**: 제품들이 같은 브랜드 정체성안에 일부인 것 처럼 보여야 한다.
  - **업데이트의 낙수 효과**: 시스템안에서 컴포넌트의 업데이트는 각 제품으로 전파된다.
  - **반응성**: 애플리케이션은 다른 스크린, 해상도와 장비를 처리할 수 있어야함.
  - **온보딩**: 여러 제품에서 공통의 디자인시스템을 사용하면, 한 번만 익히면 쉽게 해당 제품 개발에 적응할 수 있음
  - **유연성**: 디자인 시스템은 다양한 사용 케이스를 지원해야한다.
  - **속도**: 한번 디자인 시스템을 구성하면 이후 제품을 만드는 속도가 줄어든다.

### 디자인 시스템의 약점
  - **시간**: 디자인 시스템을 만드는 일은 시간이 많이든다.
  - **개선**: 디자인시스템은 절대 완벽해 질 수 없음
  - **유지**: 변화되는 제품을 위해 디자인 시스템도 유지보수가 이루어 져야함
  - **투자**: 디자이너, 개발자, 프러덕트 매니저가 필요함

### 디자인 시스템의 기본 3가지

- Design Language
- Component Library
- Style Guide

#### Design Language

브랜드의 성격 / 정체성과 이에 상응하는 디자인 에셋

- Foundation
  - Color, Typography, Grid, Spacing, Icongraphy, Illustrations, Motion

- UI Kit
  - Buttons, Text Fields, Modals, Dropdowns, Navigation, Footer

#### Component Library

여러 프레임워크나 라이브러리로 만들수 있음

- Frameworks
  - Vue, React, Angular, Ember

- Technologies
  - CSS Pre-processors
  - CSS in JS
  - Animation Libraries
  - Testing Libraries

#### StyleGuide

Design Language 를 위한 문서. UI Kit, Component library


## 디자인 시스템 만들기

1. 디자인 원칙 정의하기
2. UI Audit
3. 디자인 체크리스트
4. 워크플로우 정의하기

### 1. 디자인 원칙정의 하기

- 디자인 원칙: 제품을 만드는데 원동력이 되는 기초 (사용자가 제품을 사용할 때 어떤 기분을 느끼게 하고 싶은지)
  - ex) Atlassian 의 디자인 원칙: bold, optimistic and practical

### 2. UI Audit

- 어떤 컴포넌트를 만들지 말지, 진행 우선순위 등을 정해야 함
- 영향도, 노력, 유지 보수 용이성, 디자인 시스템의 로드맵등을 고려해야함

### 3. 체크리스트

#### 디자인 체크리스트

1. **Accessibility**: 모든 사용자가 주변 환경에 관계 없이 해당 컴포넌트를 사용할 수 있는가?
2. **Interaction**: 사용자가 어떻게 컴포넌트와 상호작용 하는지?
3. **Context**: 언제, 어디서 이 컴포넌트가 사용되는지?
4. **Completion**: 기본 상태를 포함해서 hover, focus, disabled 상태가 정의되었는지?
5. **Content**: 이 컴포넌트가 어떤 컨텐츠에 의지하고 있는지
6. **Customization**: 어떤 부분이 커스터마이징이 가능하고, 어떤 부분은 불가능 한지?
7. **Screen Resolution**: 다양한 스크린 크기에서 컴포넌트가 어떻게 보여져야 하는지?

#### 개발 체크리스트

1. **Accessibility**: 모든 사용자가 주변 환경에 관계 없이 해당 컴포넌트를 사용할 수 있는가?
2. **Responsiveness**: 컴포넌트가 반드시 브라우저, 스크린 크기에 반응 해야하는가?
3. **Completion**: 컴포넌트가 모든 디자인을 수용하는가?
4. **Customization**: 어떻게 커스터 마이징 할 수 있도록 구현할 것인가?
5. **Error Handling, Prop Validation**: 컴포넌트가 깨지는 상황에서 어떻게 반응하는가?
6. **Browser Compatibility**: 브라우저 지원율, 폴리필이 필요한가?

## 흔한 실수

- Starting for scale: 확장성은 좋다. 하지만 필요할 때 진행하는 게 좋다.
- Educating before Building: 만들기 전에 디자인 시스템에 대해 팀을 교육시키는 것은 좋지 않다. 
- Not discussing workflow: 새로운 컴포넌트에 대한 요구가 들어왔을 떄 어떻게 할것인가? 와 같이 디자인 시스템에 대한 워크플로우에 대해 논의햐야함
- Not document decision: 결정된 건 문서화해라.




