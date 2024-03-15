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
    { revision: '93e578190d5b4520816d7d2842e9976a', url: 'assets/audio/achilles-v9.mp3' },
    { revision: '852654ffdad5aac86bfdfddf2a416aaa', url: 'assets/audio/boo.mp3' },
    { revision: '018f56c4570fa54cf7b7391d4ac22ceb', url: 'assets/audio/boredom.mp3' },
    { revision: '20d2db44eeddc41588b5deff851261b3', url: 'assets/audio/coin.mp3' },
    { revision: '25e069da6a41c04a049f213379e2cf75', url: 'assets/audio/completed_with_errors.mp3' },
    { revision: 'f1dd1cb4cfd46d037f66c41034c71a9e', url: 'assets/audio/fail2.mp3' },
    { revision: '3f0b36e723915ddb6bc04971c216cbfd', url: 'assets/audio/gong.mp3' },
    { revision: '1aa0771f69d95112da4cbd0ca51acaff', url: 'assets/audio/guitar-riff.mp3' },
    { revision: '0c87074d4903946ffae4f1951b1f1fae', url: 'assets/audio/guitar-string-snap.mp3' },
    { revision: '748cffbaf98cd3325ab79bcc56bb8949', url: 'assets/audio/hare.mp3' },
    { revision: 'fc59b37ddc35017006068bcf30879daf', url: 'assets/audio/scary-riser-v2.mp3' },
    { revision: '51e5adb6686dd4494c62e0215bf63d66', url: 'assets/audio/short-whoosh.mp3' },
    { revision: '680e993dde5168775f0e7c0b5adf6d99', url: 'assets/audio/tada.mp3' },
    { revision: '607a87857f704bb0fab7447bc204e09e', url: 'assets/audio/ticking.mp3' },
    { revision: '17eeed991e17c12d3a1b4bf4799db708', url: 'assets/audio/underwater.mp3' },
    { revision: '2d61758262742f8dc77cef03f417ddb9', url: 'assets/png/apple-icon-180.png' },
    { revision: '87f79b3cc6bf9a7e5357be5270a4cb5e', url: 'assets/png/manifest-icon-192.maskable.png' },
    { revision: '7feeedb3b21958e682727c240324fe4c', url: 'assets/png/manifest-icon-512.maskable.png' },
    { revision: '1cbc611d4088068fbc581ea4f8513ea4', url: 'assets/svg/android-svgrepo-com.svg' },
    { revision: '9467c2d0e30f439cd3724b9e7f46df50', url: 'assets/svg/Apple_logo_grey.svg' },
    { revision: '73022281c145c46679c0b2647fc8a2ed', url: 'assets/svg/external-link-svgrepo-com.svg' },
    { revision: 'fd7de01faf72d128e25a0e49c4d53c4d', url: 'assets/svg/github.svg' },
    { revision: '2272b2d03f9c93b5ea2de376922d4f09', url: 'assets/svg/greek_meander.svg' },
    { revision: '17bb52edd4aa8d620e56daf91f7b3063', url: 'assets/svg/internet-svgrepo-com.svg' },
    { revision: 'be67bfff0c1a385130a0e3c01f6b9e75', url: 'assets/svg/shuffle.svg' },
    { revision: '8b8aa3dabe5a8d2aeaa74a3fc1cefd4c', url: "assets/svg/Wikipedia's_W.svg" },
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
    { revision: '477297aa0ecbbbc693b351d5cf618ffe', url: 'HOWTO-example.jpg' },
    { revision: '38e67bffc6eb961e28cb838ebc1e0e7d', url: 'HOWTO.md' },
    { revision: '1f4be059316ab321c26d62c4898e6a10', url: 'index.html' },
    { revision: 'f71183f9c2765686d958f50dcde1b55b', url: 'README.md' },
    { revision: '4160ab894c972df46bec1644c873cbed', url: 'screenshots/2024-03-12_2081×1560.jpg' },
    { revision: 'c7edb8f5f415b03f31c35c60bf4fa7d9', url: 'screenshots/2024-03-15_2313×1492.jpg' },
    { revision: '5a828ecec729c7f9b18b09245c0710b1', url: 'screenshots/iPad_2024-03-15_08-28-21_2224x1668.jpg' },
    { revision: 'ff1b40ee6c42fb747e9b0663c0ff483a', url: 'showdown.html' },
    { revision: '5c0d5fa774374d4d04cbffa433029500', url: 'svg/ancient-greek-helmet-1-svgrepo-com.svg' },
    { revision: '281d4fe45ac9142d20a54e7e0510a66f', url: 'svg/b-axes.svg' },
    { revision: '4b1ca1599eafde2a45e8c6519fd1006a', url: 'svg/b-grid.svg' },
    { revision: 'dd7bc3c326f855ee9aeae3e79a3fae9f', url: 'svg/b-group.svg' },
    { revision: '167318a8f1fb2208ad5671ac23a79769', url: 'svg/b-info.svg' },
    { revision: '8fc9b58476e7f8035b8faadbfb71e1e6', url: 'svg/b-shuffle.svg' },
    { revision: 'dd7bc3c326f855ee9aeae3e79a3fae9f', url: 'svg/b-sort.svg' },
    { revision: 'cd9cc207de595d2a6c627324195671ba', url: 'svg/b-start.svg' },
    { revision: 'b66a29afc49b2feab36f53473fe4c52d', url: 'svg/b-stop.svg' },
    { revision: '4dc6b7b643cd872ce0a1e0cc612fe251', url: 'svg/empty-set-mathematical-symbol-svgrepo-com.svg' },
    { revision: 'f6cca23e5529d336521b8b1dcecff544', url: 'svg/grid-dots-blank-svgrepo-com.svg' },
    { revision: '42aebf505c75e605b5369393453a6fd9', url: 'svg/hare-fill-svgrepo-com.svg' },
    { revision: '88c924171d8cff12df0091ef9fc270a1', url: 'svg/info-svgrepo-com.svg' },
    { revision: '90f63624f850b37fd78f30b59acada16', url: 'svg/replay-svgrepo-com.svg' },
    { revision: '6265318b781ebfd6c44790284fc1eea6', url: 'svg/tortoise-fill-svgrepo-com.svg' },
    { revision: '6235428fc4f442fd8aadaaba3f6e26d3', url: 'dist/css/bootstrap.min.css' },
    { revision: 'a1cd648780776162a9b8e10b6021b919', url: 'dist/css/index.min.css' },
    { revision: '0373d0a2c49b253c3bd232129592df01', url: 'dist/css/timer.min.css' },
    { revision: '96294d6952e58982411d496de65f3628', url: 'dist/js/ColorsClass.min.js' },
    { revision: 'fae6035bc0fd3ec5be29255ac74c86ae', url: 'dist/js/GameClass.min.js' },
    { revision: '6bc094f37699a9288bf99d70a7f5178c', url: 'dist/js/SoundMachineClass.min.js' },
    { revision: '1597d5c9aec92d9b41b09fb8821c9745', url: 'dist/js/TimerClass.min.js' },
    { revision: 'b162abaf7871ba19a471a1630615af82', url: 'dist/js/UtilsClass.min.js' },
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
