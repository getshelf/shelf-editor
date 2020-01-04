const path = require('path')
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.common');

module.exports = merge.smart(common, {
  mode: 'development',
  entry: {
    ShelfEditor: path.resolve(__dirname, './src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ShelfEditor',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin()],
  externals: {
    react: 'react'
  },
  devServer: {
    port: 3001,
    historyApiFallback: true
  }
});