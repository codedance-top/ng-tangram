const ngc = require('@angular/compiler-cli/src/main').main;
const camelCase = require('camelcase');

const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

exports = async function (project) {
  const exitCode = await ngc({ project });
  await exitCode === 0 ? Promise.resolve() : Promise.reject();
};

exports.rollup = async function (config) {
  const rollupBaseConfig = {
    moduleName: camelCase(config.libName),
    sourceMap: true,
    globals: { '@angular/core': 'ng.core' },
    external: ['@angular/core'],
    plugins: [
      commonjs({ include: ['node_modules/rxjs/**'] }),
      sourcemaps(),
      nodeResolve({ jsnext: true, module: true })
    ]
  };
}
