
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
    'index.csr.html': {size: 26509, hash: '1969075e819e6690c2682db6e78b845840a07ad1a8a473a15b285a2625694c54', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17239, hash: '4dda14049624350bdebed501d451536fd04aac0891c59c1f25db2499739c882d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-N35DQA47.css': {size: 9874, hash: 'ZbzMYIoqyyg', text: () => import('./assets-chunks/styles-N35DQA47_css.mjs').then(m => m.default)}
  },
};
