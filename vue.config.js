const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
          // additionalData: `
          // @import "@/assets/css/global.scss";
          // `,
          // globalVars: {
          //   white: "#dc3545"
          // }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    },
    name: 'PWA Sovthrone',
    shortName: 'App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      start_url: '/'
    }
  },
  lintOnSave: false
})
