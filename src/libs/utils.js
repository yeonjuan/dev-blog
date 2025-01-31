/**
 * @param {string} text
 * @returns {string}
 */
export function toId(text) {
  return text.toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/[\s\/]/g, '-')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
}

export function resolvePath(path) {
  if (path.startsWith('/')) {
    return '/dev-blog' + path
  }
  return path
}
