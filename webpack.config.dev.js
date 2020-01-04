const path = require('path')
// const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = merge.smart(common, {
  mode: 'development',
  entry: {
    app: './src/demo.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[hash].js',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  devServer: {
    port: 3001,
    historyApiFallback: true
  }
})

module.exports = config;