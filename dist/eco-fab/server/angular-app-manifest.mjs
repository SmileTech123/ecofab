
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
    'index.csr.html': {size: 26605, hash: '204d468891fb290e7c73520f96d2e1f11e0006d900f143fa2c7ab41d30a0267d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17341, hash: 'c4a66a6e3a6b7dccbe5b1885e8b0d91be0e7a4b8e73845a7e9f76d11861edfa5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Y2PG7SU2.css': {size: 9988, hash: 'fMPIjC9SCUc', text: () => import('./assets-chunks/styles-Y2PG7SU2_css.mjs').then(m => m.default)}
  },
};
