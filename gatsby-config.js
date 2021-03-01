module.exports = {
  pathPrefix: "/dev-blog",
  siteMetadata: {
    title: "My Gatsby Site",
    sideBar: [
      {
        title: "2020",
        pages: [
          {
            name: 'falsy & truthy',
            link: '/2019/truthy-falsy'
          },
          {
            name: 'return undefined vs null',
            link: '/2020/return-null-vs-undefined'
          },
          {
            name: '빌더 패턴 탐구',
            link: '/2020/builder-pattern-exploration'
          },
          {
            name: 'OSS 컨트리뷰톤 멘티님들 후기 모음',
            link: '/2020/oss-contributhon'
          },
          {
            name: 'node 패키지 브라우저에서 사용하기 (Webpack 4)',
            link: '/2019/coding-convention-1'
          },
        ]
      },
      {
        title: "2019",
        pages: [
          {
            name: 'Js13kGames 참가 후기',
            link: '/2019/js-13k-2019'
          },
          {
            name: 'Hacktoberfest 참가 후기',
            link: '/2019/hacktoberfest-2019'
          },
          {
            name: 'ESLint 조금 더 잘 활용하기(kakao-tech)',
            link: 'https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/'
          },
          {
            name: '코딩 컨벤션 업무를 하며 알게 된 것들(1)',
            link: '/2019/coding-convention-1'
          },
          {
            name: '코딩 컨벤션 업무를 하며 알게 된 것들(2)',
            link: '/2019/coding-convention-2'
          }
        ]
      },
      {
        title: "Browser",
        pages: [
          {
            name: "Critical Rendering Path",
            link: "/browser/critical-rendering-path"
          },
          {
            name: "script async defer",
            link: "/browser/script-async-defer"
          }
        ]
      },
      {
        title: "JavaScript",
        pages: [{
          name: "데이터 타입",
          link: "/javascript/data-types"
        }, {
          name: "undefined",
          link: "/javascript/undefined"
        }]
      },
      {
        title: "HTML",
        pages: [{
          name: "meta viewport",
          link: "/html/meta-viewport"
        }]
      },
      {
        title: "CSS",
        pages: [{
          name: "CSS",
          link: "/css/css"
        }, {
          name: "position",
          link: "/css/position"
        }]
      },
      {
        title: "Cheat Sheet",
        pages: [{
          name: "Git",
          link:  "/cheatsheet/git"
        }, {
          name: "MySQL",
          link:  "/cheatsheet/mysql"
        }, {
          name: "Kubernetes",
          link: "/cheatsheet/kubernetes"
        }, {
          name: "Argo",
          link: "/cheatsheet/argo"
        }]
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
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: 'carbon',
              theme: 'base16-light'
            }
          },
        ],
      },
    },
  ],
};
