function solution(n) {
    return Array.from({length: n}, (_, i) => i % 2 ? "박" : "수").join('');
}
