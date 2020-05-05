function solution(s) {
  return s.split(' ')
      .map(str => 
          [...str]
           .map((c, i) => !i ? c.toUpperCase() : c.toLowerCase())
           .join('')
      ).join(' ');
}
