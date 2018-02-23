
const assets = require('./assets');
const styles = require('./styles');
const markdown = require('./markdown');
const primary = require('./primary');

module.exports = primary.concat(assets, styles, markdown);
