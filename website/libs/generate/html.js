export function devPostsList(posts) {
  const postList = posts
    .map(({ title, description, src, thumbnail, createdAt, category }) => {
      return /* html */ `
        <div class="border-t border-black pt-6 mb-16">
            <span class="text-xs font-bold block">${category.toUpperCase()}</span>
            <a href="">
                <span class="block my-3 text-xl font-bold">${title}</span>
                <p class="text-sm text-zinc-600 mb-8">
                    ${description}
                </p>
                <img src="${thumbnail}" alt="">
            </a>
        </div>
    `;
    })
    .join("\n");
  return /* html */ `
    <div>
        ${postList}
    </div>
  `;
}
