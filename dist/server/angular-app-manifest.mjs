
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
    'index.csr.html': {size: 26509, hash: '7b42910f9fb9a3826c0d4f0fe35fa1518d77b73befa2742747dbdd9b473755b6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17239, hash: 'dbc38718538a4e3f45a9803e59e841fbe2c75437fc4c60e3a30eb3d76bdf5cff', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-N35DQA47.css': {size: 9874, hash: 'ZbzMYIoqyyg', text: () => import('./assets-chunks/styles-N35DQA47_css.mjs').then(m => m.default)}
  },
};
