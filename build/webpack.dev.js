const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.base.conf');
const { resolve } = require('./utils.ts');

const devWebpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: []
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  // 日志打印只打印错误和警告
  stats: 'errors-warnings',
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*g/,
          to: '/index.html'
        }
      ]
    },
    allowedHosts: 'all',
    port: 8080,
    open: false,
    hot: true,
    client: {
      progress: true, // 将运行进度输出到控制台
      overlay: {
        warnings: false,
        errors: true,
      }
    },
    compress: true, // 为所有服务器启动gzip压缩
    proxy: {
      // '/api': {
      //   target: '',
      //   changeOrigin: true, // 是否支持跨域
      //   pathRewrite: {
      //     '^/api': '',
      //   }
      // }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.enc.NODE_ENV': 'development',
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true
    })
  ]
})

module.exports = devWebpackConfig;