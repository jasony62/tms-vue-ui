const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/demo/',
  outputDir: '/public/demo',
  filenameHashing: true,
  pages: {
    index: {
      entry: 'demo/main.js',
      template: 'public/index.html',
      filename: './index.html',
      title: 'tms-vue-ui',
      chunks: ['index']
    }
  },
  parallel: require('os').cpus().length > 1,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('./'))
  }
}
