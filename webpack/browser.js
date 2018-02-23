const merge = require('webpack-merge');
const rxPaths = require('rxjs/_esm5/path-mapping');

const common = require('./browser/common');
const development = require('./browser/development');
const production = require('./browser/production');

const base = {
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
    modules: ["./node_modules"],
    alias: rxPaths()
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['src', 'node_modules']
  }
}

module.exports = function (environments) {
  return merge(base, common, environments ? production : development);
}
