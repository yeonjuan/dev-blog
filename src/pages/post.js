import { html } from '@html-kit/html'
import layout from '../components/layout.js'
import { resolvePath } from '../libs/utils.js'

export default (children, data, { originalFilename }) => {
  const post = data('posts').posts.find((post) => {
    return post.href.endsWith(originalFilename.replace('.md', '').replace(' ', '%20'))
  })
  const paths = post.href.split('/').filter(Boolean)
  paths.shift()
  return layout({
    title: post.title + ' | DevBlog',
    children,
    description: post.description,
    thumbnail: post.thumbnail,
    breadcrumb: [{
      title: 'Home',
      href: '/',
    }, {
      title: post.category,
      href: ['', paths[0], paths[1]].join('/'),
    },
    {
      title: post.title,
      href: ['', ...paths].join('/'),
    },
    ],
    link: html`
      <link href="${resolvePath('/css/github.min.css')}" type="text/css" rel="stylesheet" />
    
    `,
  })
}
