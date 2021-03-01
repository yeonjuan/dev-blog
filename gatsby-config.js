module.exports = {
  siteMetadata: {
    title: "My Gatsby Site",
    sideBar: [
      {
        title: "디자인 패턴",
        pages: [
          {
            name: '빌더 패턴 탐구',
            link: '/design-pattern/builder-pattern-exploration'
          },
        ]
      }
    ]
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-pages",
        path: `./src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`
          },
        ],
      },
    },
  ],
};
