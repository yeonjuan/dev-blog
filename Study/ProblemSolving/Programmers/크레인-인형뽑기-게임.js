function solution(board, moves) {
  const lastOf = arr => arr[arr.length - 1];
  
  const pick = pos => {
      let i = 0;
      while (i < board.length && !board[i][pos]) i++;
      if (i < board.length) {
          const doll = board[i][pos];
          return (board[i][pos] = 0, doll);
      }
  }
  
  const before = moves.map(pos => pick(pos - 1)).filter(pos => pos);
  const after = before.reduce((stack, doll) => (
      lastOf(stack) === doll ? stack.pop() : stack.push(doll),
      stack
  ), []);  
  return before.length - after.length;
}
