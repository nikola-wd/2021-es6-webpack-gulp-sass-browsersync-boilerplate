const path = require('path');
const outputDir = path.resolve(__dirname, 'prod');

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, './src/js/app.js')
    // react: path.resolve(__dirname, './src/js/app-react.js'),
    // ie: path.resolve(__dirname, './src/js/app-ie11.js'),
  },
  devtool: 'inline-source-map',
  output: {
    path: outputDir,
    filename: '[name].min.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  }
};
