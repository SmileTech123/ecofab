
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
    'index.csr.html': {size: 26503, hash: 'cde30b888e09f5a74f0822aa5e3d06cb005f7ebb2c793520a4560fdb9879bbbe', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17239, hash: '60f56767756dc2146d2cfe8d6cc8cd56bbb122644bb5391d9b3f2a72a2293833', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-RM4XWHFF.css': {size: 9921, hash: '84TjdX7Yw8g', text: () => import('./assets-chunks/styles-RM4XWHFF_css.mjs').then(m => m.default)}
  },
};
