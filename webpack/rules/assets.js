module.exports = [
  {
    test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: ['url?limit=10000&mimetype=application/font-woff&name=[name].[ext]&outputPath=/assets/fonts/']
  },
  {
    test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: ['url?limit=10000&mimetype=application/font-woff2&name=[name].[ext]&outputPath=/assets/fonts/']
  },
  {
    test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: ['url?limit=10000&mimetype=application/octet-stream&name=[name].[ext]&outputPath=/assets/fonts/']
  },
  {
    test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: ['url?limit=10000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]&outputPath=/assets/fonts/']
  },
  {
    test: /\.(svg|png|jpg|jpeg|gif)$/,
    use: ['file?name=[name].[ext]?[hash]&outputPath=/assets/images/&limit=10000']
  }
];
