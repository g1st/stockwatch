const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackEnv = require('./webpack.env.js');

module.exports = {
  entry: {
    app: './public/javascripts/entry.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  plugins: [new CleanWebpackPlugin(['dist']), webpackEnv]
};
