var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var sassLoader = 'style!css!sass?sourceMap=true&sourceMapContents=true&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, './src/styles'));

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',   // Automatic Refresh
      'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux',
      './src/app',
    ],
    // vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/',
  },

  devServer: {
    contentBase: __dirname + '/src',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loaders: ['react-hot', 'babel'],
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.scss$/, loader: sassLoader },
    ],
  },

  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
      'components': path.join(__dirname, './src/components'),
      'layouts': path.join(__dirname, './src/layouts'),
      'views': path.join(__dirname, './src/views'),
      'utils': path.join(__dirname, './src/utils'),
      'styles': path.join(__dirname, './src/styles'),
      'docs': path.join(__dirname, './src/docs'),
    },
    // enforceExtension: true,
    // extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   fileName: 'vendor.js',
    // }),
    new webpack.DefinePlugin({
      __DEV__: true,
      __DEVTOOLS__: true,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
