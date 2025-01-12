/**
 * @typedef {Object} Post
 * @property {string} title
 * @property {string} src
 */

export default {
  copyAssets: [
    [
      "<rootDir>/JavaScript/assets",
      "<rootDir>/website/posts/JavaScript/assets",
    ],
  ],
  posts: [
    {
      category: "JavaScript",
      title: "자바스크립트 에코시스템의 속도 향상 - 배럴(Barrel) 파일의 대실패",
      description: ".....",
      src: "<rootDir>/JavaScript/speeding-up-the-javascript-ecosystem-the-barrel-file-debacle.md",
      thumbnail: "https://marvinh.dev/media/js-tools-module-cost.png",
      createdAt: "2023.01.01",
    },
    {
      category: "JavaScript",
      title: "커스텀 프로퍼티를 이용해 CSS 와 자바스크립트 간 데이터 공유하기",
      description: ".....",
      src: "<rootDir>/JavaScript/sharing-data-between-css-and-javascript-using-custom-properties.md",
      thumbnail: "https://marvinh.dev/media/js-tools-module-cost.png",
      createdAt: "2023.01.01",
    },
    {
      category: "JavaScript",
      title: "정말 리액트에서 useMemo를 사용해야 할까요? 알아봅시다.(번역)",
      description: ".....",
      src: "<rootDir>/JavaScript/should-you-really-use-usememo.md",
      thumbnail: "https://marvinh.dev/media/js-tools-module-cost.png",
      createdAt: "2023.01.01",
    },
  ],
};
