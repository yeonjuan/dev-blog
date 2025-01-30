import { html } from '@html-kit/html'
import devPostList from '../components/dev-post-list.js'
import layout from '../components/layout.js'

export default (_, data) => layout({
  title: 'DevBlog',
  description: '개발과 관련된 번역, 포스팅을 남기는 블로그입니다.',
  children: html`
    ${devPostList(data('posts').posts)}
`,
})
