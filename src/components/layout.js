import { formatISO, parse } from 'date-fns'
import { html } from '@html-kit/html'
import header from './header.js'
import { resolvePath } from '../libs/utils.js'

export default ({
  title,
  children,
  link = '',
  breadcrumb = [],
  description,
  thumbnail = '',
  createdAt = '',
}) => {
  const date = parse(createdAt, 'yyyy.MM.dd', new Date())
  return html`
   <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>${title}</title>
        <link href="${resolvePath('/favicon.ico')}" rel="shortcut icon">
        ${description && html`<meta name="description" content="${description}">`}
        ${thumbnail && html`<meta property="og:image" content="${thumbnail}" /> `}
        <meta property="og:type" content="blog" />
        <meta property="og:title" content="${title}" /> 
        <meta property="og:description" content="${description}" /> 
        <link href="${resolvePath('/output.css')}" type="text/css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "${title}",
          ${thumbnail
            ? `"image": [
            "https://yeonjuan.github.io/${thumbnail}"
          ],`
            : ''}
            ${
              createdAt
                ? `
              "datePublished": "${formatISO(date)}",
              "dateModified": "${formatISO(date)}",
              `
                : ''
            }
          "author": [{
              "@type": "Person",
              "name": "YeonJuAn",
              "url": "https://github.com/yeonjuan"
            }]
        }
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZBZX7LMVNE"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZBZX7LMVNE');
        </script>
        ${link}
      </head>
      <body>
        <div class="relative">
            ${header()}
          <main class="py-2 px-4 pt-10 max-w-3xl m-auto pb-20">
          ${!!breadcrumb.length && html`
            <aside class="mt-14">
              ${breadcrumb.map(({ href, title }) => {
                return html`<a href="${resolvePath(href)}" class="hover:underline">${title}</a>`
              }).join(' &gt; ')}
            </aside>
          `}
            ${children}
          </main>
        </div>
        <script src="${resolvePath('/scripts/header.js')}"></script>
      </body>
    </html>
    `
}
