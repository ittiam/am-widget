var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var base = require('./webpack.base');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var utils = require('./utils');

module.exports = merge(base, {
  entry: './example/example.js',
  output: {
    path: path.resolve(__dirname, '../dist/example'),
    filename: '[name].js',
    publicPath: '/am-widget/'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: utils.styleLoaders(true)
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('style.css'),
    // webpack 热替换插件
    // new webpack.HotModuleReplacementPlugin(),
    // 允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
      inject: true
    })
  ]
});
