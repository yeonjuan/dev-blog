function solution(s) {
    return (s.length === 4 || s.length === 6)
        && [...s].every(c => Number.isInteger(+c));
}
