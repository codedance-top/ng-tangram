const {
  realpathSync
} = require('fs');
const {
  join
} = require('path');

const {
  SourceMapDevToolPlugin,
  NamedModulesPlugin
} = require('webpack');
const {
  CommonsChunkPlugin
} = require('webpack').optimize;
const {
  NamedLazyChunksWebpackPlugin
} = require('@angular/cli/plugins/webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolveHtmlPlugin = require('../plugins/html');

const nodeModules = join(process.cwd(), 'node_modules');
const realNodeModules = realpathSync(nodeModules);
const genDirNodeModules = join(process.cwd(), 'src', '$$_gendir', 'node_modules');

module.exports = {
  output: {
    path: join(process.cwd(), 'dist/browser'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    resolveHtmlPlugin(false),
    new ExtractTextPlugin('assets/css/[name].css'),
    new CommonsChunkPlugin({
      name: [
        'vendor'
      ],
      minChunks: (module) => {
        return module.resource &&
          (module.resource.startsWith(nodeModules) ||
            module.resource.startsWith(genDirNodeModules) ||
            module.resource.startsWith(realNodeModules));
      },
      chunks: ['main']
    }),
    new NamedLazyChunksWebpackPlugin(),
    new NamedModulesPlugin()
  ]
};
