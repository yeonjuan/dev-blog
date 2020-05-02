function solution(n) {
  let memo = [0, 1];
  const DIV = 1234567;
  const push = (num) => memo.push(num % DIV);
  
  for (let i = 2; i <= n; i ++) {
      push(memo[i - 1] + memo[i - 2]);
  }
  return memo[n];
}
