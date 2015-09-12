var webpack = require('webpack');

module.exports = {
  entry: {
    knn: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/demo/knn/index.js'
    ]
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:8080' + '/dist/'
  },

  devServer: {
    port: 8080,
    hot: true,
    inline: true,
  },

  devtool: 'eval-source-map',

  resolve: {
    extensions: [ '', '.js', '.css' ]
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
