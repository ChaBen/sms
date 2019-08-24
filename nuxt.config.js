const { resolve } = require('path');

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  srcDir: resolve(__dirname, './client'),
  router: { middleware: ['auth', 'i18n'] },
  env: { apiURL: process.env.API_URL || 'http://127.0.0.1:3000' },
  head: {
    title: 'Canada Free SMS - System-Online Receive SMS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans|Roboto|Material+Icons' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.8/css/all.css' }
    ],
    script: [
      { src: 'https://www.paypal.com/sdk/js?client-id=AeZgg-XoLfSbdrVeRnEz1aSGatzYfnYwGWGuWydxIp-ik2Wl4Y433qnUeE77hf92vR_x6bJyRbG02dPY' }
    ]
  },
  loading: '~/components/Loading.vue',
  plugins: [
    '~plugins/material-kit',
    '~plugins/i18n',
    { src: '~plugins/localStorage.js', ssr: false }
  ],
  modules: [
    'nuxt-client-init-module'
  ],
  build: {
    cache: true
  }
};
