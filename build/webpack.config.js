var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.base');
var merge = require('webpack-merge');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
  output: {
    filename: 'am-widget.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new UglifyJSPlugin()
  ]
});
