const path = require('path');
const outputDir = path.resolve(__dirname, 'prod');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// TODO: minification doesn't work

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, './src/js/app.js'),
    // react: path.resolve(__dirname, './src/js/app-react.js'),
    // ie: path.resolve(__dirname, './src/js/app-ie11.js'),
  },
  output: {
    path: outputDir,
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    concatenateModules: true,
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: 4,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};
