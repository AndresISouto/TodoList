//npm install --save-dev webpack webpack-cli
//npm install --save-dev style-loader css-loader
//npm install --save-dev html-webpack-plugin
//npm install --save-dev webpack-dev-server

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './build',
    hot: true,          // Enable Hot Module Replacement (HMR)
    liveReload: true,   // Auto-refresh the page on file changes
    open: true,         // Automatically open the browser
  },
  optimization: {
    runtimeChunk: 'single',
  },
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: __dirname + '/build',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Plantilla HTML personalizada
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
