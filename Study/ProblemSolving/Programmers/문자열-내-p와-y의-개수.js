function solution(s){
  return [...s].reduce(
          (cnt, char) => {
              const nomarlized = char.toLowerCase();
              return +(nomarlized === 'p')-(nomarlized === 'y') + cnt
          }, 0) === 0;
}
