
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
    'index.csr.html': {size: 26503, hash: '7bd6037fa15f6b72e54bbcf2ca864eb1232bd6a697360976cd660ba1c3181bae', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17239, hash: 'b970060b40a18ecdb175c8496d38b6103a7d4a913f351ce8083a1c7b9b6bd7de', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-TJNHR34F.css': {size: 9868, hash: 'ZJHoSGaLOtE', text: () => import('./assets-chunks/styles-TJNHR34F_css.mjs').then(m => m.default)}
  },
};
