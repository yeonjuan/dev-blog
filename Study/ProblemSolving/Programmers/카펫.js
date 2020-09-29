function solution(brown, yellow) {
    let bw, bh, yw, yh;
    let size = brown + yellow;
    for (bw = size; bw >= 1; bw--) {
        yw = bw - 2;
        if(!(size % bw) && !(yellow % yw)) {
            bh = Math.floor(size / bw);
            yh = Math.floor(yellow / yw);
            if (bh - 2 === yh) {
                return [bw, bh];
            }
        }
    }
}
