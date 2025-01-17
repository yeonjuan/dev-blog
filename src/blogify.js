import process from "process";
import path from "path";
import { blogify } from "y-blogify";
import index from "./pages/index.js";

blogify({
  srcRoot: process.cwd(),
  outRoot: path.resolve(process.cwd(), "out"),
})
  .loadJSON({
        key: "posts",
        src: "src/data/posts.json"
    })
    .copy({
      src: "src/assets",
      out: "assets",
    })
  .copy({
    src: "Browser/assets",
    out: "Browser/assets",
  })
  .copy({
    src: "JavaScript/assets",
    out: "JavaScript/assets",
  })
  .copy({
    src: "Review/assets",
    out: "Review/assets",
  })
  .html({
    out: "index.html",
    render: index,
  })
  .build();