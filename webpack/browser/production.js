const { join } = require('path');
const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const { ModuleConcatenationPlugin } = require('webpack').optimize;
const { SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { PurifyPlugin } = require('@angular-devkit/build-optimizer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const resolveHtmlPlugin = require('../plugins/html');

module.exports = {
  output: {
    path: join(process.cwd(), 'docs/browser'),
    filename: '[name].[chunkhash:20].bundle.js',
    chunkFilename: '[id].[chunkhash:20].chunk.js',
  },
  plugins: [
    resolveHtmlPlugin(true),
    new ExtractTextPlugin('assets/css/[name].[contenthash:20].css'),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4
    }),
    new ModuleConcatenationPlugin({}),
    new PurifyPlugin(),
    new UglifyJsPlugin({
      test: /\.js$/i,
      extractComments: false,
      sourceMap: false,
      cache: false,
      parallel: false,
      uglifyOptions: {
        output: {
          ascii_only: true,
          comments: false,
          webkit: true
        },
        ecma: 5,
        warnings: false,
        ie8: false,
        mangle: {
          safari10: true
        },
        compress: {
          typeofs: false,
          pure_getters: true,
          passes: 3
        }
      }
    })
  ]
};
