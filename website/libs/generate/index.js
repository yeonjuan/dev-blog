import load from "../data/load.js";
import markdownToHTML from "../markdown-to-html.js";
import fs from "fs/promises";
import * as html from "./html.js";

load()
  .then(async ({ posts }) => ({
    posts: await postsToMarkdowns(posts),
  }))
  .then(async ({ posts }) => {
    await generateHome(posts);
  });

async function postsToMarkdowns(posts) {
  return await Promise.all(
    posts.map(async ({ markdown, ...rest }) => ({
      ...rest,
      html: await markdownToHTML(markdown),
    })),
  );
}

function generateHome(posts) {
  generateHomeDevPosts(posts);
}

async function generateHomeDevPosts(posts) {
  await writeHtmlFile(
    "./website/modules/generated/dev-post-list.html",
    html.devPostsList(posts),
  );
}

/**
 *
 * @param {string} file
 * @param {string} html
 * @returns {Promise<void>}
 */
async function writeHtmlFile(file, html) {
  return fs.writeFile(file, pretifyHTML(html), "utf-8");
}

/**
 * @param {string} html
 * @returns {string}
 */
function pretifyHTML(html) {
  const lines = html.split("\n").filter((line) => line.trim());
  if (!lines[0]) return;
  const firstLine = lines[0];
  const indentCount =
    firstLine.length - firstLine.replace(/^[\s\t]+/, "").length;
  const indent = " ".repeat(indentCount);
  const contents = lines.map((line) => line.replace(indent, "")).join("\n");
  return contents;
}
