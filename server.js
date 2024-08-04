const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

const apiProxy = proxy.createProxyMiddleware("/api", {
    target: process.env.BACKEND_URL || 'https://airbnb-clone-stayhub-production.up.railway.app/',
    changeOrigin: true
});
app.use(apiProxy);
app.use(express.static(__dirname + "/dist/airbnb-clone-front/"));

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/dist/airbnb-clone-front/browser/index.html")
});

app.listen(process.env.PORT || 3000);
