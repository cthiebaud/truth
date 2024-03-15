module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,md,ico,png,jpg,jpeg,svg,mp3}',
    'dist/**/*.{css,js}'
  ],
  globIgnores: [
    "*.js",
    "**/node_modules/**/*",
    "HOWTO-template.md",
    "material/**",
    "node_modules/**",
    "packages/**",
    "service-worker-src.js",
    "service-worker.js",
  ],
  swSrc: 'service-worker-src.js',
  swDest: 'service-worker.js',
};