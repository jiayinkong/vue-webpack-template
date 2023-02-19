const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const common = require('./webpack.base.conf');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = function(env, argv) {
  const nodeEnv = env.dev ? 'development' : env.test ? 'test' : 'production';
  const analyzerPlugins = env.analyzer
    ? [
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: resolve("./report/report.html"),
          statsFilename: resolve("./report/stats.json"),
        }),
      ]
    : [];
  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      }),
      ...analyzerPlugins
    ],
    output: {
      path: resolve('dist'),
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[hash].js'
    }
  })
}