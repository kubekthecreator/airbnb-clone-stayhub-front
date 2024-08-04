const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const proxyTable = {
  "/api": {
    target: process.env.BACKEND_URL || 'http://airbnb-clone-stayhub-production.up.railway.app/',
    secure: true,
    changeOrigin: true
  },
  "/oauth2": {
    target: process.env.BACKEND_URL || 'http://airbnb-clone-stayhub-production.up.railway.app/',
    secure: true,
    changeOrigin: true
  },
  "/login": {
    target: process.env.BACKEND_URL || 'http://airbnb-clone-stayhub-production.up.railway.app/',
    secure: true,
    changeOrigin: true
  },
  "/assets": {
    target: process.env.BACKEND_URL || 'http://airbnb-clone-stayhub-production.up.railway.app/',
    secure: true,
    changeOrigin: true
  }
};

Object.keys(proxyTable).forEach(context => {
  app.use(createProxyMiddleware(context, proxyTable[context]));
});

app.use(express.static(__dirname + "/dist/airbnb-clone-front/browser/"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/airbnb-clone-front/browser/index.html");
});

app.listen(process.env.PORT || 4200);
