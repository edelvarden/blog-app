import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import './github-dark.min.css';

hljs.registerLanguage('javascript', javascript);

export default hljs;