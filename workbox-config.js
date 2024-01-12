module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,css,js,ico,png}'
  ],
  "globIgnores": [
    "**/node_modules/**/*",
    "service-worker-src.js",
    "service-worker.js",
    "assets/audio/sources/**",
    "test/**",
    "*.js",
  ],
  swSrc: 'service-worker-src.js',
  swDest: 'service-worker.js',
};