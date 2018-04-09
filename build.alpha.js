const fs = require('fs');
const { join } = require('path');
const { relativeCopy, inlineResources, build } = require('./build-scripts');

const rootFolder = join(__dirname);

const libsFolder = join(rootFolder, 'src/libs');
const distFolder = join(rootFolder, 'dist/@ng-tangram');

const version = require('./package.json').version;

const libs = ['animate', 'components'];

async function _build(lib) {

  const libPackage = require(`./src/libs/${lib}/package.json`);
  const compilationFolder = join(rootFolder, `out-tsc/libs/${lib}`);

  const src = join(libsFolder, lib);
  const dist = join(distFolder, lib);

  relativeCopy('**/*.ts', src, dist);
  relativeCopy('**/*.html', src, dist);
  relativeCopy('**/*.scss', src, dist);
  relativeCopy('**/*.css', src, dist);
  relativeCopy('**/*.eot', src, dist);
  relativeCopy('**/*.svg', src, dist);
  relativeCopy('**/*.ttf', src, dist);
  relativeCopy('**/*.woff', src, dist);
  relativeCopy('LICENSE', src, dist);
  relativeCopy('README.md', src, dist);

  libPackage.version = version;

  fs.writeFileSync(`${dist}/package.json`, JSON.stringify(libPackage));
}

libs.map(lib => _build(lib));
