# 이벤트 버블링, 캡쳐링 (Event Bubbling, Capturing)

* [이벤트 버블링](#이벤트-버블링-Event-Bubbling)
* [이벤트 캡쳐링](#이벤트-캡쳐링-Event-Capturing)

## 이벤트 버블링 (Event Bubbling)

이벤트 버블링은 특정 DOM 요소에서 이벤트가 발생하면, 이벤트가 DOM 트리의 상위 요소로 전달되는 특성을 의미합니다.

![이벤트 버블링](./assets/event_bubbling.png)

즉, 이벤트가 발생한 요소를 시작으로 그 상위 요소, 그 상위요소 ...로 이벤트가 전달됩니다.

```html
<html>
    <body>
        <div>
            <span>
            </span>
        </div>
    </body>
</html>

<script>
// 로그 출력
function log(event) {
    console.log(event.currentTarget);
}

const elems = document.querySelectorAll('div, span, body, html');

// document, div, span, body, html 에 이벤트 리스너를 등록.
[document, ...elems].forEach(elem => {
    elem.addEventListener('click', log);
});
</script>
```

위의 예제에서 `<span>`을 클릭하면 아래와 같은 순서로 이벤트가 전달되는 것을 확인할 수 있습니다.

1. `<span>`
2. `<div>`
3. `<body>`
4. `#document`

### event.stopPropagation()

이벤트 버블링이 일어나지 않도록 막고 싶다면, 이벤트 핸들러의 매개변수로 들어오는 이벤트 객체에서 `stopPropation()`을 호출하면 됩니다.
`event.stopPropagaion()` 호출시 상위 요소로 이벤트가 전달되지 않습니다.

```js
function log(event) {
    event.stopPropagation();
    // ...
}
```

## 이벤트 캡쳐링 (Event Capturing)

이벤트 캡쳐링은 특정 DOM 요소에서 이벤트가 발생하면, 이벤트가 DOM 트리의 하위 요소로 전달되는 특성을 의미합니다.

![이벤트 캡쳐링](./assets/event_capturing.png)

즉, 최상위 요소를 시작으로, 그 하위 요소, 하위 요소 ...로 이벤트가 전달되어 최종적으로 타겟 요소까지 전달됩니다.

```html
<html>
    <body>
        <div>
            <span>
            </span>
        </div>
    </body>
</html>

<script>
// 로그 출력
function log(event) {
    console.log(event.currentTarget);
}

const elems = document.querySelectorAll('div, span, body, html');

// document, div, span, body, html 에 이벤트 리스너를 등록.
[document, ...elems].forEach(elem => {
    // 캡처링을 사용하기 위해서 마지막 인자에 {capture: true} 사용.
    elem.addEventListener('click', log, {capture: true});
});
</script>
```

위의 예제에서 `<span>`을 클릭하면 아래와 같은 순서로 이벤트가 전달되는 것을 확인할 수 있습니다.

1. `#document`
1. `<body>`
1. `<div>`
1. `<span>`

### event.stopPropagation()
이벤트 캡처링이 일어나지 않도록 막고 싶다면, 이벤트 핸들러의 매개변수로 들어오는 이벤트 객체에서 `stopPropation()`을 호출하면 됩니다.
`event.stopPropagaion()` 호출시 하위 요소로 이벤트가 전달되지 않습니다.

```js
function log(event) {
    event.stopPropagation();
    // ...
}
```
