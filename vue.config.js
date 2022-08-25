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
  transpileDependencies: true,
  lintOnSave: false
})
