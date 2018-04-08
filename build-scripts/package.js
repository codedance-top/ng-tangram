const fs = require('fs');
const utils = require('./build-scripts/utils');

exports = async function (version, package) {
  await utils.relativeCopy('LICENSE', rootFolder, distFolder);
  await utils.relativeCopy('package.json', rootFolder, distFolder);
  await utils.relativeCopy('README.md', rootFolder, distFolder);
}
