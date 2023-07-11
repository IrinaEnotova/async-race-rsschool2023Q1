/* eslint-disable */

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
  entry: {
    main: path.resolve(__dirname, './src/index'),
  },
  mode: 'development',
  module: {
    rules: [
      // TS
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // CSS
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', 'json'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({
      extensions: 'ts',
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
