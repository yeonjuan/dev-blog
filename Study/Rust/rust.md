# Rust

## Rust 시작하기

Rust 를 사용하기 위해서 필요한 rustup을 설치한다.

### rustup

Rustup 은 Rust 의 버전과 관련 도구를 관리하는 명령어 도구이다. Rustup 을 설치하기 위해서 아래 명령어를 사용한다.

- Rustup 설치 (mac os)

  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

  이후 다음 명령어로 Rust 를 시스템 PATH 변수에 등록한다.

  ```bash
  source /Users/yeonjuan/.cargo/env
  ```

rustup update 명령어를 통해 Rust 를 최신 버전으로 업데이트할 수 있다.

- Rust 버전 업데이트

  ```bash
  rustup update
  ```

rustup doc 명령어를 통해 Rust 관련 문서를 브라우저에서 볼 수 있다.

- Rust 문서

  ```bash
  rustup doc
  ```

### Cargo

Rustup 을 설치하면 Cargo 도 같이 설치된다. Cargo 는 Rust 빌드/패키지 관리 도구이다. 기본적인 Cargo 명령어는 아래와 같다.

```bash
# 프로젝트 생성
cargo new hello-world

# 프로젝트 빌드
cargo build

# 프로젝트 실행
cargo run

# 프로젝트 테스트
cargo test

# 프로젝트 문서 생성
cargo doc

# 라이브러리 배포
cargo publish

# 빌드 없이 컴파일 오류 체크
cargo check

# 최적화해서 컴파일
cargo build --release
```

## Rust "Hello, world!"

아래 명령어로 hello-world 프로젝트를 생성한다.

```bash
cargo new hello-world
cd hello-world
```

"Hello, world!" 를 출력하는 rust 코드를 작성한다.

```rs
// src/main.rs
fn main() {
    println!("Hello, world!");
}
```

cargo run 명령어를 통해 실행한다.

```
cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.01s
     Running `target/debug/hello-world`
Hello, world!
```
