const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy(
      '**/company',
      {
        target: 'http://127.0.0.1:8080',
        headers: {
          Cookie: '',
        },
        secure: false,
        changeOrigin: true,
      })
  );
  app.use(
    proxy(
      '/api',
      {
        target: 'http://127.0.0.1:9000',
        headers: {
          Cookie: '',
        },
        secure: false,
        changeOrigin: true,
      })
  );
  app.use(
    proxy(
      '/nest',
      {
        target: 'http://127.0.0.1:3000',
        headers: {
          Cookie: '',
        },
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '/nest': '',
        },
      })
  );
};
