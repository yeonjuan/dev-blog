import { html } from '@html-kit/html'
import { toId } from './utils.js'
import sanitizeHtml from 'sanitize-html'

/**
 *
 * @param {{type: string, raw: string, depth: number, text: string}} params
 * @returns {string}
 */
function heading({ text, depth }) {
  switch (depth) {
    case 1:
      return h1(text)
    case 2:
      return h2(text)
  }
  return text
}

/**
 * @param {string} text
 * @returns {string}
 */
function h1(text) {
  return html`
    <h1 id="${toId(text)}" class="text-2xl my-8 font-bold">
      ${text}
    </h1>`
}

/**
 * @param {string} text
 * @returns {string}
 */
function h2(text) {
  return html`
    <h2 id="${toId(text)}" class="text-xl my-4 font-semibold">
      ${text}
    </h2>`
}

/**
 * @param {{type: string, href: string,  text: string}} params
 */
function link({ text, href, tokens }) {
  return html`<a href="${href}" class="text-orange-500">${this.parser.parseInline(tokens)}</a>`
}

/**
 * @param {{type: string, text: string, tokens: any[]}} params
 * @returns {string}
 */
function paragraph({ tokens }) {
  const text = this.parser.parseInline(tokens)
  return html`<p class="my-1 text-sm leading-7 mb-6">${text}</p>`
}

/**
 * @param {{text: string}} token
 * @returns
 */
function codespan({ text, ...rest }) {
  return html`<code class="bg-gray-100 px-1 rounded-md inline-block text-sm">${text.replace(/\</g, '&lt;').replace(/\>/g, '&gt;')}</code>`
}

/**
 *
 * @param {{tokens: any[]}} token
 * @returns
 */
function blockquote({ tokens }) {
  return html`<blockquote class="border-l-2 border-black pl-2 my-4">${this.parser.parse(tokens)}</blockquote>`
}

function list({ items }) {
  return html`<ul class="my-2 px-3">${items.map(item => html`<li  class="text-base *:mb-0 *:mt-0 *:leading-6">${this.parser.parse(item.tokens)}</li>`).join('')}</ul>`
}

function image({ href }) {
  return html`<img class="my-4 border-gray-300 border rounded-sm p-1" src="${href}">`
}

function code({ text, lang }) {
  return html`<pre><code class="my-4 hljs text-xs language-${lang || ''}">${text}</code></pre>`
}

export default {
  heading,
  link,
  paragraph,
  codespan,
  blockquote,
  list,
  image,
  code,
}
