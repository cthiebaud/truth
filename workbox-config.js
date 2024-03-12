module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,md,ico,png,jpg,jpeg,svg,mp3}',
    'dist/**/*.{css,js}'
  ],
  globIgnores: [
    "*.js",
    "**/node_modules/**/*",
    "assets/audio/sources/**",
    "audio-samples/**",
    "deprecated/**",
    "packages/**",
    "screenshots/**",
    "service-worker-src.js",
    "service-worker.js",
    "svg/**",
    "test/**",
    "video/**",
  ],
  swSrc: 'service-worker-src.js',
  swDest: 'service-worker.js',
};