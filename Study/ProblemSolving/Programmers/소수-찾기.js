function solution(n) {
  const memo = Array.from({length: n + 1}, () => false);
  const primes = [];
  let num = 1;
  while((++num <= n)) {
      if (!memo[num]) {
          primes.push(num);
          let m = num;
          while(m <= n) {
              memo[m] = true;
              m += num;
          }
      }
  }
  return primes.length;
}
