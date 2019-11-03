module.exports = {
  presets: [['@babel/preset-env'], ['@vue/babel-preset-jsx']],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
}
