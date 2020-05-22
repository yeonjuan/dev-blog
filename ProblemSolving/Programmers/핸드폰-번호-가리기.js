function solution(phone_number) {
    return [...phone_number].map(
        (num, i, {length}) => (length - i) > 4
            ? "*" : num
    ).join("");
}
