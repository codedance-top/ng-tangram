/**
 * @ng-tangram 打包脚本
 * 打包格式遵循 Angular Package Format (APF) v5
 * link: https://docs.google.com/document/d/1tdgcvdLKsYPHlgNBppGFrsaA1eINLxJi9C8KkyrH2sI/edit#heading=h.k0mh3o8u5hx
 */
'use strict';

const fs = require('fs');
const { join } = require('path');
const { relativeCopy, inlineResources, build } = require('./build-scripts');

const rootFolder = join(__dirname);

const libsFolder = join(rootFolder, 'src/libs');
const tscFolder = join(rootFolder, 'out-tsc/libs');
const distFolder = join(rootFolder, 'dist/@ng-tangram');

const version = require('./package.json').version;

// const tempLibFolder = join(compilationFolder, '');

const libs = ['animate', 'components'];

/** build html */
async function _html(from, to) {
  await relativeCopy(`**/*`, from, to);
  await inlineResources(to);
}

/** build typings */
async function _typings(from, to) {
  return [
    relativeCopy('**/*.d.ts', from, to),
    relativeCopy('**/*.metadata.json', from, to)
  ];
}

async function _package(from, to) {
  return [
    relativeCopy('LICENSE', from, to),
    // relativeCopy('package.json', from, to),
    relativeCopy('README.md', from, to)
  ];
}

async function _build(lib) {

  // 要编译的包名
  const libPackage = require(`./src/libs/${lib}/package.json`);
  const children = require(`./src/libs/${lib}/build.config.json`).children;

  // 编译目录
  const compilationFolder = join(rootFolder, `out-tsc/libs/${lib}`);
  const outputFolder = join(distFolder, lib);

  // es5 , es2015 编译目录
  const bundleFolder = join(outputFolder, 'bundles');
  const es5OutputFolder = join(compilationFolder, 'esm5');
  const es2015OutputFolder = join(compilationFolder, 'esm2015');

  await _html(join(rootFolder, `./src/libs/${lib}`), compilationFolder);

  for (let i = 0; i < children.length; i++) {

    if(typeof children[i] === 'string') {
      const libName = join(libPackage.name, children[i]);
      const tsConfig = join(compilationFolder, `${children[i]}/tsconfig-build.json`);

      await build.es5(tsConfig, compilationFolder);
      await build.es2015(tsConfig, compilationFolder);
      // await build(libName, bundleFolder, compilationFolder, compilationFolder, outputFolder);
      await _typings(compilationFolder, outputFolder);
    } else {
      children[i].map(async child => {
        const libName = join(libPackage.name, child);
        const tsConfig = join(compilationFolder, `${child}/tsconfig-build.json`);

        await build.es5(tsConfig, compilationFolder);
        await build.es2015(tsConfig, compilationFolder);
        // await build(libName, bundleFolder, compilationFolder, compilationFolder, outputFolder);
        await _typings(compilationFolder, outputFolder);
      })
    }
  }

  await build.es5(`${compilationFolder}/tsconfig-build.json`, compilationFolder);
  await build.es2015(`${compilationFolder}/tsconfig-build.json`, compilationFolder);
  await _typings(compilationFolder, outputFolder);
  await _package(compilationFolder, outputFolder);

  libPackage.version = version;

  fs.writeFileSync(`${outputFolder}/package.json`, JSON.stringify(libPackage));
}

libs.map(lib => _build(lib)).concat(e => {
  console.log(e);
});
