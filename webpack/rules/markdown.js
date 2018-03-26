const marked = require('marked');
const markdownInclude = require('markdown-include');

const renderer = new marked.Renderer();

// renderer.paragraph = function(text) {
//   console.log(text);
//   if(text.match(/<("[^"]*"|'[^']*'|[^'">])*>/)) {
//     return text + '\n';
//   }
//   return '<p>' + text + '</p>\n';
// };

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

module.exports = [{
    test: /\.component\.md$/,
    use: [
      {
        loader: 'markdown',
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
      }
    ]
  },
  {
    test: /\.md$/,
    exclude: [/\.component\.md$/],
    use: ['raw']
  },
];
