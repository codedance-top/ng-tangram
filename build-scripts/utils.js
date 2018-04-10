const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

// Copy files maintaining relative paths.
module.exports = async function (fileGlob, from, to) {
  const files = glob.sync(fileGlob, { cwd: from, nodir: true });
  files.forEach(file => {
    const origin = path.join(from, file);
    const dest = path.join(to, file);
    const data = fs.readFileSync(origin, 'utf-8');
    _recursiveMkDir(path.dirname(dest));
    fs.writeFileSync(dest, data);
  });
};

module.exports.recursiveMkDir = _recursiveMkDir;
