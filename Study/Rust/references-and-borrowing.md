# 대여와 참조

## 대여

`&` 문법을 사용해서 레퍼런스가 값을 참조하지만 소유하지는 않도록 할수 있다. 이를 `대여(borrowing)`이라고 한다.

```rs
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

대여한 레퍼런스에 대한 값을 수정하려고 하면 에러가 발생한다.

```rs
fn main() {
    let s = String::from("hello");

    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world"); // Error
}
```

## 수정가능한 참조

`mut` 키워드를 통해서 수정가능한 참조값을 넘겨줄 수 있다.

```rs
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

한번에 단 하나의 수정가능한 참조만 가질수 있다는 제한이 있다.

```rs
 let mut s = String::from("hello");

  let r1 = &mut s;  // Error
  let r2 = &mut s;  // Error

  println!("{}, {}", r1, r2);
```
