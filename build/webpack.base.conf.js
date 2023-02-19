const VueLoader = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { resolve, babelLoaderConf } = require('./utils.ts');

module.exports = {
  entry: {
    app: resolve('src/index.ts')
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', 'json', '.tsx', '.mjs'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @use "@/styles/variables.scss" as *;
                @use "@/styles/mixin.scss" as *;
              `
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ],
        include: /(src)/
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/assets/svg')],
        options: {
          symbolId: 'icon-[name]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'images/[base]',
        },
        exclude: [resolve('src/assets/svg')]
      },
      {
        test: /\.(ts|js)x?$/,
        use: [babelLoaderConf],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new VueLoader.VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('index.html'),
      inject: true
    }),
    new CleanWebpackPlugin(),
    // css抽离
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    // css 压缩
    new CssMinimizerPlugin()
  ]
}