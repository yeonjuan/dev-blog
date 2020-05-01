function solution(n) {
  let results = [];
  while (n) {
      const remain = n % 3 || 3;
      n = parseInt(Math.floor((n - 1) / 3), 10);
      results.push(2 ** (remain - 1));
  }
  return results.reverse().join('');
}
