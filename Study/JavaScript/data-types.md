# 데이터 타입

JavaScript 데이터 타입
 - Primitive Types
   - Undefined, Null, Boolean, String, Symbol, Number, BigInt
 - Non-Primitive Types
   - Object


| 타입 | 설명  | 값 |
|---|---|---|
| Undefined | Undefined 타입인 값은 **undefined** 밖에 없음. <br> 값을 할당하지 않은 변수는 **undefined** 값을 가짐 | undefined | 
| Null | Null 타입인 값은 **null** 밖에 없음 <br> **null**은 의도적으로 객체의 부재를 나타낼때 사용 | null | 
| Boolean | Boolean 타입인 값은 **true**, **false** 2가지 <br> 논리적인 의미를 가진 값으로 사용 | true, false |
| String | 텍스트 데이터를 표현할 때 사용 <br> 16비트 부호가 없는 정수값의 시퀀스 <br> String 값은 immutable 함 | "text" |
| Symbol | Object 프로퍼티의 키로 사용될 수 있는 비-문자열값 <br> Symbol 값은 immutable 하며 unique 함 | Symbol(), Symbol.iterator, ... |
| Number | 64 비트 부동 소수점 형식을 따름 | +0, -0, NaN, Infinity, -Inifinity, 123 , 1.23 ...  |
| BigInt | 정수를 나타내는 값으로 정수의 크기가 제한되어 있지 않음 | 1n, 0n ...|
| Object | 프로퍼티들을 담고 있는 데이터 <br> 프로퍼티는 데이터 프로퍼티, 접근자 프로퍼티로 구분됨 | var obj = { props: "key" };, [], ... |
