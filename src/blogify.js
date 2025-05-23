import { Builder } from './libs/builder.js'
import process from 'process'
import path from 'path'
import index from './pages/index.js'
import post from './pages/post.js'
import category from './pages/category.js'
import { markedHighlight } from 'marked-highlight'
import { Marked } from 'marked'
import hljs from 'highlight.js'
import xml from 'highlight.js/lib/languages/xml'
import renderer from './libs/renderer.js'
import { resolvePath } from './libs/utils.js'

function parse(markdown) {
  hljs.registerLanguage('html', xml)
  const marked = new Marked(
    markedHighlight({
      langPrefix: `my-4 hljs text-xs language-`,
      highlight(code, info) {
        const [lang] = info.includes(',') ? info.split(',') : [info]
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'

        return hljs.highlight(code, { language }).value
      },
    },
    ),
  )

  marked.use({ renderer })
  return marked.parse(markdown)
}

new Builder({
  srcRoot: process.cwd(),
  outRoot: path.resolve(process.cwd(), 'dev-blog'),
}).loadJson({
  key: 'posts',
  src: 'src/data/posts.json',
  postProcess: (data) => {
    return {
      ...data,
      posts: data.posts.map(post => ({ ...post, href: resolvePath(post.href), thumbnail: resolvePath(post.thumbnail) })),
    }
  },
}).copy([
  ['src/assets', 'assets'],
  ['src/css', 'css'],
  ['src/public', ''],
  ['src/scripts', 'scripts'],
  ['Browser/assets', 'posts/Browser/assets'],
  ['JavaScript/assets', 'posts/JavaScript/assets'],
  ['Review/assets', 'posts/Review/assets'],
]).markdownGlob({
  srcPattern: 'JavaScript/*.md',
  outDir: 'posts',
  parse,
  render: post,
})
  .markdownGlob({
    srcPattern: 'Browser/*.md',
    outDir: 'posts',
    parse,
    render: post,
  })
  .markdownGlob({
    srcPattern: 'Review/*.md',
    outDir: 'posts',
    parse,
    render: post,
  })
  .markdownGlob({
    srcPattern: 'DesignPattern/*.md',
    outDir: 'posts',
    parse,
    render: post,
  })
  .html({
    out: 'index.html',
    render: index,
  })
  .html({
    paths: ['Review', 'JavaScript', 'Browser', 'DesignPattern'].map(name => ({ name })),
    out: 'posts/[name].html',
    render: category,
  })
  .build()
