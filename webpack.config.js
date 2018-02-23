const merge = require('webpack-merge');
const getBrowserConfig = require('./webpack/browser');
const getAotPlugin = require('./webpack/plugins/aot');
const server = require('./webpack/server');

module.exports = function (options, webpackOptions) {
  options = options || {};

  if (options.aot) {
    console.log(`Running build for ${options.browser ? 'browser' : 'server'} with AoT Compilation`)
  }

  let browserConfig =  merge({}, getBrowserConfig(webpackOptions.p), {
    plugins: [getAotPlugin('browser', !!options.aot)]
  });

  let serverConfig = merge({}, server, {
    entry: options.aot ? './src/main.server.aot.ts' : server.entry,
    plugins: [getAotPlugin('server', !!options.aot)]
  });

  const configs = [];
  if (!options.aot || options.browser) {
    configs.push(browserConfig);

  } else if (options.server) {
    configs.push(serverConfig);
  }

  return configs;
}
