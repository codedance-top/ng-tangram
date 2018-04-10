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
const tscFolder = join(rootFolder, 'out-tsc/@ng-tangram');
const distFolder = join(rootFolder, 'dist/@ng-tangram');

const version = require('./package.json').version;

// const tempLibFolder = join(compilationFolder, '');

async function _inline(from, to) {
  await relativeCopy('**/*', from, to);
  await inlineResources(to);
}

/** build typings */
async function _typings(from, to) {
  relativeCopy('**/*.d.ts', from, to);
}

async function _metadata(from, to) {
  relativeCopy('**/*.metadata.json', from, to);
}

async function _copyright(from, to) {
  return [
    relativeCopy('LICENSE', from, to),
    relativeCopy('README.md', from, to)
  ];
}

async function _assets(from, to) {
  return [
    relativeCopy('**/*.scss', from, to),
    relativeCopy('**/*.css', from, to),
    relativeCopy('**/*.eot', from, to),
    relativeCopy('**/*.svg', from, to),
    relativeCopy('**/*.ttf', from, to),
    relativeCopy('**/*.woff', from, to)
  ];
}

async function _version(lib) {

}

async function _build(lib) {

  // 要编译的包名
  const libPackage = require(`./src/libs/${lib}/package.json`);
  const children = require(`./src/libs/${lib}/build.config.json`).children;

  const metadata = {
    __symbolic: 'module',
    version: 4,
    exports: children.map(child => ({
      from: `./${child}`
    })),
    metadata: {},
    origins: {},
    importAs: libPackage
  };

  // 编译目录
  // const libFolder = join(libsFolder, lib);
  const compilationFolder = join(tscFolder, lib);
  const outputFolder = join(distFolder, lib);

  await _inline(join(libsFolder, lib), compilationFolder);

  // es5 , es2015 编译目录
  const esm5 = join(compilationFolder, 'esm5');

  for (let i = 0; i < children.length; i++) {

    const libName = `@ng-tangram/${lib}/${children[i]}`;
    const childCompileFolder = join(compilationFolder, children[i]);
    const childOutputFolder = join(outputFolder, children[i]);

    await build.esm5(join(compilationFolder, `${children[i]}/tsconfig-build.json`), esm5);
    await build.esm2015(join(compilationFolder, `${children[i]}/tsconfig-build.json`));
    await build.rollup(children[i], join(esm5, `${children[i]}/index.js`), join(childCompileFolder, `index.js`), outputFolder);

    await _typings(childCompileFolder, childOutputFolder);
    await _metadata(childCompileFolder, childOutputFolder);
    await fs.writeFileSync(join(childOutputFolder, `package.json`), `{
  "name": "${libName}",
  "typings": "../${children[i]}.d.ts",
  "main": "../bundles/${children[i]}.umd.js",
  "module": "../esm5/${children[i]}.js",
  "es2015": "../esm2015/${children[i]}.js"
}
    `);

    console.log('build completed', libName);
  }

  libPackage.version = version;

  // console.log(compilationFolder);

  await build.esm5(`${compilationFolder}/tsconfig-build.json`, esm5);
  await build.esm2015(`${compilationFolder}/tsconfig-build.json`);
  await build.rollup(lib,
    join(esm5, `${lib}.js`),
    join(compilationFolder, `${lib}.js`),
    outputFolder);
  await _typings(compilationFolder, outputFolder);
  await _copyright(compilationFolder, outputFolder);
  await _assets(compilationFolder, outputFolder);

  await fs.writeFileSync(join(outputFolder, `${lib}.metadata.json`), JSON.stringify(metadata));
  await fs.writeFileSync(join(outputFolder, 'package.json'), JSON.stringify(libPackage));

  console.log('build completed', libPackage.name);
}

async function _start() {
  await _build('animate');
  await _build('components');
}

_start();
