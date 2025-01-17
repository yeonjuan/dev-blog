import { html } from "y-blogify";
import devPostList from "../components/dev-post-list.js";
import layout from "../components/layout.js";

export default (_, data) => layout({
    title: "DevBlog",
    children: html`
        <h2 class="py-8 text-2xl">개발</h2>
        ${devPostList(data("posts").posts)}
`
});
