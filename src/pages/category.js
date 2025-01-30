import layout from '../components/layout.js'
import category from '../components/category.js'

export default (_, data, pathParams) => {
  const posts = data('posts').posts.filter(post => post.category === pathParams.name)
  return layout({
    title: 'DevBlog',
    children: category(pathParams.name, posts),
  })
}
