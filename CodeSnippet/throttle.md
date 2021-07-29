# Throttle

```js
function throttle(fn, delay) {
  let timer;
  return function(){
    if (timer) return;
      timer = setTimeout(( )=> {
        timer = null;
        fn.apply(this,arguments)
      }, delay)
  }
}
```
