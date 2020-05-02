function solution(s) {
  return s.slice(
      Math.floor((s.length - 1) / 2),
      Math.ceil((s.length  + 1) / 2)
  );
}
