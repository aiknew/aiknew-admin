const path = require('node:path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions

module.exports = function (options) {
  return {
    ...options,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    plugins: [...options.plugins, new ForkTsCheckerWebpackPlugin()],
    resolve: {
      ...options.resolve,
      extensions: ['.ts', '.js', '.json'],
      extensionAlias: {
        '.js': ['.ts', '.js'],
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: swcDefaultConfig,
          },
        },
      ],
    },
  }
}
