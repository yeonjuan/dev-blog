function solution(x, n) {
  const arr = [];
  let num = x;
  for (let i = 0; i < n; i++) {
      arr.push(num);
      num += x;
  }
  return arr;
}
