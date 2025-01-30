import { html } from '@html-kit/html'

export default () => html`
  <style>
        .hamburger {
            cursor: pointer;
            justify-content: space-between;
            flex-direction: column;
        }
        .hamburger > div {
            height: 2px;
            transition: 0.2s ease-out;
            z-index: 999;
        }
        .menuInput:checked ~ .hamburger > div:nth-child(1) {
            transform: translateY(6.5px) rotate(45deg);
        }
        .menuInput:checked ~ .hamburger > div:nth-child(2) {
            opacity: 0;
        }
        .menuInput:checked ~ .hamburger > div:nth-child(3) {
            transform: translateY(-6.5px) rotate(-45deg);
        }
    </style>
  <div id="overlay" class="backdrop-blur-sm bg-black/20 dark:bg-slate-900/80 fixed h-full inset-0 hidden"></div>
  <header class="bg-zinc-800 text-white h-12 fixed flex justify-between items-center w-full px-4">
    <a
      class="w-10 flex items-center justify-center"
      href="https://github.com/yeonjuan/dev-blog"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/assets/ic-github.svg"
        alt="go to github"
        width="20"
      >
    </a>
    <span>
      <a href="/">
        DEV BLOG
      </a>
    </span>
    <div class="w-10">
      <input
        id="menu"
        type="checkbox"
        class="menuInput peer sr-only hidden"
        aria-hidden="true"
      >
      <label
        for="menu"
        aria-label="menu button"
        class="hamburger flex flex-col justify-between ml-auto h-[21px] w-[21px] px-[1px] py-[3px] [&>div]:h-[2px] [&>div]:w-[18px] [&>div]:bg-white hover:cursor-pointer"
      >
        <div></div>
        <div></div>
        <div></div>
      </label>
      <nav class="fixed text-black transition-[max-height] duration-200 overflow-hidden max-h-0 top-12 left-[0px] peer-checked:max-h-[200px] bg-white w-full border-b border-black">
        <ul class="p-4">
          <li>
            <a class="inline-block w-full h-full py-2 hover:underline cursor-pointer" href="/">HOME</a>
          </li>
          <li>
            <a class="inline-block w-full h-full py-2 hover:underline cursor-pointer" href="/posts/JavaScript">JavaScript</a>
          </li>
          <li>
            <a class="inline-block w-full h-full py-2 hover:underline cursor-pointer" href="/posts/Review">Review</a>
          </li>
          <li>
            <a class="inline-block w-full h-full py-2 hover:underline cursor-pointer" href="/posts/Browser">Browser</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
`
