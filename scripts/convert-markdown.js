/**
 * @typedef {import("./types").Content} Content
 * @typedef {import("./types").FileInfo} FileInfo
 */
import {unified} from 'unified';
import {parse} from 'node:path';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import {all} from 'mdast-util-to-hast';
import remarkHighlight from 'remark-highlight.js';
import remarkSlug from 'remark-slug';
import toc from 'markdown-toc';
import remarkGfm from 'remark-gfm';
import {PATH_PREFIX} from './constants.js';

/**
 * @param {string} url 
 * @returns {boolean}
 */
function isExternalUrl (url) {
  return url.startsWith('http');
}

/**
 * @param {object} node 
 * @returns {boolean}
 */
function isMetaCommentNode (node) {
  return node.type === 'html'
    && node.value.trim().startsWith('<!--meta')
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

/**
 * @param {string} markdown
 * @param {FileInfo} info
 * @returns {Content}
 */
export default function convertMarkdown (
  markdown,
  info
) {
  let meta = {};
  const REMARK_HTML_OPTIONS = {
    handlers: {
      link(h, node) {
        const href = convertToHref(node.url);
        return h(node, 'a', {href}, all(h, node));
      }
    }
  }
  const contentList = toc(markdown).json;

  function convertToHref (url) {
    return isExternalUrl(url || '')
    ? url
    : convertUrl(url);
  }

  function convertUrl (url) {
    if (url.startsWith('#')){
      return url;
    }
    const pared = parse(info.relPath);
    return PATH_PREFIX + url.replace('./', pared.dir ? '/' + pared.dir + '/' : '/')
      .replace('README.md', '/')
      .replace(/.md$/, '.html')
  }

  function visit(node) {
    if (isMetaCommentNode(node)) {
      meta = extractMeta(node.value) || {};
    }
  }

  function visitor () {
    function transformer (tree) {
      visit(tree);
      if (Array.isArray(tree.children)) {
        tree.children.forEach(child => transformer(child));
      }
    }
    return transformer;
  }
  return new Promise((resolve) => {

    function resolver (html) {
      meta.contentList = contentList;
      resolve({
        html: String(html),
        meta,
      });
    }

    unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSlug)
    .use(remarkHighlight)
    .use(visitor)
    .use(remarkHtml, REMARK_HTML_OPTIONS)
    .process(markdown)
    .then(resolver);
  });
}
