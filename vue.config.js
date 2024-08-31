const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://emsifa.github.io',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  }
})
