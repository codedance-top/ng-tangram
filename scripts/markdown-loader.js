const kramed = require('kramed');
const createDOMPurify = require('dompurify');;
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

DOMPurify.addHook('uponSanitizeElement', function(node, data){
  if(node.nodeName) {
    data.allowedTags[data.tagName] = true;
  }
});

const renderer = new kramed.Renderer();

renderer.include = function (text) {
  text = text.trim();
  return text;
};

renderer.heading = function (text, level) {
  text = text.trim();
  return `<h${level} id="${text.replace(/\<a[^>]*?\>((.|\n)*?)\<\/a\>/g, '$1').replace(/ +/g, '-')}">${text}</h${level}>`;
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

kramed.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  renderer: renderer
});

module.exports = function (source) {
  let html = kramed(source, { renderer });
  console.log(html);

  return `export default ${
    JSON.stringify(html)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
    }`;
};
