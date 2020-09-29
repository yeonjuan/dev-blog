function solution(heights) {
  return heights.map((senderHeight, idx) => {
      const receiverIdx = idx - heights
          .slice(0, idx)
          .reverse()
          .findIndex(receiverHeight => receiverHeight > senderHeight);
      return receiverIdx > idx ? 0 : receiverIdx;
  });
}
