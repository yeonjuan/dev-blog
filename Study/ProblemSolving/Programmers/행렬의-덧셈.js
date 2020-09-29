function solution(arr1, arr2) {
  arr2.forEach((row, rowIdx) => {
     row.forEach((num, colIdx) => {
        arr2[rowIdx][colIdx] += arr1[rowIdx][colIdx]; 
     });
  });
  return arr2;
}
