const { resolve } = require('path');
const package = require('./package.json');

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  srcDir: resolve(__dirname, './client'),
  router: { middleware: ['auth'] },
  env: { apiURL: process.env.API_URL || 'http://localhost:3000' },
  head: {
    title: `${package.name} — ${package.description}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans|Roboto|Material+Icons' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.8/css/all.css' },
    ],
    script: [
      { src: 'https://www.paypal.com/sdk/js?client-id=AeZgg-XoLfSbdrVeRnEz1aSGatzYfnYwGWGuWydxIp-ik2Wl4Y433qnUeE77hf92vR_x6bJyRbG02dPY' }
    ]
  },
  plugins: ['~plugins/material-kit'],
  build: {
    cache: true
  }
};
