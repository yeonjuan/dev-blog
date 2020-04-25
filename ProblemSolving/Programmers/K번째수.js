function solution(array, commands) {
  const ascending = (a, b) => a - b;
  return commands.map(([start, end, k]) => (
          array.slice(start - 1, end).sort(ascending)[k - 1]
      ));
}