module.exports = {
    launch: {
        headless: true,
        // slowMo: 100,
    },
    server: {
        command: 'npm run serve --config stencil.config.e2e.js --no-open',
        // command: 'npm run serve --config stencil.config.e2e.js',
      },    
  }