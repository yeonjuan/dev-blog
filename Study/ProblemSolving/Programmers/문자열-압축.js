function solution(s) {
  const MAX_UNIT = s.length / 2;
  
  function compress (unit) {
      const compressed = [];
      const last = arr => arr[arr.length - 1];
      let idx = 0;

      while(idx <= s.length) {
          const sliced = s.slice(idx, idx + unit);
          if (last(compressed) === sliced) {
              compressed[compressed.length - 2] ++;
          } else {
              compressed.push(1, sliced);
          }
          idx += unit;
      }
      return compressed.filter(str => str !== 1).join('');
  }
  
  let min = s.length;
  for (let u = 1; u <= MAX_UNIT; u++) {
      const compressed = compress(u);
      min = Math.min(min, compressed.length)
  }
  return min;
}
