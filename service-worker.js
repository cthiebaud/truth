// Import Workbox and WorkboxSW
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js')

// Set Workbox log level
workbox.setConfig({ debug: false })

if (workbox) {
  console.log('Workbox is loaded.')

  // Use __WB_MANIFEST for precaching with revision info
  workbox.precaching.cleanupOutdatedCaches()
  workbox.precaching.precacheAndRoute([
    { revision: '852654ffdad5aac86bfdfddf2a416aaa', url: 'assets/audio/boo.mp3' },
    { revision: '20d2db44eeddc41588b5deff851261b3', url: 'assets/audio/coin.mp3' },
    { revision: '25e069da6a41c04a049f213379e2cf75', url: 'assets/audio/completed_with_errors.mp3' },
    { revision: '9a74a10be602e2c7e109d45ae11fd297', url: 'assets/audio/fail.mp3' },
    { revision: '13c6f4581b6e10d4359e6956781a9f8d', url: 'assets/audio/laughs-lower.mp3' },
    { revision: 'be4df086684af2e99a4e66b8066f25cd', url: 'assets/audio/laughs.mp3' },
    { revision: '680e993dde5168775f0e7c0b5adf6d99', url: 'assets/audio/tada.mp3' },
    { revision: '607a87857f704bb0fab7447bc204e09e', url: 'assets/audio/ticking.mp3' },
    { revision: '49185ae4ed1cace707f6bc3fa72840c0', url: 'dist/css/bootstrap.min.css' },
    { revision: '698806af8d2b9cbb382718bc75a7e34c', url: 'dist/css/index.min.css' },
    { revision: '6c5d735ac46c27126596d4feeb736525', url: 'dist/js/TimerClass.min.js' },
    { revision: 'a394f5f6f67bc4e0c8d39c486f27c617', url: 'index.html' },
    { revision: '898fde52688367ffdecdb2a58bdb24f2', url: 'src/css/index.css' },
    { revision: '01b669072b1d08df0e0222e00a2c4c9c', url: 'src/js/debounce.js' },
    { revision: 'fdf2b55625a6afc2a979641c3e2c78be', url: 'src/js/TimerClass.js' },
  ])

  // Cache Google Fonts with a stale-while-revalidate strategy
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    }),
  )

  // Cache Bootstrap CSS with a stale-while-revalidate strategy
  workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.2\/dist\/css\/bootstrap\.min\.css/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'bootstrap-css',
    }),
  )

  // Cache other CDN resources with a cache-first strategy
  workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net/,
    new workbox.strategies.CacheFirst({
      cacheName: 'cdn-assets',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        }),
      ],
    }),
  )

  // Cache local assets with a cache-first strategy
  workbox.routing.registerRoute(
    ({ url }) => url.origin === self.location.origin && /\.(mp3|png)$/.test(url.pathname),
    new workbox.strategies.CacheFirst({
      cacheName: 'local-assets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    }),
  )
} else {
  console.error('Workbox could not be loaded. No offline support.')
}
