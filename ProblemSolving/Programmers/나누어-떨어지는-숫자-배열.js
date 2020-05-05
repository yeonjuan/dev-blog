function solution(arr, divisor) {
  const dividedNumbers =  arr.filter(num => !(num % divisor))
  return dividedNumbers.length ? dividedNumbers.sort((a, b) => a - b) : [-1];
}
