
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
    'index.csr.html': {size: 26605, hash: 'f0ffc52d3c14f1a242b1f92c186bf27788f2b601d82593b992f9f69cb0ca1e4e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17341, hash: '2396bdde09145ed71db42d1df6af986fc604d4d146c2c0ec36e9d0fd2ac18b01', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Y2PG7SU2.css': {size: 9988, hash: 'fMPIjC9SCUc', text: () => import('./assets-chunks/styles-Y2PG7SU2_css.mjs').then(m => m.default)}
  },
};
