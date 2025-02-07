
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
    'index.csr.html': {size: 26503, hash: '969d92debba8a7174626a8e893284dff4a16b209255ecf3726f66f4eaf728f00', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17239, hash: '0d6642662532c36f1e362bdeb13afcc1ca4488380dff69c67a69caa76d417a76', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Y2PG7SU2.css': {size: 9988, hash: 'fMPIjC9SCUc', text: () => import('./assets-chunks/styles-Y2PG7SU2_css.mjs').then(m => m.default)}
  },
};
