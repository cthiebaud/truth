module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,md,ico,png,svg}',
    'dist/**/*.{css,js}'
  ],
  globIgnores: [
    "**/node_modules/**/*",
    "service-worker-src.js",
    "service-worker.js",
    "assets/audio/sources/**",
    "test/**",
    "packages/**",
    "*.js",
  ],
  swSrc: 'service-worker-src.js',
  swDest: 'service-worker.js',
};