module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,md,ico,png,jpg,jpeg,svg,mp3,json}',
    'dist/**/*.{css,js}'
  ],
  globIgnores: [
    "*.js",
    "**/node_modules/**/*",
    "firebase/**",
    "material/**",
    "node_modules/**",
    "package*.*",
    "packages/**",
    "QUICK-GUIDE-template.md",
    "screenshots/**",
    "service-worker-src.js",
    "service-worker.js",
    "svg/**",
  ],
  swSrc: 'service-worker-src.js',
  swDest: 'service-worker.js',
};