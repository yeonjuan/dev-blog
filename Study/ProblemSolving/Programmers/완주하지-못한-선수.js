function solution(participant, completion) {
  completion.sort();
  const isLoser = (cand, idx) => completion[idx] !== cand;
  return participant.sort().find(isLoser);
}
