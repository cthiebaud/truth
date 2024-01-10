module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,css,js,mp3}'
  ],
  "globIgnores": [
    "**/node_modules/**/*",
    "service-worker-src.js",
    "service-worker.js",
    "path/to/excluded/file.js",
    "assets/audio/sources/**",
    "test/**",
    "*.js",
  ],
  swSrc: 'service-worker-src.js',
  swDest: 'service-worker.js',
};