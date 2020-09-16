## Q-1. 다음 코드의 결과는 무엇일까요?

```js
const foo = {
    name: 'Foo'
}
const bar = Object.create(foo);
delete bar.name;

console.log(bar.name); // ?
```

<details><summary>Q-1 답안 보기</summary>
<p>

### 정답: "Foo"

### 해설:
결과를 이해하기 위해서는 **1. delete**와 **2 Object.create** 를 이해해야합니다.

#### 1. delete
`delete` 연산자는 대상 객체의 **고유 프로퍼티를 삭제**합니다.

```js
const obj = {
    prop1: 'prop1', 
    prop2: 'prop2',
}
delete obj.prop1;
console.log(obk); // {prop2: "prop2"}
```
**교유 프로퍼티를 삭제** 한다는 뜻은 프로토 타입 체인으로 연결된 프로퍼티는 제거하지 않는다는 걸 의미합니다.

```js
const obj ={
    toString: () => 'shadowed',
}
console.log(obj.toString()); // shadowed
delete obj.toString;
console.log(obj.toString()); // [object Object]
```


#### 2. Object.create

`Object.create` 는 첫 번째 인자를 프로토타입으로 하는 객체를 생성합니다.

즉 프로터타입 체이닝을 통해서 인자의 프로퍼티에 접근할 수 있지만, 그 값은 생성된 객체의 고유한 프로퍼티가 아닙니다.

```js
const obj = {
    prop1: 'prop1'
}
const newObj = Object.create(obj);

newObj.prop1; // 'prop1'
newObj.hasOwnProperty('prop1'); // false
```

#### 문제 해설

`Object.create` 로 **foo** 를 프로토타입으로 한 **bar** 객체를 생성합니다.

```js
const foo = {
    name: 'Foo'
};
const bar = Object.create(foo); 
```


`delete` 로 **bar** 의 고유 프로퍼티 **name** 을 제거합니다. 하지만 **bar** 에는 **name** 프로퍼티가 없기 때문에 아무 변화도 일어나지 않습니다.

```js
delete bar.name
```


`bar.name`에 접근하면 프로토타입 체이닝을 통해 **foo**의 **name** 으로 접근됩니다.

```js
console.log(bar.name);  // 'Foo'
```

</p>
</details>