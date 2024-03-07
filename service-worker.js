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
    { revision: '1cbc611d4088068fbc581ea4f8513ea4', url: 'assets/svg/android-svgrepo-com.svg' },
    { revision: '9467c2d0e30f439cd3724b9e7f46df50', url: 'assets/svg/Apple_logo_grey.svg' },
    { revision: 'fd7de01faf72d128e25a0e49c4d53c4d', url: 'assets/svg/github.svg' },
    { revision: '2272b2d03f9c93b5ea2de376922d4f09', url: 'assets/svg/greek_meander.svg' },
    { revision: '17bb52edd4aa8d620e56daf91f7b3063', url: 'assets/svg/internet-svgrepo-com.svg' },
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
    { revision: '0bc9b988d163d4b7c49d794642ddc1ec', url: 'HOWTO-template.md' },
    { revision: '47861a90958e47af796cc908799e869c', url: 'HOWTO.md' },
    { revision: '318f1210aabf904c588a8cbb2b30c571', url: 'icon.png' },
    { revision: '5ca35952e03f6b381dc92b93a4d1430a', url: 'icon2.png' },
    { revision: 'b27cee2506080f014256b14907cc6545', url: 'index.html' },
    { revision: '914dd9efa90f70224790ea5710dc31f3', url: 'README.md' },
    { revision: '116f32b33817a41a6dea393a7e96b96c', url: 'screenshots/1024x500-screenshot.png' },
    { revision: '4628442658184696eb42308be406a20d', url: 'screenshots/1280x800-screenshot.png' },
    { revision: '66b8f7519d6deda505b0f18f90e5394b', url: 'screenshots/750x1334-screenshot.png' },
    { revision: '41bb2eba0acba8024a642cbaa43580d9', url: 'screenshots/input.png' },
    { revision: '45eb09b3ce5070919576d363a5938c0a', url: 'screenshots/iPad10th.png' },
    { revision: '9b179f93bb00dfa436d3cb8d836ff1f4', url: 'screenshots/iPhone15.png' },
    { revision: 'abf15913f3920d1a68ae587e4b8e6226', url: 'screenshots/output.png' },
    { revision: 'edbb528afa3eb52ff0599a96e2b3af59', url: 'showdown.html' },
    { revision: 'c1b33840f34e1b2a1ec44725f90dd72a', url: 'dist/css/bootstrap.min.css' },
    { revision: '071e1cdd94af0aebad0eefbd19fe14a0', url: 'dist/css/index.min.css' },
    { revision: '476c9c641caca3b8fa3dcfe0a18e83a9', url: 'dist/css/timer.min.css' },
    { revision: '0a08a79b4a51df549d3899c972cdce07', url: 'dist/js/ColorsClass.min.js' },
    { revision: '698993ae29da7a69d622a7f45d9feb75', url: 'dist/js/SoundMachineClass.min.js' },
    { revision: 'a565cd491139c222f0575de62868e028', url: 'dist/js/TimerClass.min.js' },
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

//
