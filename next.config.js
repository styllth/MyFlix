/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const isProd = process.env.NODE_ENV === 'production';
const withImages = require('next-images');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd,
  },
});

module.exports = withImages({
  esModule: true,
});
