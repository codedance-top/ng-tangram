
module.exports = [
  { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, use: ['@ngtools/webpack'] },
  { test: /\.md$/, use: ['raw'] },
  { test: /\.html$/, use: ['raw'] },
  { test: /\.json$/, use: ['json'] }
];
