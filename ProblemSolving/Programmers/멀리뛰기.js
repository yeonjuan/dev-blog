function solution(n) {
    const DIV = 1234567;
    const dp = [0, 1, 2];
    for (let i = 3; i <= n; i++ ) {
        dp[i] = (dp[i - 1]+ dp[i - 2]) % DIV;
    }
    return dp[n];
}
