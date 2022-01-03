# 소유권 (Ownership)

소유권은 Rust의 특징중 하나인데 가비지 컬렉터없이 메모리를 안정적으로 사용할 수 있도록 보장해준다.

## 소유권 규칙

아래는 Rust 소유권과 관련된 규칙이다.

- Rust 의 각 값은 값을 소유한 `owner` 변수가 존재한다.
- 특정 시점에 값의 `owner` 는 단 하나 뿐이다.
- `owner`가 스코프를 벗어나면 그 값은 제거된다.

### `move`

```rs
let x = 5;
let y = x;
```

위 코드를 보면 `x` 에 `5` 가 할당되고, `x`의 값이 복사되어 `y` 에 할당된다고 추론할 수 있다. 정수와 같이 간단한 데이터는 실제로 추론한 것 처럼 동작한다.

```rs
let s1 = String::from("hello");
let s2 = s1;
```

하지만 `String` 과 같이 복잡한 데이터는 정수와 같이 동작하지 않는다.
`String` 을 할당받은 변수는 문자열 값이 아니라 해당 데이터가 저장된 메모리 포인터를 가지고 있다.

```rs
let s1 = String::from("hello");
let s2 = s1;

println!("{}, world!", s1); // error[E0382]: borrow of moved value: `s1
```

Rust에서는 메모리 안정성을 위해서 `let s2 = s1` 이 실행된 이후 `s1`은 더이상 사용할 수 없게 된다. 이런 방식으로 Rust 는 `s1` 의 메모리를 해제하지 않아도 된다. (`s2` 만 관리하면 됨)

이런 식으로 포인터를 가진 변수를 다른 변수에 할당하면 `shallow copy` 가 일어나는데 기존에 변수는 사용할 수 없기 때문에, 이런 동작을 Rust 에서는 `move` 라고 한다.

### `clone`

만약 `String` 데이터를 `deep copy` 하고 싶다면 `clone` 메서드를 사용할 수 있다.

```rs
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {}, s2 = {}", s1, s2);
```

### `stack only data: copy`

`u32`, `bool`, `f64`... 등과 같이 컴파일러가 데이터 크기를 알고있고 스택에 올라가는 데이터는 단순하게 복사가 일어난다.

```rs
let x = 5;
let y = x;

println!("x = {}, y = {}", x, y);
```

## 소유권과 함수

함수에 값을 넘겨주는 것은 변수에 값을 할당하는 것과 유사하다. 함수로 넘겨진 변수는 `move` 혹은 `copy` 가 발생한다.

```rs
fn main() {
    let s = String::from("hello");

    takes_ownership(s);  // s 의 값이 함수로 `move` 된다.
                         // 때문에 s 는 더이상 유효하지 않다.
    let x = 5;

    makes_copy(x);  // x 는 함수로 `copy` 된다.
                    // 때문에 이후에도 x 는 유효하다.
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string 이 가르키는 메모리는 해제된다 (drop)

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // 특별한 메모리 해제가 발생하진 않는다.
```

### 반환값과 스코프

값의 반환에도 소유권이동이 발생한다.

```rs
fn main() {
    let s1 = gives_ownership(); // 반환 값의 소유권이 s1 으로 넘어온다.

    let s2 = String::from("hello");

    let s3 = takes_and_gives_back(s2);  // s2 의 소유권을 넘겨주고
                                        // 반환 값의 소유권을 s3에 넘겨받는다
} // s3 은 스코프를 벗어났기 때문에 메모리가 해제된다 (drop)
  // s2 는 소유권이 넘겨갔기 때문에 아무일도 일어나지 않는다.
  // s1 은 스코프를 벗어났기 때문에 메모리가 해제된다 (drop)

fn gives_ownership() -> String {
    let some_string = String::from("yours");
    some_string
}

fn takes_and_gives_back(a_string: String) -> String {
    a_string
}
```
