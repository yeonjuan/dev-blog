<!--meta
title: 데이터 타입 - Rust
description: Rust 데이터 타입에 대해 공부한 내용 정리
keywords: rust, 데이터 타입
-->

# 데이터 타입

Rust 는 정적 타입언어로 모든 변수의 타입이 결정되어야 한다.
Rust 데이터 타입은 스칼라(Scalar), 컴파운드(Compound) 라는 부분집합이 존재한다.

## 스칼라 (Scalar)

스칼라 타입은 하나의 값을 나타내며 정수, 부동 소수점, 불리언, 문자 타입이 존재한다.

**정수 타입**

| bits                 | signed | unsigned | 비고           |
| -------------------- | ------ | -------- | -------------- |
| 8 bits               | i8     | u8       |                |
| 16 bits              | i16    | u16      |                |
| 32 bits              | i32    | u32      | 기본 정수 타입 |
| 64 bits              | i64    | u64      |                |
| 아키텍쳐에 따라 결정 | isize  | usize    |                |

**부동 소수점**

| bits    | 부동 소수점 타입 | 비고                |
| ------- | ---------------- | ------------------- |
| 32 bits | f32              |                     |
| 63 bits | f64              | 기본 부동 소수 타입 |

**불리언**

`bool` 키워드를 사용한다.

```rs
fn main() {
  let isTrue: bool = true;
  let isFalse: bool = false;
}
```

**문자타입**

```rs
fn main () {
  let c: char = 'a'
}
```

## 컴파운드 타입

컴파운드 타입은 여러 값이 그룹화된 타입이다.

## 튜플 타입

```rs
fn main() {
  let tup: (i32, f64) = (500, 6.4);

  // 인덱스로 접근
  let first = tup[0];
  let second = tup[1];

  // 구조 분해
  let (first, second) = tup;
}
```

## 배열 타입

러스트의 배열은 고정된 길이를 가진다.
유동성있는 배열을 사용하려면 벡터타입을 사용한다.

```rs
fn main() {
  let arr = [1, 2, 3, 4];
  let arr = [i32; 5] = [1, 2, 3, 4, 5];

// ㅇㄴ덱스로 접근
  let first = arr[0];
}
```
