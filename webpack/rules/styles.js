const postcssPlugins = require('../plugins/postcss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let postcss = {
  loader: 'postcss',
  options: {
    "ident": "postcss",
    "plugins": postcssPlugins,
    "sourceMap": false
  }
}

module.exports = [
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({ fallback: 'style', use: ['css', postcss] })
  },
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({ fallback: 'style', use: ['css', postcss, 'less'] })
  },
  // {
  //   test: /\.component\.less$/,
  //   use: [ 'raw', postcss, 'less' ]
  // },
  {
    test: /\.(scss|sass)$/,
    exclude: [/\.component\.(scss|sass)$/],
    use: ExtractTextPlugin.extract({ fallback: 'style', use: ['css', postcss, 'sass'] })
  },
  {
    test: /\.component\.(scss|sass)$/,
    use: ['raw', postcss, 'sass']
  },
]
