# The Rust Programming Language

> [The Rust Programming Language](https://frontendmasters.com/courses/rust/) 수강후 정리한 글.

# Primitives

## Strings

- Hello, World

  ```rs
  fn main() {
    println!("Hello, World!");
  }
  ```

### String Interpolation

String Interpolation 을 지원하는 함수들.

- println

  interpolation 된 문자열을 출력한다.
  `println!`의 `!` 는 `println` 이 함수가 아니라 매크로라는 것을 의미한다.

  ```rs
  fn main() {
    let greeting = "Hello";
    let subject = "World";

    println!("{}, {}!", greeting, subject); // "Hello, World"
  }
  ```

- format

  interpolation 된 문자열을 반환한다.

  ```rs
  let subject = "World";
  let greeting = format!("Hello, {}!", subject); // "Hello, World"
  ```

- panic

  panic 을 통해 interpolation 된 문자열을 출력하고, 프로그램을 종료시킬 수 있다.

  ```rs
  fn main() {
    let crash_reason = "Error";

    panic!("I crashed {}!", crash_reason);
  }
  ```

## Floats

```rs
fn main () {
  let x = 1.1;
  let y = 2.2;
  println!("x times y is {}", x * y);
}
```

## Mutability

```rs
let x = 1.1;
x = 2.2; // Error
```

JavaScript 같은 언어에서는 위 코드가 실행되지만 Rust 에서는 에러가 발생한다. Rust 의 `let` 은 JavaScript 의 `const` 처럼 동작한다.

`let` 으로 선언한 변수의 값은 변경할 수 없다.

```rs
let mut x = 1.1;
x = 2.2; // Success
```

`mut` 키워드를 사용해서 변수를 mutable 하게 바꿀 수 있다.

## Type Annotation

함수를 정의할 때는 매개변수와 반환값의 타입을 명시적으로 지정해주어야 한다.

```rs
fn multiply_both(x: f64, y: f64) -> f64 {
  return x * y;
}
```

## Float Size

```rs
// f64 는 64bits(8bytes)를 차지한다.
let x: f64 = 10.0 / 3.0;

// f32 는 32bits(4bytes)를 차지한다.
let y: f32 = 10.0 / 3.0;

// 트레이드 오프: 메모리 크기 vs 정확도
```

## Integers

```rs
let ninety = 90;

let neg_file = -5;

let one_thousand = 1_000; // 숫자에 _ 를 이용하여 더 읽기 쉽게 표현할 수 있다.

let three = 10 / 3; // 소수점은 버려져서 3 이 된다.

let will_panic = 5 / 0; // 0 으로 나누는건 허용되지 않는다.
```

## Integer Sizes

### Signed integers

음, 양의 정수를 표현할 수 있다.

- i8: 8bits (1B)
- i16: 16bits (2B)
- i32: 32bits (4B)
- i64: 64bits (8B)
- i128: 128bits (16B)

### Unsigned integers

양의 정수를 표현할 수 있다.

- u8
- u16
- u32
- u64
- u128

- char: 유니코드 검증이된 u32 정수

### `as` 키워드를 통한 수 변환

`as` 키워드를 통해 다른 자료형으로 변환할 수 있다.

```rs
fn multiply(x: i64, y: u8) -> i64 {
  return x * (y as i64);
}
```

`i64`는 모든 `u8` 값을 표현할 수 있기 때문에 변환 가능하다.

```rs
fn divide(x: i32, y: u16) -> f64 {
  return x as i64 / y as f64;
}
```

integer -> float 로 변환도 가능하다.

## Booleans

```rs
let true_value = true;

let false_value = false;

true as u8 // 1 로 계산된다.
false as u8 // 0 으로 계산된다.
1 == 2 // false 로 계산된다.
```

## Conditional

```rs
if cats > 1 {
  println!("Multiple cats!");
} else {
  println!("Need more cats");
}
```

## Statements and Expressions

- Expression: 값으로 계산된다.

  ```rs
  cats > 1000;
  cats > count_cats(cats_arr)
  ```

- Statement: 값으로 계산되지 않는다.

  대부분의 statement 는 세미콜론으로 끝난다.

  ```rs
  println!("Multiple cats");
  ```

Rust 에서 함수 몸체의 마지막에 위치한 expression 은 반환값으로 활용된다. (return 키워드를 생략할 수 있다.)

```rs
fn multiply_both(x: f64, y: f64) -> f64 {
  return x * y; // "return x * y;" 는 statement
}

fn multiply_both(x: f64, y: f64) -> f64 {
  x * y // "x * y" 는 expression
}
```

if 문에서도 expression이 실행문의 마지막에 위치할 경우, 그 값을 반환한다. 아래처럼 조건에 따라 값을 할 당할때 유용하다.

```rs
let message = if cats > 1 {
  "Multiple cats"
} else if cats > 1_000 {
  "Too many cats!"
} else {
  "Need more cats!"
};
```

# Collections

## Tuples

튜플은 런타임에 메모리 크기가 고정되어 있다.

```rs
// 튜플 선언
let point: (i64, i64, i64) = (0, 0, 0);

// 개별 값 사용
let x = point.0;
let y = point.1;
let z = point.2;

// 디스트럭터링
let (x, y, z) = point;

let mut point: (i64, i64, i64) = (0, 0, 0);
point.0 = 1;
```

### Unit

아무런 값도 가지지 않는 특별한 튜플.

```rs
let unit: () = ();
```

왜 아무런 값을 가지지 않은 튜플이 존재할까?. 마치 JavaScript `void` 같은 개념으로 반환값이 없는 함수에서 사용된다.

```rs
fn main() {

}

fn main() -> () {
}
```

## Structs

```rs
struct Point {
  x: i64,
  y: i64,
  z: i64,
}

fn new_point(x: i64, y: i64, z: i64) -> Point {
  Point {x: x, y: y, z: z}
}

let point = Point {x: 1, y: 2, z: 3};
let x = point.x;

// 디스트럭쳐링
let Point {x, y, z} = point;
```
