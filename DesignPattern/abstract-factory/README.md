# 추상 팩터리 (Abstract Factory)

상세화된 서브클래스를 정의하지 않고도 서로 관련성이 있거나 독립적인 여러 객체의 군을 생성하기 위한 인터페이스를 제공합니다.

```ts
interface IPrinter {
  print (): void;
}
interface IReader {
  read (): void;
}
interface IFactory {
  createPrinter (): IPrinter;
  createReader (): IReader;
}

// Foo 제품군
class FooPrinter implements IPrinter {
  print () {/* Foo 에서 요구하는 print 로직 */}
}
class FooReader implements IReader {
  read () {/* Foo 에서 요구하는 read 로직 */}
}
class FooFactory implements IFactory {
  createPrinter () {
    return new FooPrinter();
  }
  createReader () {
    return new FooReader();
  }
}

// Bar 제품군
class BarPrinter implements IPrinter {
  print () {/* Bar 에서 요구하는 print 로직 */}}
}
class BarReader implements IReader {
  read () {/* Bar 에서 요구하는 read 로직 */}
}
class BarFactory implements IFactory {
  createPrinter () {
    return new FooReader();
  }
  createReader () {
    return new BarReader();
  }
}

class Runner {
  private printer: IPrinter;
  private reader: IReader;

  constructor (factory: IFactory) {
    this.printer = factory.createPrinter();
    this.reader = factory.createReader();
  }

  readAndPrint() {
    const input = this.reader.read();
    this.print(input);
  }
}
```

## 참고
- GOF 의 디자인 패턴
