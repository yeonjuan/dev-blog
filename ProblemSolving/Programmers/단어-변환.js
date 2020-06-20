function solution(begin, target, words) {
  const visitedSet = new Set();
  let min = Infinity;
  
  function wordDiff(a, b) {
      return [...a].filter((c, i) => c !== b[i]).length;
  }
  
  function getChangables(word) {
      return words.filter(w => !visitedSet.has(w))
          .filter(w => wordDiff(word, w) === 1);
  }
  
  (function change(word, cnt) {
      visitedSet.add(word);
      if (word === target) {
          min = Math.min(min, cnt);
          return;
      }
      getChangables(word)
          .forEach(c => change(c, cnt + 1));
  })(begin, 0);

  return isFinite(min) ? min : 0;
}
