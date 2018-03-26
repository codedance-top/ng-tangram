const path = require('path');

// angular
const { AngularCompilerPlugin, PLATFORM } = require('@ngtools/webpack');
// const nodeResolve = require('rollup-plugin-node-resolve');
// const commonjs = require('rollup-plugin-commonjs');

const tsconfigs = {
  browser: path.join(process.cwd(), 'src/tsconfig.app.json'),
  server: path.join(process.cwd(), 'src/tsconfig.server.json')
};

/**
 * Generates a AotPlugin for @ngtools/webpack
 *
 * @param {string} platform Should either be browser or server
 * @param {boolean} aot Enables/Disables AoT Compilation
 * @returns {AotPlugin} Configuration of AotPlugin
 */
module.exports = function (platform, aot) {
  return new AngularCompilerPlugin({
    tsConfigPath: tsconfigs[platform],
    platform: platform === 'browser' ? PLATFORM.Browser : PLATFORM.Server,
    hostReplacementPaths: {
      'environments/environment.ts': aot
        ? 'environments/environment.prod.ts'
        : 'environments/environment.ts'
    },
    skipCodeGeneration: !aot,
    // plugins: [
    //   nodeResolve({ jsnext: true, module: true }),
    //   commonjs({ include: 'node_modules/rxjs/**' })
    // ]
  });
}
