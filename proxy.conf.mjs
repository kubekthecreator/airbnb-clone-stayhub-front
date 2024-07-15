const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default [
  {
    context: ['/api', '/oauth2', '/login', '/assets'],
    target: BACKEND_URL,
    secure: true,
    changeOrigin: true
  }
];
