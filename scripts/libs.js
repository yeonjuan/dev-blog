import {readFileSync, existsSync, mkdirSync, rmdirSync, writeFileSync, statSync} from 'node:fs';
import {parse} from 'node:path';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

/**
 * @param {string} markdown 
 * @returns {Promise<string>}
 */
export function mdToHTML (markdown) {
  return new Promise((resolve) => {
    unified()
    .use(remarkParse)
    .use(remarkHtml)
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
