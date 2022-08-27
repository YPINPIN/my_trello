const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')

environment.plugins.prepend('DefinePlugin', new webpack.DefinePlugin({
  // Drop Options API from bundle
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false
}))
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
module.exports = environment
