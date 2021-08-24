import {readFileSync, existsSync, mkdirSync, rmdirSync, writeFileSync, statSync} from 'node:fs';
import {parse} from 'node:path';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

const own = {}.hasOwnProperty

/**
 * @type {Handler}
 * @param {MdastNode} node
 */
 export function one(h, node, parent) {
  const type = node && node.type
  /** @type {Handler} */
  let fn

  // Fail on non-nodes.
  if (!type) {
    throw new Error('Expected node, got `' + node + '`')
  }

  if (own.call(h.handlers, type)) {
    fn = h.handlers[type]
  } else if (h.passThrough && h.passThrough.includes(type)) {
    fn = returnNode
  } else {
    fn = h.unknownHandler
  }

  return (typeof fn === 'function' ? fn : unknown)(h, node, parent)
}


export function all(h, parent) {
  /** @type {Array.<Content>} */
  const values = []

  if ('children' in parent) {
    const nodes = parent.children
    let index = -1

    while (++index < nodes.length) {
      const result = one(h, nodes[index], parent)

      if (result) {
        if (index && nodes[index - 1].type === 'break') {
          if (!Array.isArray(result) && result.type === 'text') {
            result.value = result.value.replace(/^\s+/, '')
          }

          if (!Array.isArray(result) && result.type === 'element') {
            const head = result.children[0]

            if (head && head.type === 'text') {
              head.value = head.value.replace(/^\s+/, '')
            }
          }
        }

        if (Array.isArray(result)) {
          values.push(...result)
        } else {
          values.push(result)
        }
      }
    }
  }

  return values
}

function isExternalUrl (url) {
  return url.startsWith('http');
}

function convertLinkUrl (url) {
  return '/dev-blog' + (!url.startsWith('/') ? '/' : '') + url.replace('./', '/').replace(/.md$/, '.html');
}

/**
 * @param {string} markdown 
 * @returns {Promise<string>}
 */
export function mdToHTML (markdown) {
  return new Promise((resolve) => {
    unified()
    .use(remarkParse)
    .use(remarkHtml, {
      handlers: {
        link(h, node) {
          // console.log(node);
          return h(node, 'a', {
            href: isExternalUrl(node.url || '')
              ? node.url
              :  convertLinkUrl(node.url)
          }, all(h, node));
        }
      }
    })
    .process(markdown)
    .then((html) => {
      resolve(String(html));
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
