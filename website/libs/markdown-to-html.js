import { markedHighlight } from "marked-highlight";
import { Marked } from "marked";
import hljs from "highlight.js";
import xml from "highlight.js/lib/languages/xml";

/**
 * @param {string} markdown
 * @returns {Promise<string>}
 */
export default async function markdownToHTML(markdown) {
  hljs.registerLanguage("html", xml);
  const marked = new Marked(
    markedHighlight({
      langPrefix: `hljs language-`,
      highlight(code, info) {
        const [lang] = info.includes(",") ? info.split(",") : [info];
        const language = hljs.getLanguage(lang) ? lang : "plaintext";

        return hljs.highlight(code, { language }).value;
      },
    }),
  );
  return marked.parse(markdown);
}
