function solution(n, arr1, arr2) {
  return arr1.map((a1, i) => arr2[i] | a1).map(num => {
      let str = '', cnt = n;
      while (--cnt >= 0) {
          str = (num % 2 ? "#" : " ") + str;
          num = num >> 1;
      }
      return str;
  });
}
