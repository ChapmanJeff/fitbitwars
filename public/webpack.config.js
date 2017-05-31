const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
  entry:'./app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {test:/\.(js|jsx)$/, use:'babel-loader'},
      {test:/\.css$/, use:['style-loader','css-loader']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  devServer: {
//     proxy: [
//   {
//     context: ['/api/**', '/auth/**'],
//     target: 'http://localhost:8000',
//     changeOrgin: true,
//     secure: false
//   }
// ],
    historyApiFallback: true
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;
