module.exports = function (options) {
  // console.log('webpack options: ', options)
  return {
    ...options,
    mode: 'development',
    devtool: 'source-map',
    plugins: [...options.plugins],
  }
}
