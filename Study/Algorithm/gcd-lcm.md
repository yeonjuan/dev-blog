# 최대 공약수, 최소 공배수 구하기 (유클리드 호제법)

## 원리: 유클리드 호제법

2개의 자연수(또는 정식) a, b에 대해서 a를 b로 나눈 나머지를 r이라 하면(단, a>b), a와 b의 최대공약수는 b와 r의 최대공약수와 같다.  

## 코드

```js
// 최대공약수 (Greatest Common Divisor)
function gcd (a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

// 최소공배수 (Least Common Multiple)
function lcm (a, b) {
  return a * b / gcd(a, b);
}
```