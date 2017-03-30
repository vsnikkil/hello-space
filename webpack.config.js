const webpack = require('webpack')
const { resolve } = require('path')

const config = {
  context: resolve('./src'),
  entry: {
    js: resolve('./src'),
    vendor: ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    path: resolve('./release'),
    filename: 'client-bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js?$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'stage-3', 'latest']
          }
        }
      },
      {
        test: /.html$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-bundle.js'
    })
  ]
}

module.exports = config

