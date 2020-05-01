function solution(numbers) {
  return numbers.every(c => !c)
      ? '0'
      : numbers
      .map(n => String(n))
      .sort((a, b) => a + b < b + a ? 1: a + b === b + a ? 0 : -1)
      .join('') || "0"
}
