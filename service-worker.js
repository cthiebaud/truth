// Import Workbox and WorkboxSW
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js')

// Set Workbox log level
workbox.setConfig({ debug: false })

// Reusable plugin for fetchDidSucceed logic
const logFileFetchPlugin = {
  fetchDidSucceed: async ({ request, response, event, state }) => {
    console.log(`File fetched: ${request.url}, Source: ${response.source}`)
    return response
  },
}

if (workbox) {
  console.log('Workbox is loaded.')

  self.addEventListener('fetch', (event) => {
    // Log the URL of the fetch event
    console.log(`Fetch: ${event.request.url}`)
  })

  // Use __WB_MANIFEST for precaching with revision info
  workbox.precaching.cleanupOutdatedCaches()
  workbox.precaching.precacheAndRoute([
    { revision: '2d61758262742f8dc77cef03f417ddb9', url: 'assets/png/apple-icon-180.png' },
    { revision: '87f79b3cc6bf9a7e5357be5270a4cb5e', url: 'assets/png/manifest-icon-192.maskable.png' },
    { revision: '7feeedb3b21958e682727c240324fe4c', url: 'assets/png/manifest-icon-512.maskable.png' },
    { revision: 'f3b202987a20edbb5d12ec2ab847ecf8', url: 'assets/svg/bolt-fill-svgrepo-com.svg' },
    { revision: '42aebf505c75e605b5369393453a6fd9', url: 'assets/svg/hare-fill-svgrepo-com.svg' },
    { revision: '04cef8563f623959553e3127e0052d6f', url: 'assets/svg/info-circle-svgrepo-com.svg' },
    { revision: '88c924171d8cff12df0091ef9fc270a1', url: 'assets/svg/info-svgrepo-com.svg' },
    { revision: '6265318b781ebfd6c44790284fc1eea6', url: 'assets/svg/tortoise-fill-svgrepo-com.svg' },
    { revision: '5ff5f5c1ecf6b29ba270ddbd45ff3438', url: 'favicon.ico' },
    { revision: '24d8919bd7dd611d662dfe788e23af26', url: 'favicons/android-chrome-192x192.png' },
    { revision: '05478b6ad13cda31aabd5d38ccaab750', url: 'favicons/android-chrome-512x512.png' },
    { revision: '3a1fd2c7e91766ad52cb7772b1643eae', url: 'favicons/apple-touch-icon.png' },
    { revision: 'b2f13dbedc655731cdd1483b644ea2aa', url: 'favicons/favicon-16x16.png' },
    { revision: '72db21c3e6cc729ef65cb487436a15b2', url: 'favicons/favicon-32x32.png' },
    { revision: '5ff5f5c1ecf6b29ba270ddbd45ff3438', url: 'favicons/favicon.ico' },
    { revision: 'a68d90a8033fb52fa4f4cf66d0a91f82', url: 'favicons/html_code.html' },
    { revision: 'e7e93808bde4ceead0f0bb8727c817fa', url: 'favicons/mstile-150x150.png' },
    { revision: '2f7e34960fd437beaa92f3b04c5c3050', url: 'favicons/README.md' },
    { revision: 'c9ce66f4033637c701aba2c5f3ca112c', url: 'favicons/safari-pinned-tab.svg' },
    { revision: '318f1210aabf904c588a8cbb2b30c571', url: 'icon.png' },
    { revision: '5ca35952e03f6b381dc92b93a4d1430a', url: 'icon2.png' },
    { revision: 'c35d3849e15685e4bc84cfda0bfd1233', url: 'index.html' },
    { revision: 'b6e5ab5aa611f1689f0e3a12b5788be6', url: 'README.md' },
    { revision: '116f32b33817a41a6dea393a7e96b96c', url: 'screenshots/1024x500-screenshot.png' },
    { revision: '4628442658184696eb42308be406a20d', url: 'screenshots/1280x800-screenshot.png' },
    { revision: '66b8f7519d6deda505b0f18f90e5394b', url: 'screenshots/750x1334-screenshot.png' },
    { revision: '41bb2eba0acba8024a642cbaa43580d9', url: 'screenshots/input.png' },
    { revision: '45eb09b3ce5070919576d363a5938c0a', url: 'screenshots/iPad10th.png' },
    { revision: '9b179f93bb00dfa436d3cb8d836ff1f4', url: 'screenshots/iPhone15.png' },
    { revision: 'abf15913f3920d1a68ae587e4b8e6226', url: 'screenshots/output.png' },
    { revision: '489ccd911c8d7942f58d1fa93c31a52f', url: 'showdown.html' },
    { revision: 'e405292e9f23b5f89e2a3b0e1b57ddc9', url: 'dist/css/bootstrap.min.css' },
    { revision: 'e96e85200d1f32e6e773065ed63083fb', url: 'dist/css/index.min.css' },
    { revision: 'ffd71e86c0f3f69a0284362481f4bac2', url: 'dist/css/timer.min.css' },
    { revision: '0a4bb53fc9e29bed5696506ea866e54d', url: 'dist/js/TimerClass.min.js' },
    { revision: '6f9ad7cdeb0eb9bcc3c2cff03e9829cc', url: 'dist/js/TimerElement.min.js' },
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
        /* logFileFetchPlugin, */
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
    ({ url }) => {
      const isOK = url.origin === self.location.origin && /\.(mp3|png)$/.test(url.pathname)
      // console.log("local-assets?", isOK, url.pathname)
      return isOK
    },
    new workbox.strategies.CacheFirst({
      cacheName: 'local-assets',
      plugins: [
        /* logFileFetchPlugin, */
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    }),
  )
} else {
  console.error('Workbox could not be loaded. No offline support.')
}
