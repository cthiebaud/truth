module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,md,ico,png,jpg,jpeg,svg,mp3,json}',
    'dist/**/*.{css,js}'
  ],
  globIgnores: [
    "*.js",
    "**/node_modules/**/*",
    "QUICK-GUIDE-template.md",
    "material/**",
    "node_modules/**",
    "packages/**",
    "service-worker-src.js",
    "service-worker.js",
    "package*.*",
  ],
  swSrc: 'service-worker-src.js',
  swDest: 'service-worker.js',
};