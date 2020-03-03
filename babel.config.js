module.exports = {
  presets: [
    ['@babel/preset-env'],
    [
      '@vue/babel-preset-jsx',
      {
        injectH: true
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
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
