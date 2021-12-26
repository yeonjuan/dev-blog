# 조건문과 반복문

## 조건문: `if`

```rs
fn main() {
  let num = 1;

  if num <= 1 {
    println!("num <= 1");
  } else {
    println!("num > 1");
  }
}
```

조건문은 마지막 표현식의 값을 반환한다.

```rs
fn main() {
    let num = 3;

    let result = if num % 2 == 1 {
      "odd"
    } else {
      "event"
    };
    println!("{}", result); // "odd"
  }

```

## 조건문: `else-if`

```rs
fn main() {
  let num = 1;

  if num == 1 {
    println!("num = 1");
  } else if num == 2 {
    println!("num = 2");
  }
}
```

## 반복문: `loop`

`loop` 키워드를 통해서 계속 반복해서 코드를 실행할 수 있다. `loop` 를 종료하도록 명시해주지 않으면 계속 반복 실행된다.

```rs
fn main() {
  loop {
    println!("무한 반복");
  }
}
```

`break` 를 통해서 반복을 종료할 수 있다. `break` 뒤에 리턴하려는 값을 명시하면 `loop`의 결과값으로 활용할 수 있다.

```rs
fn main() {
  let mut cnt = 0;
  let result = loop {
    cnt += 1;

    if cnt >= 10 {
      break cnt;
    }
  };
  println!("{}", cnt);
}
```

## 조건 반복문: `while`

`while` 을 통해 조건이 일치하는 동안 반복되는 루프를 작성할 수 있다.

```rs
fn main() {
  let mut number = 10;
  while number > 0 {
    println!("{}", number);
    number = number - 1;
  }
}
```

## 컬렉션의 요소 순회: `for`

`for` 를 이용해 컬렉션의 요소를 순회할 수 있다.

```rs
fn main() {
  let arr = [1, 2, 3, 4];
  for num in arr.iter() {
    println!("{}", num);
  }
}
```
