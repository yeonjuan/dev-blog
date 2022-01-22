# match 와 if let

## match

match 는 패턴을 값과 비교해 특정 코드를 실행하는 기능이다.

### Option match

match 를 이용해 Option 이 Some, None 인 경우를 처리할 수 있다.

```rs
fn match_test (x: Option<i32>) {
  let num = match x {
    None => panic!("x is not a number"),
    Some(i) => i,
  };
  // x 가 존재할 경우 값, 존재하지 않을 경우 에러
}
```

### 자리 지정자 `_`

타입이 가질수 있는 모든 경우를 다 처리하고 싶지 않을 경우 `_` 패턴을 통해 처리할 수 있다.

```rs
fn match_test (x: i32) {
  match x {
    1 => println!("one"),
    2 => println!("two"),
    _ => println!("greater than three") // x 가 위에 패턴에 일치되지 않는 경우 실행된다.
  };
}
```

## if let

`match` 는 타입이 가질 수 있는 모든 패턴을 명시해야한다.
특정 패턴이 일치하는 경우에 만 값을 처리하고 싶을 때는 `if let` 을 사용하면 된다.

```rs
fn match_test (x: Option<i32>) {
  if let None = x {
    println!("x is None");
  }
}
```
