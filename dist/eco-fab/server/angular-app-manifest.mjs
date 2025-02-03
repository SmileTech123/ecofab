
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-YJLHLFX2.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 26509, hash: 'afdd49961b84bd7b6db4f4d964578d8538dcb14bf016c810a4220cd9cce59b56', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17239, hash: '277b5d5247e494812ed370279871386e1298eafb2afc52a44f43c5c6d8e11869', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-N35DQA47.css': {size: 9874, hash: 'ZbzMYIoqyyg', text: () => import('./assets-chunks/styles-N35DQA47_css.mjs').then(m => m.default)}
  },
};
