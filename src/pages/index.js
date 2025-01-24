import { html } from '@html-kit/html'
import devPostList from '../components/dev-post-list.js'
import layout from '../components/layout.js'

export default (_, data) => layout({
  title: 'DevBlog',
  children: html`
    ${devPostList(data('posts').posts)}
`,
})
