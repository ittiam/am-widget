var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var base = require('./webpack.base');
var utils = require('./utils');

module.exports = merge(base, {
  entry: './example/example.js',
  output: {
    path: path.resolve(__dirname, '../dist/example'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: utils.styleLoaders(false)
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    //progress: false,
    stats: { colors: true },
    proxy: {}
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // webpack 热替换插件
    // new webpack.HotModuleReplacementPlugin(),
    // 允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
      inject: true
    })
  ]
});
