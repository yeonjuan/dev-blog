# Debouncing & Throttling

디바운스 (Debounce) 와 쓰로틀(Throttle) 은 보통 짧은 시간에 많이 발생하는 이벤트를 처리하기 위해 사용되는 기법입니다.

## Debounce

Debounce 는 연이어 발생하는 이벤트를 하나로 그룹화 하는 기법입니다. 연이어 이벤트가 발생할 때, 처음 혹은 마지막 이벤트만 처리하는 형태로 구현할 수 있습니다.

```js
function debounce(fn, time) {
	let id = null;

	return function (...args) {
		if (id) {
			clearTimeout(id);
			id = null;
		}
		id = setTimeout(() => {
			fn(...args);
			id = null;
		}, time);
	}
}
```

## Throttling

Throttling 은 특정 시간 간격동안 실행 횟수를 일정하게 유지시키는 기법입니다.
