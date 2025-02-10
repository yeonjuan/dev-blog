import { html } from '@html-kit/html'

export default (name, posts) => {
  return html`
    <h1 class="text-2xl my-8 font-bold">${name}</h1>
    <ul>
      ${
        posts.map((post, index) => {
          return html`
            <li class="border-t border-gray-200 flex items-center hover:underline cursor:pointer">
              <span class="pl-2 pr-4">${index + 1}</span>
              <a href=${post.href} class="py-4 inline-block text-base">${post.title}</a>
            </li>
            `
        })
      }
    </ul>
  `
}
