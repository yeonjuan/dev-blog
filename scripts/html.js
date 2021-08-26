/**
 * @param {string} name 
 * @param {string} content
 * @returns {string}
 */
export function meta (name, content) {
  return `<meta name="${name}" content="${content}">`;
}

/**
 * @param {string} [title]
 * @returns {string}
 */
export function title (title) {
  return `<title>${(!title || title.trim() === 'dev-blog') ? 'dev-blog' : `${title} - deb-blog`}</title>`;
}

export function toc (input) {
  const result = [];

  input.filter(item => item.lvl > 1).forEach((cur, index, list) => {
    const prev = list[index - 1];
    const after = list[index + 1];
    const pushContent = () => {
      result.push('<li>', `<a href="#${cur.slug}"> ${cur.content}</a>`);
      if (!after || after.lvl <= cur.lvl) {
        result.push('</li>\n');
      }
    }
    if (index === 0 || prev.lvl < cur.lvl) {
      result.push('\n<ul>\n');
      pushContent();
      return;
    }

    if (prev.lvl > cur.lvl) {
      const diff = prev.lvl - cur.lvl;
      for (let i = 0; i < diff; i++) {
        result.push('\n</ul>\n</li>\n');
      }
    }
    pushContent();
   if (index == list.length - 1) {
    for (let i = 1; i < cur.lvl; i++) {
      result.push('</ul>\n');
      if(i < cur.lvl - 1) {
        result.push('</li>\n');
      }
    }
   }
  });
  if (!result.length) {
    return '';
  }
  return `
  <nav class="toc-heading">
    ${result.join('')}
  </nav>
  `
}
