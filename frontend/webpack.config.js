const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.tsx',
    vendors: './src/vendors.ts'
  },
  output: {
    path: path.resolve('../', 'dist'),
    filename: '[name].[hash:10].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.scss', '.css', '.html']
  },
  module: {
    rules: [{
        test: /(\.tsx?)$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /(\.s?css)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendors', 'webpack-runtime']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ExtractTextPlugin('[hash:10].css')
  ],
  devServer: {
    port: 3000,
    contentBase: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'public'),
      path.resolve(__dirname, 'dist')
    ],
    overlay: true
  },
  devtool: 'source-map'
};