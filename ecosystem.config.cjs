module.exports = {
  apps: [{
    name: "matte-spel",
    script: "serve",
    env: {
      PM2_SERVE_PATH: './dist',
      PM2_SERVE_PORT: 3333,
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPAGE: '/index.html'
    }
  }]
} 