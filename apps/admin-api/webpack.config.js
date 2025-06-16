module.exports = function (options) {
  console.log('webpack options: ', options)
  return {
    ...options,
    devtool: 'source-map',
    plugins: [...options.plugins],
  }
}
