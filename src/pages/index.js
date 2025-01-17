import { html } from "y-blogify";
import header from '../components/header.js'
import devPostList from "../components/dev-post-list.js";

export default (content, data) => html`
    <!doctype html>
    <html lang="ko">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width" />
            <title>DevBlog</title>
            <link href="./output.css" type="text/css" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
                rel="stylesheet"
            />
        </head>
        <body>
            <div class="relative">
                ${header()}
                <main class="py-2 px-4 pt-20">
                    <h2 class="py-8 text-2xl">개발</h2>
                    ${devPostList(data("posts").posts)}
                    <!-- <module href="/modules/generated/dev-post-list.html"></module> -->
                </main>
                <!-- <module href="/modules/footer.html"></module> -->
            </div>
            <script src="~/website/modules/header/header.js"></script>
        </body>
    </html>
`;
