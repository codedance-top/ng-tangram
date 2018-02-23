const { join } = require('path');

const { NoEmitOnErrorsPlugin } = require('webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');

const ScriptExtPlugin = require('script-ext-html-webpack-plugin');

const rules = require('../rules');

module.exports = {
  entry: {
    main: join(process.cwd(), 'src/main.ts'),
    polyfills: join(process.cwd(), 'src/polyfills.ts'),
  },
  target: 'web',
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
      onDetected: false,
      cwd: process.cwd()
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      name: ['inline'],
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: ['main'],
      minChunks: 2,
      async: 'common'
    }),
    new ScriptExtPlugin({
      defaultAttribute: 'defer'
    })
  ],
  module: {
    rules: rules
  }
}
