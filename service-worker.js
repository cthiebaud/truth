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
    { revision: '88672ff7468ab7128f6f241f3b31fbc1', url: 'HOWTO.md' },
    { revision: '55672ef0cb30725c4df6767224c0f19c', url: 'index.html' },
    { revision: '02440bcd5232fb4e2042076554a0a66a', url: 'material/audio-samples/030942_guitar-string-snap-or-breaks-64092.mp3' },
    { revision: '0f0cc31686da34e5ba35eeeaaee80061', url: 'material/audio-samples/045189_scary-hits-amp-risers-003-66508.mp3' },
    { revision: 'cf0aabcdac865bb028523d3104d29e2e', url: 'material/audio-samples/as092866-boredom-26105.mp3' },
    { revision: '9a223fc7323329217a1b35f8c6d1d508', url: 'material/audio-samples/brass-fail-1-b-185075.mp3' },
    { revision: 'ee7205992a3c3e9917925beabe9cf007', url: 'material/audio-samples/deathmagic-94937.mp3' },
    { revision: 'ddb4d662d410d1a4a1860824c03e7325', url: 'material/audio-samples/digital-ui-buttons-errors-switches-sounds-gs-26360.mp3' },
    { revision: 'e27c07a43ac562a7cc3cb4d79fd83d24', url: 'material/audio-samples/guitar-riff-159089.mp3' },
    { revision: '36cf51dac7e19054c8d7f43697a6fe0a', url: 'material/audio-samples/horn1-142917.mp3' },
    { revision: 'cefb13574152baec7216afcd3498ba70', url: 'material/audio-samples/impact-riser-01-6908.mp3' },
    { revision: 'cdb882d02708bc57f9b54abb36c13039', url: 'material/audio-samples/mmm-93420.mp3' },
    { revision: '0f4107bf32abb93734fed89191992883', url: 'material/audio-samples/opening-and-closing-creaky-door-30907.mp3' },
    { revision: '639615b69b6fd7515c5593e8ee0353a6', url: 'material/audio-samples/paiste-gong-75913.mp3' },
    { revision: '63d484828f325874e0244a820002b6d2', url: 'material/audio-samples/riser-simple-moombah-cinematic-trailer-sound-effects-125409.mp3' },
    { revision: '2975819d53feaebc11557d929a3d3cc6', url: 'material/audio-samples/sad-trumpet-46384.mp3' },
    { revision: 'ee8563b9bf959d645518e9a1ae6bce74', url: 'material/audio-samples/short-whoosh-13x-14526.mp3' },
    { revision: '6d8b874b112f8cc3323eda27ba8e9e4e', url: 'material/audio-samples/silly-trumpet-11-187806.mp3' },
    { revision: 'fa140a7618b6d56970bd4739f772d268', url: 'material/audio-samples/slide-projector-with-ventilation-field-recording-23099.mp3' },
    { revision: '75e2f2691f4ea204ae0e419c5c76f235', url: 'material/audio-samples/small-crowd-reactions-6977.mp3' },
    { revision: 'db407b8775a64190cb44dd10be096a97', url: 'material/audio-samples/sound-effects-finger-snap-with-reverb-113861.mp3' },
    { revision: '5323c20f30f9dc32bbc6eaf3fd56047d', url: 'material/audio-samples/trumpet-chorus-79379.mp3' },
    { revision: '17eeed991e17c12d3a1b4bf4799db708', url: 'material/audio-samples/underwater-white-noise-46423.mp3' },
    { revision: 'e061398e98da826b8504f1a9fe4560be', url: 'material/deprecated/achilles-v2.mp3' },
    { revision: '48a434b3bc58251aef384b43a3d0dbbc', url: 'material/deprecated/achilles-v3.mp3' },
    { revision: '0fe85003b1af9a16d8694f97819b7cb4', url: 'material/deprecated/achilles-v4.mp3' },
    { revision: 'ff2d21a59f5325bb4464a0331e77d183', url: 'material/deprecated/achilles-v5.mp3' },
    { revision: 'ff5751d3baa4725b03ec05c98f5a8f37', url: 'material/deprecated/achilles.mp3' },
    { revision: 'be4df086684af2e99a4e66b8066f25cd', url: 'material/deprecated/audio/laughs.mp3' },
    { revision: 'eb2448eadc5feeddb91aa2a67ff68479', url: 'material/deprecated/audio/oops.mp3' },
    { revision: 'cb55dc5969de0bb3525c8cb30c68b90f', url: 'material/deprecated/audio/solaris-riser.mp3' },
    { revision: 'fe9b4e6d2fcbfaccaddeba06c7a0f8e9', url: 'material/deprecated/audio/warrior-with-riser.mp3' },
    { revision: 'ff9ba2538bcb85730f34d2ad52466eb6', url: 'material/firebase/index.html' },
    { revision: '318f1210aabf904c588a8cbb2b30c571', url: 'material/icon.png' },
    { revision: '5ca35952e03f6b381dc92b93a4d1430a', url: 'material/icon2.png' },
    { revision: '341a6c4f657ec799b29b514b65ba8eee', url: 'material/music/achilles - 14:03:24, 07.20.mp3' },
    { revision: 'c4a6bb5679417671f3333c07d7cf8e13', url: 'material/music/achilles-v6.mp3' },
    { revision: 'c0ca48b529c300122f8b51450e2af8a6', url: 'material/music/achilles-v7.mp3' },
    { revision: 'f400b2b28eeeb539954d2b164f8e6b20', url: 'material/music/achilles-v8.mp3' },
    { revision: '6dd7d046b342669d2083d7e634d01bc1', url: 'material/music/GarageBand/achilles.band/Alternatives/000/WindowImage.jpg' },
    { revision: '3048bc4c8f290021ed0d146ef331b2d0', url: 'material/music/GarageBand/hare.band/Alternatives/000/WindowImage.jpg' },
    { revision: 'eca20eefda42fb14af09353a591f840b', url: 'material/music/warrior - 07:03:24, 11.46.mp3' },
    { revision: '116f32b33817a41a6dea393a7e96b96c', url: 'material/screenshots/1024x500-screenshot.png' },
    { revision: '4628442658184696eb42308be406a20d', url: 'material/screenshots/1280x800-screenshot.png' },
    { revision: '062071b0d29c23a574d4e048efa783cd', url: 'material/screenshots/2024_03_09-1824x1824.jpg' },
    { revision: '950a5d8899c143066dd166bcfd0ae43e', url: 'material/screenshots/2024_03_12-2322×1826.jpg' },
    { revision: '4160ab894c972df46bec1644c873cbed', url: 'material/screenshots/2024-03-12_2081×1560.jpg' },
    { revision: '66b8f7519d6deda505b0f18f90e5394b', url: 'material/screenshots/750x1334-screenshot.png' },
    { revision: 'cc74a98cf8bc463011e13a7894704a5d', url: 'material/screenshots/icon2.jpg' },
    { revision: '41bb2eba0acba8024a642cbaa43580d9', url: 'material/screenshots/input.png' },
    { revision: '45eb09b3ce5070919576d363a5938c0a', url: 'material/screenshots/iPad10th.png' },
    { revision: '9b179f93bb00dfa436d3cb8d836ff1f4', url: 'material/screenshots/iPhone15.png' },
    { revision: 'abf15913f3920d1a68ae587e4b8e6226', url: 'material/screenshots/output.png' },
    { revision: '2a38638f56015fe63fe08ddfaccfb307', url: 'material/screenshots/truth8-1024.jpg' },
    { revision: '7382502c7d40c93cff87d150ce8ecceb', url: 'material/screenshots/truth8-1800.jpg' },
    { revision: '5c0d5fa774374d4d04cbffa433029500', url: 'material/svg/ancient-greek-helmet-1-svgrepo-com.svg' },
    { revision: '281d4fe45ac9142d20a54e7e0510a66f', url: 'material/svg/b-axes.svg' },
    { revision: '4b1ca1599eafde2a45e8c6519fd1006a', url: 'material/svg/b-grid.svg' },
    { revision: 'dd7bc3c326f855ee9aeae3e79a3fae9f', url: 'material/svg/b-group.svg' },
    { revision: '167318a8f1fb2208ad5671ac23a79769', url: 'material/svg/b-info.svg' },
    { revision: '8fc9b58476e7f8035b8faadbfb71e1e6', url: 'material/svg/b-shuffle.svg' },
    { revision: 'dd7bc3c326f855ee9aeae3e79a3fae9f', url: 'material/svg/b-sort.svg' },
    { revision: 'cd9cc207de595d2a6c627324195671ba', url: 'material/svg/b-start.svg' },
    { revision: 'b66a29afc49b2feab36f53473fe4c52d', url: 'material/svg/b-stop.svg' },
    { revision: '4dc6b7b643cd872ce0a1e0cc612fe251', url: 'material/svg/empty-set-mathematical-symbol-svgrepo-com.svg' },
    { revision: 'f6cca23e5529d336521b8b1dcecff544', url: 'material/svg/grid-dots-blank-svgrepo-com.svg' },
    { revision: '42aebf505c75e605b5369393453a6fd9', url: 'material/svg/hare-fill-svgrepo-com.svg' },
    { revision: '88c924171d8cff12df0091ef9fc270a1', url: 'material/svg/info-svgrepo-com.svg' },
    { revision: '90f63624f850b37fd78f30b59acada16', url: 'material/svg/replay-svgrepo-com.svg' },
    { revision: '6265318b781ebfd6c44790284fc1eea6', url: 'material/svg/tortoise-fill-svgrepo-com.svg' },
    { revision: '6931544de8c3e353bee3122e16526dc1', url: 'material/test/jsx.html' },
    { revision: '12be55e22542808e37c3600cc997b04c', url: 'material/test/swipe/about.html' },
    { revision: 'e104de156a1eb00cb9f56b568970cf02', url: 'material/test/swipe/index.html' },
    { revision: 'adafe87a94cc9e5770815ea985b00409', url: 'material/test/test.html' },
    { revision: 'df7846a90aa85a5cdcd4c13c355d18b6', url: 'material/test/timer.html' },
    { revision: '85ba758b3332c1955981b3d03f916dc2', url: 'material/video/moi.jpg' },
    { revision: '4613c58442fa804bd2284d80e1d1d30b', url: 'README.md' },
    { revision: 'ff1b40ee6c42fb747e9b0663c0ff483a', url: 'showdown.html' },
    { revision: '6235428fc4f442fd8aadaaba3f6e26d3', url: 'dist/css/bootstrap.min.css' },
    { revision: '90a68fd4b1802815d732e3cdccbb1a46', url: 'dist/css/index.min.css' },
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
