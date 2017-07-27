'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dockerIp = require('docker-ip');
const _ = require('lodash');
let config = module.exports = require('./main.config.js');

config = _.extend(config, {
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  devtool: 'sourcemap',
});

config.output = _.extend(config.output, {
  // app/assets/javascripts/build which enables hooking into Sprockets
  path: path.join(config.context, 'assets', 'build'),
  // compiled bundle filename
  filename: '[name].js',
  // Settings to better support source map file paths
  devtoolModuleFilenameTemplate: '[resourcePath]',
  devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
});

// Adjust the CSS configuration by specifying the extract text plugin settings
config.plugins.push(new ExtractTextPlugin('[name].css', { allChunks: true }));

// Babel-specific development time configuration
const babelLoader = _.find(config.module.loaders, loader => loader.loader === 'babel');
if (babelLoader) {
  babelLoader.query.cacheDirectory = process.env.BABEL_CACHE_DIR || '';
}

config.devServer = {
  contentBase: '/frontend',
  publicPath: '/assets/build',
  disableHostCheck: true,
  proxy: {
    '**': {
      target: {
        host: 'server',
        protocol: 'http',
        port: 3000,
      },
      changeOrigin: true,
      secure: false,
    },
    // TODO: Find a way to programatically get this information, the docker machine ip
  },
  historyApiFallback: {
    index: '/',
  },
};
