const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpackEnv = require('./webpack.env.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './public/javascripts/entry.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()]
            }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist']), webpackEnv, new UglifyJsPlugin()]
};
