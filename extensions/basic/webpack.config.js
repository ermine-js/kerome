/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: 'source-map',
  entry: {
    popup: path.join(__dirname, 'src/popup.tsx'),
    sandbox: path.join(__dirname, 'src/sandbox.tsx'),
    // contentScript: path.join(__dirname, 'src/contentScript/index.tsx'),
    background: path.join(__dirname, 'src/background.ts')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(jsx|tsx|js|ts)$/,
        options: {
          transpileOnly: true,
          compilerOptions: {
            module: 'es2015'
          }
        },
        loader: 'ts-loader'
      },
      {
        exclude: /node_modules/,
        test: /index\.css$/,
        use: [
          {
            loader: 'style-loader' // Creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // Translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        exclude: /node_modules/,
        test: /shadow\.css$/,
        use: [
          {
            loader: 'to-string-loader'
          },
          {
            loader: 'css-loader' // Translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      // hash: true,
      filename: 'sandbox.html',
      chunks: ['sandbox'],
      title: 'Sandbox',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      // hash: true,
      filename: 'popup.html',
      chunks: ['popup'],
      title: 'Popup',
      inject: 'body'
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }]
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    port: 'auto',
    devMiddleware: {
      writeToDisk: true
    }
  }
}
