import { html } from "y-blogify";

const postItem = post => html`
  <div class="border-t border-black pt-6 mb-16">
    <span class="text-xs font-bold block">${post.category}</span>
    <a href="/posts/JavaScript/speeding-up-the-javascript-ecosystem-the-barrel-file-debacle/">
      <span class="block my-3 text-xl font-bold">${post.title}</span>
      <p class="text-sm text-zinc-600 mb-8">
                ${post.description}
      </p>
      <img src="${post.thumbnail}" alt="">
    </a>
  </div>
`

export default (posts) => html`
  <div>
        ${
          posts.map(post => postItem(post)).join('\n')
        }
  </div>
`