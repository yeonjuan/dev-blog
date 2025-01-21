import { html } from '@html-kit/html'
import layout from '../components/layout.js';

export default (children) => layout({
  title: "DevBlog",
  children,
  link: html`
    <link href="/css/github.min.css" type="text/css" rel="stylesheet" />
    
    `
})