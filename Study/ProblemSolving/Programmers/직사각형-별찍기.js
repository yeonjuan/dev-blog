process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    const n = data.split(" ");
    const a = Number(n[0]), b = Number(n[1]);
    for(let r = 0; r < b; r ++) {
        console.log("*".repeat(a));
    }
});
