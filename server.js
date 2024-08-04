const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const DEFAULT_TARGET = 'https://airbnb-clone-stayhub-production.up.railway.app/';
const target = process.env.BACKEND_URL || DEFAULT_TARGET;

const proxyConfig = {
  target: target,
  secure: true,
  changeOrigin: true,
  protocolRewrite: 'https',
  headers: {
    'X-Forwarded-Proto': 'https',
  },
};

const proxyPaths = ['/api', '/oauth2', '/login', '/assets'];

proxyPaths.forEach(path => {
  app.use(path, createProxyMiddleware(proxyConfig));
});

// Middleware do przekierowania HTTP na HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

app.use(express.static(__dirname + "/dist/airbnb-clone-front/browser/"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/airbnb-clone-front/browser/index.html");
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
