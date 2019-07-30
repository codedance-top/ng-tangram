/**
 * @ng-tangram 打包脚本
 * 打包格式遵循 Angular Package Format (APF) v5
 * @description https://docs.google.com/document/d/1tdgcvdLKsYPHlgNBppGFrsaA1eINLxJi9C8KkyrH2sI/edit#heading=h.k0mh3o8u5hx
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

const VERSION_PLACEHOLDER = '0.0.0-PLACEHOLDER';

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
    relativeCopy('LICENSE', './', to),
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

async function _build(lib) {

  // 要编译的包名
  const libPackage = require(`./src/libs/${lib}/package.json`);
  const children = require(`./src/libs/${lib}/build.config.json`).children;

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
    await build.rollup(children[i],`nt.${lib}.${children[i]}`, join(esm5, `${children[i]}/index.js`), join(childCompileFolder, `index.js`), outputFolder);

    await _typings(childCompileFolder, childOutputFolder);
    await _metadata(childCompileFolder, childOutputFolder);
    await fs.writeFileSync(join(childOutputFolder, `package.json`),
`{
  "name": "${libName}",
  "typings": "./index.d.ts",
  "main": "../bundles/${children[i]}.umd.js",
  "module": "../esm5/${children[i]}.js",
  "es2015": "../esm2015/${children[i]}.js"
}`);

    console.log('build completed', `\u001b[32m ${libName} \u001b[39m`);
  }

  /** 当版本号存在时不以统一版本号发布 */
  if(libPackage.version === VERSION_PLACEHOLDER) {
    libPackage.version = version;
  }

  await build.esm5(`${compilationFolder}/tsconfig-build.json`, esm5);
  await build.esm2015(`${compilationFolder}/tsconfig-build.json`);
  await build.rollup(lib, `nt.${lib}`,
    join(esm5, `${lib}.js`),
    join(compilationFolder, `${lib}.js`),
    outputFolder);
  await _typings(compilationFolder, outputFolder);
  await _copyright(compilationFolder, outputFolder);
  await _assets(compilationFolder, outputFolder);
  await _metadata(compilationFolder, outputFolder);
  // fs.writeFileSync(join(outputFolder, `${lib}.metadata.json`), JSON.stringify(metadata));
  fs.writeFileSync(join(outputFolder, 'package.json'), JSON.stringify(libPackage, null, 2));

  console.log('build completed', `\u001b[32m ${libPackage.name} \u001b[39m`);
}

Promise.resolve()
  .then(() => _build('components'))
  .then(() => _build('moment-adapter'))
  .then(() => _build('pro'))
  .catch(error => console.error(error));
