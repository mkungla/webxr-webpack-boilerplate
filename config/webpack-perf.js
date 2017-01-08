/**
 * Make webpack builds faster
 */
const webpack = require('webpack');
const path = require('path');
const vendorDir = path.resolve(process.cwd(), 'dist', 'vendors');

module.exports = {
  context: process.cwd(),
  devtool: 'eval',
  // Pass globals to webpack
  target: 'web',
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
  },
  entry: {
    vendors: [
      'babel-polyfill',
      './src/js/vendors.js'
    ],
  },
  output: {
    filename: '[name]-bundle.js',
    path: vendorDir,
    library: '[name]'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
    new webpack.DllPlugin({
      path: path.join(vendorDir, '[name].manifest.json'),
      name: '[name]',
    }),
  ],
  performance: {
    hints: false
  },
};
