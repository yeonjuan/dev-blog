import process from "process";
import fs from "fs";
import SOURCE from "./source.js";

export default async function load() {
  return {
    posts: await loadPosts(),
  };
}

/**
 * @param {string} path
 * @returns  {string}
 */
function resolve(path) {
  return path.replace("<rootDir>", process.cwd());
}

async function loadPosts() {
  return Promise.all(
    SOURCE.posts.map(
      async ({ title, description, src, thumbnail, createdAt }) => {
        const markdown = await fs.promises.readFile(resolve(src), "utf-8");
        return {
          title,
          description,
          thumbnail,
          createdAt,
          markdown,
        };
      },
    ),
  );
}
