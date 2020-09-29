function solution(strings, n) {
  const code = w => w.charCodeAt(0);
  return strings
      .sort((wordA, wordB) => (
      code(wordA[n]) - code(wordB[n]) ||
      wordA.localeCompare(wordB)
  ));
}
