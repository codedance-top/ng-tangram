/**
 * @ng-tangram 打包脚本
 * 打包格式遵循 Angular Package Format (APF) v5
 * link: https://docs.google.com/document/d/1tdgcvdLKsYPHlgNBppGFrsaA1eINLxJi9C8KkyrH2sI/edit#heading=h.k0mh3o8u5hx
 */
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

const inlineResources = require('./build-scripts/inline-resources');

const packageName = require('./src/libs/animate/package.json').name;
const rootFolder = path.join(__dirname);

const compilationFolder = path.join(rootFolder, 'out-tsc/@ng-tangram/animate');

const srcFolder = path.join(rootFolder, 'src/libs/animate');
const distFolder = path.join(rootFolder, 'dist/@ng-tangram/animate');

const tempLibFolder = path.join(compilationFolder, '');

const es5OutputFolder = path.join(compilationFolder, 'esm5');
const es2015OutputFolder = path.join(compilationFolder, 'esm2015');

// const fes5OutputFolder = path.join(compilationFolder, 'fesm5');
// const fes2015OutputFolder = path.join(compilationFolder, 'fesm2015');

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

// Copy files maintaining relative paths.
async function _relativeCopy(fileGlob, from, to) {
  const files = glob.sync(fileGlob, {
    cwd: from,
    nodir: true
  });
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
  const exitCode = ngc([
    '-p', `${tempLibFolder}/tsconfig-build.json`,
    '--outDir', es2015OutputFolder,
    '-d', 'false',
  ]);
  await exitCode === 0 ? Promise.resolve() : Promise.reject();
}

/** build es5 */
async function _es5() {
  const exitCode = ngc([
    '-p', `${tempLibFolder}/tsconfig-build.json`,
    '--target', 'es5',
    '--outDir', es5OutputFolder,
    '-d', 'false',
  ]);
  await exitCode === 0 ? Promise.resolve() : Promise.reject();
}

/** build typings */
async function _typings() {
  return [
    _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder),
    _relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder)
  ];
}

/** build libs */
async function _libs() {

  const libName = packageName.replace('@ng-tangram/', '');

  const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
  const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);

  const inputBaseConfig = {
    external: id => /^@angular/.test(id),
    plugins: [
      commonjs({ include: ['node_modules/rxjs/**'] }),
      sourcemaps(),
      nodeResolve({ jsnext: true, module: true })
    ]
  };

  const outputBaseConfig = {
    name: packageName,
    globals: {
      '@angular/animations': 'ng.animations',
      '@angular/core': 'ng.core',
      '@angular/forms': 'ng.forms',
      '@angular/common': 'ng.common',
      '@angular/cdk': 'ng.cdk'
    },
    sourcemap: true,
  };

  // UMD bundle.
  const umdConfig = {
    input: {
      ...inputBaseConfig,
      input: es5Entry,
    },
    output: {
      ...outputBaseConfig,
      file: path.join(distFolder, `bundles`, `${libName}.umd.js`),
      format: 'umd'
    }
  };

  // Minified UMD bundle.
  const minifiedUmdConfig = {
    input: {
      ...inputBaseConfig,
      input: es5Entry,
      plugins: inputBaseConfig.plugins.concat([uglify({})])
    },
    output: {
      ...outputBaseConfig,
      file: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
      format: 'umd'
    }
  };


  // ESM+ES5 flat module bundle.
  const esm5Config = {
    input: {
      ...inputBaseConfig,
      input: es5Entry,
    },
    output: {
      ...outputBaseConfig,
      file: path.join(distFolder, 'esm5', `${libName}.js`),
      format: 'es'
    }
  };

  // ESM+ES2015 flat module bundle.
  const esm2015Config = {
    input: {
      ...inputBaseConfig,
      input: es2015Entry,
    },
    output: {
      ...outputBaseConfig,
      file: path.join(distFolder, 'esm2015', `${libName}.js`),
      format: 'es'
    }
  };

  return [umdConfig, minifiedUmdConfig, esm5Config, esm2015Config].map(async cfg => {
    const bundle = await rollup.rollup(cfg.input).catch(e => console.log(e));
    // const { code, map } = await bundle.generate(cfg.output);
    await bundle.write(cfg.output).catch(e => console.log(e));
  });
}

/**
 *
 */
async function _package() {
  return [
    _relativeCopy('LICENSE', srcFolder, distFolder),
    _relativeCopy('package.json', srcFolder, distFolder),
    _relativeCopy('README.md', srcFolder, distFolder)
  ];
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
  console.error('Build failed. See below for errors.');
  console.error(e);
  process.exit(1)
});
