const fs = require('fs');
const { join } = require('path');
const relativeCopy = require('./utils');
const { replaceFileContent } = require('./utils');

const rootFolder = join(process.cwd(), './');
const version = require(`${rootFolder}/package.json`).version;

const lib = process.argv.slice(2).shift();
const libFolder = join(`${rootFolder}/src/libs/${lib}`);
const libPackage = require(`${rootFolder}/dist/@ng-tangram/${lib}/package.json`);

const VERSION_PLACEHOLDER = '0.0.0-PLACEHOLDER'

const distFolder = join(rootFolder, 'dist/@ng-tangram');
const outputFolder = join(distFolder, lib);

/** 当版本号存在时不以统一版本号发布 */
if (libPackage.version === VERSION_PLACEHOLDER) {
  libPackage.version = version;
}

replaceFileContent(`${rootFolder}/dist/@ng-tangram/${lib}/public-api.d.ts`, VERSION_PLACEHOLDER, version);

fs.writeFileSync(join(outputFolder, 'package.json'), JSON.stringify(libPackage, null, 2));
relativeCopy('LICENSE', './', outputFolder);
relativeCopy('**/*.scss', libFolder, outputFolder);

console.log('build completed', `\u001b[32m ${libPackage.name} \u001b[39m`);
