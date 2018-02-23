const HtmlWebpackPlugin = require('html-webpack-plugin');

const minify = {
  caseSensitive: true,
  collapseWhitespace: true,
  keepClosingSlash: true
};

const entryPoints = ["inline", "polyfills", "sw-register", "styles", "vendor", "main"];

module.exports = function (production) {

  return new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html',
    hash: false,
    inject: true,
    compile: true,
    favicon: false,
    minify: !production ? false : minify,
    cache: true,
    showErrors: true,
    chunks: "all",
    excludeChunks: [],
    xhtml: true,
    chunksSortMode: function sort(left, right) {
      let leftIndex = entryPoints.indexOf(left.names[0]);
      let rightindex = entryPoints.indexOf(right.names[0]);
      if (leftIndex > rightindex) {
        return 1;
      } else if (leftIndex < rightindex) {
        return -1;
      } else {
        return 0;
      }
    }
  });
}
