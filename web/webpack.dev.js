const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: {
    /**
     * build js into several different js
     */
    'bundle.js': './src/assets/js/main.js',
    'coding/c-top.js': './src/assets/js/coding/c-top.js',
    'coding/c-page.js': './src/assets/js/coding/c-page.js',
  },
  output: {
    path: __dirname + '/../',
    filename: '[name]'
  },
  devtool: 'source-map',
  module: {
    rules: [{
        /**
         * set up babel to use async await
         */
        test: /\.js$/,
        // transpile
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.vue', '.json', 'scss', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      Promise: 'es6-promise',
      jQuery: 'jquery'
    })
  ],
}
