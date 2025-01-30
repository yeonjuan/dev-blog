import { html } from '@html-kit/html'
import layout from '../components/layout.js'

export default (children, data, { originalFilename }) => {
  const post = data('posts').posts.find((post) => {
    return post.href.endsWith(originalFilename.replace('.md', '').replace(' ', '%20'))
  })
  if (!post) {
    console.log(originalFilename)
  }
  return layout({
    title: post.title + ' | DevBlog',
    children,
    description: post.description,
    link: html`
      <link href="/css/github.min.css" type="text/css" rel="stylesheet" />
    
    `,
  })
}
