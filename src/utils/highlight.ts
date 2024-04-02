import 'highlight.js/styles/base16/tomorrow-night.css'

import hljs, { type HLJSApi } from 'highlight.js'

// ----------------------------------------------------------------------

declare global {
  interface Window {
    hljs: HLJSApi
  }
}

hljs.configure({
  languages: ['javascript', 'sh', 'bash', 'html', 'scss', 'css', 'json'],
})

if (typeof window !== 'undefined')
  window.hljs = hljs
