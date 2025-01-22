import { html } from '@html-kit/html'
import { toId } from './utils.js'

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
    <h1 id="${toId(text)}" class="text-2xl my-8 ">
      ${text}
    </h1>`
}

/**
 * @param {string} text
 * @returns {string}
 */
function h2(text) {
  return html`
    <h2 id="${toId(text)}" class="text-xl my-4 ">
      ${text}
    </h2>`
}

/**
 * @param {{type: string, href: string,  text: string}} params
 */
function link({ text, href }) {
  return html`<a href="${href}" class="text-orange-500">${text}</a>`
}

/**
 * @param {{type: string, text: string, tokens: any[]}} params
 * @returns {string}
 */
function paragraph({ tokens }) {
  const text = this.parser.parseInline(tokens)
  return html`<p class="my-3 text-base leading-7">${text}</p>`
}

/**
 * @param {{text: string}} token
 * @returns
 */
function codespan({ text }) {
  return html`<code class="bg-gray-100 px-1 rounded-md inline-block text-sm">${text}</code>`
}

/**
 *
 * @param {{tokens: any[]}} token
 * @returns
 */
function blockquote({ tokens }) {
  return html`<blockquote class="border-l-2 border-black pl-2">${this.parser.parse(tokens)}</blockquote>`
}

function list({ items }) {
  return html`<ul class="my-4 px-3">${items.map(item => html`<li  class="text-base">${this.parser.parseInline(item.tokens)}</li>`).join('')}</ul>`
}

export default {
  heading,
  link,
  paragraph,
  codespan,
  blockquote,
  list,
}
