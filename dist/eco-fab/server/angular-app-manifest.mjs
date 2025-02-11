
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-MQXYPEFQ.js",
      "dynamicImport": false
    }
  ],
  "node_modules/html2canvas/dist/html2canvas.js": [
    {
      "path": "chunk-SWBZ2T66.js",
      "dynamicImport": false
    }
  ],
  "node_modules/dompurify/dist/purify.js": [
    {
      "path": "chunk-5FZRUFQ3.js",
      "dynamicImport": false
    }
  ],
  "node_modules/canvg/lib/index.es.js": [
    {
      "path": "chunk-VWC4Q6JS.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 26605, hash: 'f065d9109f79832d69ec0e09e45a529aa6c09ac66d686533362e1e6c85450f9e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17341, hash: '701a208b4f361e8be37eae158ee190eed3836f90e2d9910ff51ff4abb83341d7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Y2PG7SU2.css': {size: 9988, hash: 'fMPIjC9SCUc', text: () => import('./assets-chunks/styles-Y2PG7SU2_css.mjs').then(m => m.default)}
  },
};
