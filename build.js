'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const inlineResources = require('./inline-resources');

const libName = require('./package.json').name;
const rootFolder = path.join(__dirname);
const compilationFolder = path.join(rootFolder, 'out-tsc');

const srcFolder = path.join(rootFolder, 'src/lib');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'lib');
const es5OutputFolder = path.join(compilationFolder, 'esm5');
const es2015OutputFolder = path.join(compilationFolder, 'esm2015');

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

// Copy files maintaining relative paths.
async function _relativeCopy(fileGlob, from, to) {
  const files = glob.sync(fileGlob, { cwd: from, nodir: true });
  files.forEach(file => {
    const origin = path.join(from, file);
    const dest = path.join(to, file);
    const data = fs.readFileSync(origin, 'utf-8');
    _recursiveMkDir(path.dirname(dest));
    fs.writeFileSync(dest, data);
  });
}

/** build html */
async function _html() {
  await _relativeCopy(`**/*`, srcFolder, tempLibFolder);
  await inlineResources(tempLibFolder);
}

/** build es2015 */
async function _es2015() {
  const exitCode = await ngc({ project: `${tempLibFolder}/tsconfig.lib.json` });
  await exitCode === 0 ? Promise.resolve() : Promise.reject();
}

/** build es5 */
async function _es5() {
  const exitCode = await ngc({ project: `${tempLibFolder}/tsconfig.es5.json` });
  await exitCode === 0 ? Promise.resolve() : Promise.reject();
}

/** build typings */
async function _typings() {
  await _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder);
  await _relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder);
}

/** build libs */
async function _libs() {
  const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
  const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);
  const rollupBaseConfig = {
    moduleName: camelCase(libName),
    sourceMap: true,
    globals: { '@angular/core': 'ng.core' },
    external: ['@angular/core'],
    plugins: [
      commonjs({ include: ['node_modules/rxjs/**'] }),
      sourcemaps(),
      nodeResolve({ jsnext: true, module: true })
    ]
  };

  // UMD bundle.
  const umdConfig = Object.assign({}, rollupBaseConfig, {
    entry: es5Entry,
    dest: path.join(distFolder, `bundles`, `${libName}.umd.js`),
    format: 'umd',
  });

  // Minified UMD bundle.
  const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
    entry: es5Entry,
    dest: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
    format: 'umd',
    plugins: rollupBaseConfig.plugins.concat([uglify({})])
  });

  // ESM+ES5 flat module bundle.
  const fesm5config = Object.assign({}, rollupBaseConfig, {
    entry: es5Entry,
    dest: path.join(distFolder, `${libName}.es5.js`),
    format: 'es'
  });

  // ESM+ES2015 flat module bundle.
  const fesm2015config = Object.assign({}, rollupBaseConfig, {
    entry: es2015Entry,
    dest: path.join(distFolder, `${libName}.js`),
    format: 'es'
  });

  return [umdConfig, minifiedUmdConfig, fesm5config, fesm2015config]
    .map(cfg => (await rollup.rollup(cfg)).write(cfg));
}

/**
 *
 */
async function _package() {
  await _relativeCopy('LICENSE', rootFolder, distFolder);
  await _relativeCopy('package.json', rootFolder, distFolder);
  await _relativeCopy('README.md', rootFolder, distFolder);
}

async function build() {
  await _html().then(() => console.log('Inlining succeeded.'));
  await _es2015().then(() => console.log('ES2015 compilation succeeded.'));
  await _es5().then(() => console.log('ES5 compilation succeeded.'));
  await _typings().then(() => console.log('Typings and metadata copy succeeded.'));
  await _libs().then(() => console.log('All bundles generated successfully.'));
  await _package().then(() => console.log('Package files copy succeeded.'));
}

build().catch(e => {
  console.error('\Build failed. See below for errors.\n');
  console.error(e);
  process.exit(1)
});
