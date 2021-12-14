# 함수

Rust 에서 함수는 `fn` 키워드로 선언할 수 있다.
함수이름이 snake_case 가 아니면 warning 이 발생한다.

```rs
fn hello_world() {
  println!("hello world");
}
```

## 매개 변수

함수의 매개변수는 다음과 같이 선언할 수 있다.

```rs
fn print_pos(x: i32, y: i32) {
  println!("{},{}", x, y);
}
```

## 반환값

함수의 반환값은 다음과 타입을 지정하고 사용할 수 있다.

```rs
fn get_x() -> i32 {
  return 1;
}
```
