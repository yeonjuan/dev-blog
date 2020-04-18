function solution(a, b) {
  const greater = Math.max(a, b);
  const smaller = Math.min(a, b);
  const num = greater - smaller + 1;
  const sum = greater + smaller;
  return num * sum / 2;   
}
