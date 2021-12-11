<!--meta
title: 변수와 상수 - Rust
description: Rust 변수와 상수에 대해 공부한 내용 정리
keywords: rust, 변수, 상수
-->

# 변수와 상수

## 변수

### let

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

### mut

값의 변경이 필요한 변수가 필요할 땐 `mut` 키워드를 추가한다.

```rs
let mut variable_name = value;
```

```rs
fn main() {
  let mut x = 1;
  x = 2;
}
```

### 변수 쉐도잉

Rust 에서는 이미 선언한 변수와 같은 이름의 변수를 선언할 수 있다. 이전에 선언한 변수는 나중에 선언한 변수에 의해 가려진다.

```rs
fn main() {
  let x = 1;
  let x = "2";
  println!("x: {}", x); // 2
}
```

## 상수

### const

Rust 에서는 `const` 키워드를 통해 상수를 선언할 수 있다. 반드시 상수의 타입을 지정해야하며 `mut` 키워드를 사용할 수 없다.

```rs
const CONSTANT_NAME: type = value;
```

상수의 이름을 대문자로 사용하지 않으면 warning 이 발생한다.
