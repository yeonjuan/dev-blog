import {html} from 'y-blogify';
import layout from '../components/layout.js';

export default (content) => html`
    ${layout({
        title: "DevBlog",
        children: content
    })}
`;