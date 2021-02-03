function beautifulTriplets(d, arr) {
  const count = {
    _count: {},
    get(num) {
      return this._count[num] || 0;
    },
    getMany(...nums) {
      return nums.map(this.get.bind(this));
    },
    up(num) {
      this._count[num] = this.get(num) + 1;
    }
  };

  arr.forEach(num => count.up(num));
  let result = 0;
  arr.forEach(num => {
    result += Number(count.getMany(num, num + d, num + d + d).every(Boolean));
  });
  return result;
}
