import { html } from '@html-kit/html'

const postItem = post => html`
  <div class="border-t border-black pt-6 mb-16">
    <div class="w-full flex">
      <span class="text-xs font-bold block">${post.category}</span>
      <span class="text-xs ml-auto mr-0">${post.createdAt}</span>
    </div>
    <a href="${post.href}">
      <span class="block my-3 text-xl font-bold">${post.title}</span>
   
      <p class="text-sm text-zinc-600 mb-8">
        ${post.description}
      </p>
      <img src="${post.thumbnail}" loading="lazy" class="m-auto max-w-2xl w-full" alt="">
    </a>
  </div>
`

export default posts => html`
  <div>
    ${
      posts.map(post => postItem(post)).join('\n')
    }
  </div>
`
