const sass = require('@stencil/sass');

exports.config = {
  nodeResolve: {
    browser: true
  },  
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js'
      }
    }
  ],
  globalScript: 'src/global/app.ts',  
  globalStyle: 'src/global/app.css',
  plugins: [
    sass()
  ],
  enableCache: false  
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
