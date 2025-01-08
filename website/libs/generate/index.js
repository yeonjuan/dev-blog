import load from "../data/load.js";
import markdownToHTML from "../markdown-to-html.js";

load()
  .then(async ({ posts, ...rest }) => {
    return {
      ...rest,
      posts: await toMarkdowns(posts),
    };
  })
  .then(console.log);

async function toMarkdowns(posts) {
  return await Promise.all(
    posts.map(async ({ markdown, ...rest }) => ({
      ...rest,
      html: await markdownToHTML(markdown),
    })),
  );
}
