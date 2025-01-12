import load from "../data/load.js";
import markdownToHTML from "../markdown-to-html.js";
import fs from "fs/promises";
import path from "path";
import * as html from "./html.js";

load()
  .then(async ({ copyAssets, posts }) => {
    await Promise.all(
      copyAssets.map(([source, dest]) => {
        return fs.cp(
          source.replace("<rootDir>", process.cwd()),
          dest.replace("<rootDir>", process.cwd()),
          {
            recursive: true,
          },
        );
      }),
    );

    return { posts };
  })
  .then(async ({ posts }) => ({
    posts: await markdownPostsToHtmlPosts(posts),
  }))
  .then(async ({ posts }) => {
    await generateHome(posts);
    await generatePosts(posts);
  });

async function markdownPostsToHtmlPosts(posts) {
  return await Promise.all(
    posts.map(async ({ markdown, src, ...rest }) => ({
      ...rest,
      src,
      href: src.replace("<rootDir>", "/posts").replace(/\.md$/, "/"),
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

function generatePosts(posts) {
  return Promise.all(posts.map((post) => generatePost(post)));
}

function generatePost({ src, html: innerHTML }) {
  const outfile = src
    .replace("<rootDir>", "./website/posts")
    .replace(/\.md$/, ".html");

  writeHtmlFile(outfile, html.devPost(innerHTML));
}

async function madirForFile(file) {
  const dirname = path.dirname(file);
  try {
    await fs.stat(dirname);
  } catch {
    await fs.mkdir(dirname, { recursive: true });
  }
}

/**
 *
 * @param {string} file
 * @param {string} html
 * @returns {Promise<void>}
 */
async function writeHtmlFile(file, html) {
  await madirForFile(file);
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
