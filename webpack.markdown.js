/**
 * webpack 配置扩展文件
 */
const webpack = require('webpack');
const path = require('path');
// const AngularCompilerPlugin = require('@ngtools/webpack/src');

module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new AngularCompilerPlugin.AngularCompilerPlugin({
    //   tsConfigPath: './src/tsconfig.browser.json',
    //   entryModule: './src/app/app.browser.module#AppBrowserModule',
    //   directTemplateLoading: false
    // })
  ],
  module: {
    rules: [
      /* 在 angular 组件模板中引用的 markdown 模板文件以 *.component.md 的方式命名，所以仅对这个格式的文件进行预解析处理 */
      {
        test: /\.component\.md$/,
        use: [
          // { loader: 'html-loader' },
          { loader: path.resolve('scripts/markdown-loader.js') },
        ]
      }
    ]
  }
};
