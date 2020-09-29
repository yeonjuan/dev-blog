function solution(arr) {
  return arr.filter((elem, idx, elems) => elem !== elems[idx - 1]);
}
