
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
    'index.csr.html': {size: 26605, hash: 'f1fe4ed80659cee7f5f454167558bf0387bde091c9b90100dcb7721c045d2672', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17341, hash: '10b82bd24bc408799baf1376da24aca830a2519d2ba16f002d6ac4b9dec9ccde', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Y2PG7SU2.css': {size: 9988, hash: 'fMPIjC9SCUc', text: () => import('./assets-chunks/styles-Y2PG7SU2_css.mjs').then(m => m.default)}
  },
};
