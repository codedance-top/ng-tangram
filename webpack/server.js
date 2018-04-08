



const { join } = require('path');
const { NoEmitOnErrorsPlugin } = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { ModuleConcatenationPlugin } = require('webpack').optimize;

const primaryRules = require('./rules/primary');
const stylesRules = require('./rules/styles');
const markdownRules = require('./rules/markdown');

const rxPaths = require('rxjs/_esm5/path-mapping');

const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: join(process.cwd(), 'src/main.server.ts'),
  output: {
    path: join(process.cwd(), 'docs/server'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
    modules: ["./node_modules"],
    alias: rxPaths()
  },
  // externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['src/', 'node_modules']
  },
  target: 'node',
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
      onDetected: false,
      cwd: process.cwd()
    })
  ],
  module: {
    rules: primaryRules.concat(stylesRules, markdownRules)
  }
}
