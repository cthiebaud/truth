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
    { revision: '36c92c4620b5bee743d1ba9db44e74a6', url: 'dist/css/bootstrap.min.css' },
    { revision: '97d95ac1a689a6e2228cbbb26755bade', url: 'dist/css/index.min.css' },
    { revision: '2168745c011f8892c32530f12e16c0ce', url: 'dist/js/TimerClass.min.js' },
    { revision: '0bed2c3ec94b7e28b108df966750c091', url: 'favicon.ico' },
    { revision: '318f1210aabf904c588a8cbb2b30c571', url: 'icon.png' },
    { revision: 'f57da365a0e525d24e010a701fdc88bb', url: 'index.html' },
    { revision: '9a78d4bc8a15af00bd80e0f5796d02e5', url: 'packages/ios/com.cthiebaud.truth/next-steps.html' },
    { revision: 'bc1957f8b925088b05c47e7450f0440a', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/100.png' },
    { revision: '7469d046fa6bae8287e508f56c91773f', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/1024.png' },
    { revision: 'd4c57835f30d37eb0f79dc2d3af3e4ab', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/114.png' },
    { revision: '9d5a80d1cde917a668d50605448a9081', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/120.png' },
    { revision: '1c87ea681381c35e0f64948ccfa07bab', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/128.png' },
    { revision: '3432ca71fe53a236b13d295822eac7f9', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/144.png' },
    { revision: '096cea553d7a9df71fcbc16370ee3b5d', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/152.png' },
    { revision: '72bee953a3b3d4fb661f7dd8433f356b', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/16.png' },
    { revision: '75886b0ba8b5b4889b982d1583f02d3b', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/167.png' },
    { revision: 'bbc815ea26403416bb0f579b80417d34', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/180.png' },
    { revision: '87f79b3cc6bf9a7e5357be5270a4cb5e', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/192.png' },
    { revision: '90c35433d3859af829d68185454871e3', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/20.png' },
    { revision: 'dedadc560b1807c7ffb091e904bf769c', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/256.png' },
    { revision: '82462a58dd993e39d458136cf3b58c32', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/29.png' },
    { revision: '2eb299f34726a536dced1d962a23df21', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/32.png' },
    { revision: 'e5954c54cbfcd571eb00b7c05240e8be', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/40.png' },
    { revision: 'eb950e918abf199d79028beac94affab', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/50.png' },
    { revision: '7feeedb3b21958e682727c240324fe4c', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/512.png' },
    { revision: 'f2da0a881e28dfabfe44ea0df16b23e9', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/57.png' },
    { revision: '1e78d15fe23c1c5552ab9eec4a0c9941', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/58.png' },
    { revision: '50ab108243f3be47e60acd643ef30a97', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/60.png' },
    { revision: '593c49dde5e832ca77fee89fd32dc4d5', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/64.png' },
    { revision: '5835cd777584776296c61cbc11c5700c', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/72.png' },
    { revision: 'ffe93f54e74461a6b6c6e3cdf7923340', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/76.png' },
    { revision: '23ea68e4b992193195ab9b52931a9cc3', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/80.png' },
    { revision: 'f1a87a076a2e7c552417f48f5c561353', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/87.png' },
    { revision: 'c96b665c70adf913b899bd084f22eb39', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-128.png' },
    { revision: '6b33321c64d04f3c7b2ed9ff331702d5', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-128@2x.png' },
    { revision: 'df497992a7ab2e5037841042b00e5bef', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-16.png' },
    { revision: 'b7e3ab4151edcc599d0711e4d655f0dc', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-16@2x.png' },
    { revision: '6b33321c64d04f3c7b2ed9ff331702d5', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-256.png' },
    { revision: '5193e280dc041097791e9a057b6e5de6', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-256@2x.png' },
    { revision: 'b7e3ab4151edcc599d0711e4d655f0dc', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-32.png' },
    { revision: '292a4eafa22fdfae0059896a121f520b', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-32@2x.png' },
    { revision: '5193e280dc041097791e9a057b6e5de6', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-512.png' },
    { revision: '83826f6b8b0e9135b98b1c477c2b3965', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png' },
    { revision: '1c87ea681381c35e0f64948ccfa07bab', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/LaunchIcon.imageset/launch-128.png' },
    { revision: '87f79b3cc6bf9a7e5357be5270a4cb5e', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/LaunchIcon.imageset/launch-192.png' },
    { revision: 'dedadc560b1807c7ffb091e904bf769c', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/LaunchIcon.imageset/launch-256.png' },
    { revision: '7feeedb3b21958e682727c240324fe4c', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/LaunchIcon.imageset/launch-512.png' },
    { revision: '593c49dde5e832ca77fee89fd32dc4d5', url: 'packages/ios/com.cthiebaud.truth/src/Aletheia/Assets.xcassets/LaunchIcon.imageset/launch-64.png' },
    { revision: '1c87ea681381c35e0f64948ccfa07bab', url: 'packages/ios/com.cthiebaud.truth/src/launch-128.png' },
    { revision: '87f79b3cc6bf9a7e5357be5270a4cb5e', url: 'packages/ios/com.cthiebaud.truth/src/launch-192.png' },
    { revision: 'dedadc560b1807c7ffb091e904bf769c', url: 'packages/ios/com.cthiebaud.truth/src/launch-256.png' },
    { revision: '7feeedb3b21958e682727c240324fe4c', url: 'packages/ios/com.cthiebaud.truth/src/launch-512.png' },
    { revision: '593c49dde5e832ca77fee89fd32dc4d5', url: 'packages/ios/com.cthiebaud.truth/src/launch-64.png' },
    { revision: '4628442658184696eb42308be406a20d', url: 'screenshots/1280x800-screenshot.png' },
    { revision: '66b8f7519d6deda505b0f18f90e5394b', url: 'screenshots/750x1334-screenshot.png' },
    { revision: 'deafd520f5db6b1bd1c7c3adb91a7c10', url: 'src/css/index.css' },
    { revision: 'ac2e2657dd636a469d49c3384f36d861', url: 'src/js/TimerClass.js' },
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
