function solution(n, words) {
  const wordMap = {};
  const idx = words.findIndex((word, idx) => {
      const before = words[idx - 1];
      if (
          wordMap[word] ||
          before && before[before.length - 1] !== word[0]
      ) {
         return true;
      }
      wordMap[word] = true;
  });
  if (idx < 0) { return [0, 0]; }
  
  return [((idx + 1) % n) || n, Math.floor(idx / n) + 1];
}
