function solution(s) {
  return s
      .split(' ')
      .reduce(
          ([min, max], num) => [Math.min(min, num), Math.max(max, num)],
          [Infinity, -Infinity]
      ).join(' ');
}
