const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'To-Do List'
        return args
      })
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/Yingrsy/'
  : '/'
})
