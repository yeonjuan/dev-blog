import process from 'process'
import path from 'path'
import { blogify } from 'y-blogify'
import index from './pages/index.js'
import post from './pages/post.js'
import { markedHighlight } from 'marked-highlight'
import { Marked } from 'marked'
import hljs from 'highlight.js'
import xml from 'highlight.js/lib/languages/xml'
import renderer from './libs/renderer.js'

function parse(markdown) {
  hljs.registerLanguage('html', xml)
  const marked = new Marked(
    markedHighlight({
      langPrefix: `hljs text-sm language-`,
      highlight(code, info) {
        const [lang] = info.includes(',') ? info.split(',') : [info]
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'

        return hljs.highlight(code, { language }).value
      },
    }),
  )

  marked.use({ renderer })
  return marked.parse(markdown)
}

blogify({
  srcRoot: process.cwd(),
  outRoot: path.resolve(process.cwd(), 'out'),
})
  .loadJSON({
    key: 'posts',
    src: 'src/data/posts.json',
  })
  .copy({
    src: 'src/assets',
    out: 'assets',
  })
  .copy({
    src: 'src/css',
    out: 'css',
  })
  .copy({
    src: 'Browser/assets',
    out: 'Browser/assets',
  })
  .copy({
    src: 'JavaScript/assets',
    out: 'JavaScript/assets',
  })
  .copy({
    src: 'Review/assets',
    out: 'Review/assets',
  })
  .markdown({
    src: 'JavaScript/speeding-up-the-javascript-ecosystem-the-barrel-file-debacle.md',
    out: 'posts/JavaScript/speeding-up-the-javascript-ecosystem-the-barrel-file-debacle.html',
    parser: {
      parse,
    },
    render: post,
  })
  .markdown({
    src: 'Review/2024-retrospect.md',
    out: 'posts/Review/2024-retrospect.html',
    parser: {
      parse,
    },
    render: post,
  })
  .html({
    out: 'index.html',
    render: index,
  })
  .build()
