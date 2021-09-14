<!--meta
title: SOLID
description: SOLID 원칙에 대해 정리한 글
keywords: SOLID 원칙
-->

# SOLID

SOLID 는 로버트 C 마틴이 제안한 디자인 원칙으로 다음 5가지 원칙의 앞글자를 따서 SOLID 라고 부른다.
- **S**ingle Responsibility Principle: 단일 책임 원칙
- **O**pen-Closed Principle: 개방 폐쇄 원칙
- **L**iskov Substitution Principle : 리스코프 치환 원칙
- **I**nterface Segregation Principle: 인터페이스 분리 원칙
- **D**ependency Inversion Principle: 의존관계 역전 원칙

## Single Responsibility Principle

단일 책임 원칙(Single Responsibility Principle)은 **클래스가 하나의 책임만을 가져야 한다**는 원칙이다. 여기서 책임은 _변경하려는 이유_ 를 뜻한다.

**✗ Bad**

아래의 책을 나타내는 Book 클래스를 보면 _페이지를 수정_하는 기능과 _파일 시스템에 저장, 로딩_ 하는 두 가지 책임을 가지고 있다.

```ts
class Book {
  private pages: string[] = '';

  replacePage (page: string, index: number) {
    this.pages[index] = page;
  }

  toString() {
    return this.pages.join('\n')
  } 

  saveAsFile(filename: string) {
    // ...
  }

  loadFromFile(filename: string) {
    // ...
  }
}
```

**✗ Good**

한 가지보다 많은 책임을 가진 클래스는 별도의 클래스로 분리한다.

```ts
class Book {
  private pages: string[] = '';

  replacePage (page: string, index: number) {
    this.pages[index] = page;
  }

  toString() {
    return this.pages.join('\n')
  }
}

class BookPersistenceManager {
  saveAsFile(book: Book, filename: string) {
    // ...
  }

  loadFromFile(filename: string): Book {
    // ...
  }
}
```

단일 책임 원칙은 여러가지 다양한 일을 하는 클래스 보다 하나의 일을 하는 여러 클래스가 더 낫다는 의미로 볼 수 있을 것 같다.

## Open-Closed Principle

개방-폐쇄 원칙(Open-Closed Principle)은 _클래스나 모듈은 확장에 열려있고 변경에는 닫혀 있어야 한다_ 는 원칙이다.

## Liskov Substitution Principle

리스코프 치환 원칙 (Liskov Substitution Principle) 은 _A클래스를 상속받은 B 라는 클래스가 있을 때, A 클래스를 사용하는 곳에 B 클래스의 인스턴스를 사용하더라도 의도되로 동작해야 한다_ 는 것을 뜻한다.


## Interface Segregation Principle

인터페이스 분리 원칙 (Interface Segregation Principle)은 _클라이언트가 사용하지 않는 메서드에 의존하지 않아야 한다_ 는 원칙이다.

**✗ Bad**

예를 들어 아래와 같이 `fax, scan, print` 메서드를 가진 인터페이스 Printer 가 있다고 할 때, `fax, scan` 구현을 필요로 하지 않는 구체 클래스가 있다면 ISP 를 위반한다고 볼 수 있다.

```ts
interface Printer {
  fax(): void;
  scan(): void;
  print(): void;
}

class NewPrinter implements Printer {
  fax() {
    // implementation
  }
  scan() {
    // implementation
  }
  print() {
    // implementation
  }
}

class OldPrinter implements Printer {
  fax() { /* not supported in old printer */}
  scan() { /* not supported in old printer */}
  print() {
    // implementation
  }
} 
```

**✗ Good**

대신 인터페이스 역할 별로 작게 분리하여 사용한다.

```ts
interface Printer {
  print(): void;
}

interface Scanner {
  scan(): void;
}

interface Fax {
  fax(): void;
}


class NewPrinter implements Printer, Scanner, Fax {
  print() {
    // implementation
  }
  scan() {
    // implementation
  }
  fax() {
    // implementation
  }
}

class OldPrinter implements Printer {
  print() {
    // implementation
  }
} 
```

즉, 인터페이스는 역할별 필요한 단위로 작게 유지해야 한다는 원칙이다.
