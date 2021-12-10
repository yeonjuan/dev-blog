# 변수

## let

Rust 에서는 `let` 키워드를 통해 변수를 선언할 수 있다.

```rs
let variable_name = value;
```

Rust 의 변수는 기본적으로 불변(immutable)하다. 따라서 변수에 값을 할당한 이후에는 그 값을 변경할 수 없다.

```rs
fn main() {
  let x = 1;
  x = 2;
}
```

위 코드를 실행하면 아래 에러가 발생한다.

```
error[E0384]: cannot assign twice to immutable variable `a`
```

## mut

값의 변경이 필요한 변수가 필요할 땐 mut 키워드를 추가한다.

```rs
let mut variable_name = value;
```

```rs
fn main() {
  let mut x = 1;
  x = 2;
}
```
