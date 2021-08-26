import {readFileSync, existsSync, mkdirSync, rmdirSync, writeFileSync, statSync, copyFileSync} from 'node:fs';
import {parse} from 'node:path';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import {all} from 'mdast-util-to-hast';
import remarkHighlight from 'remark-highlight.js';
import remarkSlug from 'remark-slug'
import toc from 'markdown-toc';
import * as html from './html.js';

const prefix = process.env.phase === 'dev' ? '' : '/dev-blog';

function isExternalUrl (url) {
  return url.startsWith('http');
}

function convertLinkUrl (url) {
  if (url.startsWith('#')) return url;
  return prefix + url.replace('./', '/').replace(/.md$/, '.html');
}

/**
 * @param {string} markdown 
 * @returns {Promise<{meta: object, html: string}>}
 */
export function mdToHTML (markdown) {
  let meta = {};
  const contentList = toc(markdown).json;
  function visit(node) {
    if (node.type === 'html' && node.value.trim().startsWith('<!--meta')) {
      meta = extractMeta(node.value) || {};
    }
  }
  return new Promise((resolve) => {
    unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(remarkHighlight)
    .use(function () {
      function transformer (tree) {
        visit(tree);
        if (Array.isArray(tree.children)) {
          tree.children.forEach(child => transformer(child));
        }
      }
      return transformer;
    })
    .use(remarkHtml, {
      handlers: {
        link(h, node) {
          return h(node, 'a', {
            href: isExternalUrl(node.url || '')
              ? node.url
              :  convertLinkUrl(node.url)
          }, all(h, node));
        },
        heading (h, node) {
          return h(node, `h${node.depth}`, all(h, node));
        }
      }
    })
    .process(markdown)
    .then((html) => {
      meta.contentList = contentList;
      resolve({
        html: String(html),
        meta,
      });
    })  
  });
}

/**
 * @param {string} path 
 * @returns {string}
 */
export function readFile (path) {
  return readFileSync(path).toString();
}

/**
 * @param {string} path 
 * @returns {void}
 */
export function mkdirIfNotExist (path) {
  if (existsSync(path)) {
    return;
  }
  mkdirSync(path);
}

/**
 * @param {string} path 
 */
export function rmdir (path) {
  if (existsSync(path)) {
    rmdirSync(path, { recursive: true });
  }
}

/**
 * @param {string} path 
 * @param {string} data 
 */
export function writeFile (path, data) {
  writeFileSync(path, data, { flag: 'wx' });
}

const actionColorMap = new Map();
let colorIndex = 0;
const COLORS = [
  "\x1b[34m",
  "\x1b[31m",
  "\x1b[32m",
  "\x1b[33m",
]
/**
 * @param {string} message 
 */
export function log(action, message) {
  let color = actionColorMap.get(action);
  if (!color) {
    color = COLORS[colorIndex++];
    actionColorMap.set(action, color);
  }
  console.log(`> ${color}[${action}]\x1b[0m ` + message);
}

/**
 * @param {string} path 
 */
export function isMarkdown(path) {
  return parse(path).ext === '.md';
}

/**
 * @param {string} path 
 * @returns {boolean}
 */
export function isDirectory (path) {
  const stat = statSync(path);
  return stat.isDirectory();
}

/**
 * @param {string} src 
 * @param {string} dest 
 */
export function copyFile (src, dest) {
  copyFileSync(src, dest);
}

/**
 * @param {string} content 
 */
export function applyTemplate(
  content,
  meta = {}) {
  const description = meta.description ? html.meta('description', meta.description) : '';
  const keywords = meta.keywords ? html.meta('keywords', meta.keywords) : '';
  const title = html.title(meta.title);
  const toc = meta.disableContentList ? '' : html.toc(meta.contentList);
  return `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${description}
    ${keywords}
    ${title}
    <link rel="stylesheet" href="${prefix}/styles/global.css">
    <link rel="stylesheet" href="${prefix}/highlight/default.min.css">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZBZX7LMVNE"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-ZBZX7LMVNE');
    </script>
  </head>
  <body>
    <header>
      <nav>
        <a href="/dev-blog">dev-blog</a>
      </nav>
    </header>
    <article>
      <div class="container">
        <div class="content">
          ${content}
        </div>
        ${toc}
      </div>
    </article>
  </body>
</html>
`
}

const META_REGEX = /<!--meta([\s\S]*?)-->/;
/**
 * @param {string} markdown 
 */
export function extractMeta (markdown) {
  const matched = markdown.match(META_REGEX);
  if (!matched) return null;
  const [, metaString] = matched;
  const metaLines = metaString.trim().split('\n');
  const meta = metaLines.reduce((result, keyValue) => {
    const [key, value] = keyValue.split(':');
    result[key.trim()] = value.trim();
    return result;
  }, {});
  return meta;
}
