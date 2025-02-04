
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-6QLONYCF.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 26503, hash: '2e4b42ddb77505053bde13e9afe9c1529b2e21640b85d552425a314a5c8cf26d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17239, hash: 'd2a64f22572e30c0363bec6e48f99ed7b2bc7131dd7769b6da05b311d0fc8b32', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Y2PG7SU2.css': {size: 9988, hash: 'fMPIjC9SCUc', text: () => import('./assets-chunks/styles-Y2PG7SU2_css.mjs').then(m => m.default)}
  },
};
