const PROXY_CONFIG = [
  {
    context: ['/api', '/oauth2', '/login', '/assets'],
    target: process.env.BACKEND_URL || 'http://localhost:8080',
    secure: true
  }
];

module.exports = PROXY_CONFIG;
