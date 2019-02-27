/**
 * webpack 配置扩展文件
 *
 * 组件说明模板是用 markdown 编写的，但是 angular-cli 内置的编译器并不会解析 markdown 因此需要扩展内置编译器
 *
 * 依赖库：
 *  marked
 *  markdown-loader
 */

const marked = require('marked');
const renderer = new marked.Renderer();

renderer.include = function (text) {
  text = text.trim();
  return text;
};

renderer.heading = function (text, level) {
  text = text.trim();
  return `<h${level} id="${text.replace(/\<a[^>]*?\>((.|\n)*?)\<\/a\>/g, '$1').replace(/ +/g, '-')}">
        ${text}
      </h${level}>`;
};

renderer.listitem = function (text) {

  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text
      .replace(/^\s*\[ \]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " disabled> ')
      .replace(/^\s*\[x\]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " checked disabled> ');
    return `<li style="list-style: none">${text}</li>`;
  } else {
    return `<li>${text}</li>`;
  }
};

const markdownLoader = {
  loader: 'markdown-loader',
  options: {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    renderer: renderer
  }
};

module.exports = {
  module: {
    rules: [
      { test: /\.md$/, use: ['raw-loader'] },

      /** 在 angular 组件模板中引用的 markdown 模板文件以 *.component.md 的方式命名，所以仅对这个格式的文件进行预解析处理 */
      { test: /\.component\.md$/, use: [markdownLoader] },
      { test: /\.md$/, exclude: [/\.component\.md$/], use: ['raw-loader'] },
    ]
  }
};
