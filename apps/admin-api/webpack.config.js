const path = require('node:path')

module.exports = function (options) {
  console.log('webpack options: ', options)
  return {
    ...options,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    plugins: [...options.plugins],
  }
}
