function solution(n, m) {
    const gcd = (a, b) => {
        while(a) [a, b] = [b % a, a];
        return b;
    };
    
    const g = gcd(n, m);
    return [g, (n * m) / g];
}
