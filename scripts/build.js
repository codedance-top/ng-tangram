const { join } = require('path');
const ngc = require('@angular/compiler-cli/src/main').main;
const ngFsUtils = require('@angular/compiler-cli/src/ngtsc/file_system');
// const camelCase = require('camelcase');

const rollup = require('rollup');
const { uglify } = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const components = require('../src/libs/components/build.config.json');
const markdown = require('../src/libs/markdown/build.config.json');
const markdownEditor = require('../src/libs/markdown-editor/build.config.json');
const momentDateAdapter = require('../src/libs/moment-adapter/build.config.json');

ngFsUtils.setFileSystem(new ngFsUtils.NodeJSFileSystem());

const BASE_CONFIG_INPUT = {
  external: id =>
    /^(@angular)/.test(id) ||
    /^(@ng-tangram)/.test(id) ||
    /^(rxjs)/.test(id) ||
    /^(marked)/.test(id) ||
    /^(moment)/.test(id) ||
    /^(codemirror)/.test(id) ||
    /^(prismjs)/.test(id)
  ,
  plugins: [
    commonjs({ include: [ 'node_modules/blueimp-load-image/**' ]}),
    sourcemaps(),
    nodeResolve({ mainFields: ['browser', 'es2015', 'module', 'jsnext:main', 'main'] })
  ],
}

const BASE_CONFIG_OUTPUT = {
  globals: {
    '@angular/animations': 'ng.animations',
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    '@angular/common': 'ng.common',
    '@angular/common/http': 'ng.common.http',
    '@angular/cdk': 'ng.cdk',
    '@angular/cdk/a11y': 'ng.cdk.a11y',
    '@angular/cdk/bidi': 'ng.cdk.bidi',
    '@angular/cdk/coercion': 'ng.cdk.coercion',
    '@angular/cdk/platform': 'ng.cdk.platform',
    '@angular/cdk/observers': 'ng.cdk.observers',
    '@angular/cdk/overlay': 'ng.cdk.overlay',
    '@angular/cdk/collections': 'ng.cdk.collections',
    '@angular/cdk/portal': 'ng.cdk.portal',
    '@angular/cdk/keycodes': 'ng.cdk.keycodes',
    '@angular/cdk/table': 'ng.cdk.table',
    '@angular/cdk/tree': 'ng.cdk.tree',
    'marked': 'marked',
    'prismjs': 'Prism',
    'codemirror': 'CodeMirror',
    'moment': 'moment',
    'rxjs': 'Rx',
    'rxjs/operators': 'Rx.operators',
    ...components.globals,
    ...markdown.globals,
    ...markdownEditor.globals,
    ...momentDateAdapter.globals
  },
  sourcemap: true
};

module.exports = {};

/** build libs */
module.exports.rollup = async function (name, fullName, es5Entry, es2015Entry, distFolder) {

  const inputBaseConfig = {
    ...BASE_CONFIG_INPUT
  };

  const outputBaseConfig = {
    name: fullName,
    ...BASE_CONFIG_OUTPUT
  };

  // UMD bundle.
  const umdConfig = {
    // inputOption: {
      ...inputBaseConfig,
      input: es5Entry,
    // },
    output: [{
      ...outputBaseConfig,
      // dir: join(distFolder, `bundles`),
      file: join(distFolder, `bundles`, `${name}.umd.js`),
      format: 'umd'
    }]
  };

  // Minified UMD bundle.
  const minifiedUmdConfig = {
    // inputOption: {
      ...inputBaseConfig,
      input: es5Entry,
      plugins: inputBaseConfig.plugins.concat([uglify({})]),
    // },
    output: [{
      ...outputBaseConfig,
      // dir: join(distFolder, `bundles`),
      file: join(distFolder, `bundles`, `${name}.umd.min.js`),
      format: 'umd'
    }]
  };

  // ESM+ES5 flat module bundle.
  const esm5Config = {
    // inputOption: {
      ...inputBaseConfig,
      input: es5Entry,
    // },
    output: [{
      ...outputBaseConfig,
      // dir: join(distFolder, `esm5`),
      file: join(distFolder, `esm5`, `${name}.js`),
      format: 'esm'
    }]
  };

  // ESM+ES2015 flat module bundle.
  const esm2015Config = {
    // inputOption: {
      ...inputBaseConfig,
      input: es2015Entry,
    // },
    output: [{
      ...outputBaseConfig,
      // dir: join(distFolder, `esm2015`),
      file: join(distFolder, `esm2015`, `${name}.js`),
      format: 'esm'
    }]
  };

  // console.log(umdConfig);

  return [umdConfig].map(async cfg => {
  // return [umdConfig, minifiedUmdConfig, esm5Config, esm2015Config].map(async cfg => {
    const bundle = await rollup.rollup(cfg).catch(e => console.log('@ng-tamgram: Rollup Error ', e));
    // const { code, map } = await bundle.generate(cfg.output);
    // console.log(code);
    // console.log(map);
    await bundle.write(cfg.output).catch(e => console.log(e));
  });
};

/** build es2015 */
module.exports.esm2015 = async function (tsConfig) {
  const exitCode = ngc(['-p', tsConfig]);
  exitCode === 0 ? Promise.resolve() : Promise.reject();
}

/** build es5 */
module.exports.esm5 = async function (tsConfig, outDir) {
  const exitCode = ngc(['-p', tsConfig, '--target', 'es5', '-d', 'false', '--outDir', outDir]);
  exitCode === 0 ? Promise.resolve() : Promise.reject();
}
