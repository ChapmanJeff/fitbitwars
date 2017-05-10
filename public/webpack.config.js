const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    proxy: [
  {
    context: ['/api/**', '/auth/**'],
    target: 'http://localhost:8000',
    changeOrgin: true,
    secure: false
  }
],
    historyApiFallback: true
  }
}

module.exports = config;
