var path = require('path');

module.exports = {
  entry: {
    'bundle': './example/app.js'
  },
  output: {
    path: path.join(__dirname, 'example/build'),
    filename: '[name].js',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-es2015', 'babel-preset-stage-2', 'babel-preset-react']
          }
        }]
      }, {
        test: /\.json$/,
        use: [
          { loader: "json-loader" }
        ]
      }, {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }, {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),    //path on disk to serve static files from
    publicPath: '/build',                            //path in browser to server bundles from memory
    host: '0.0.0.0',
    port: 8888,
    disableHostCheck: true,                          //allow external ip addresses to connect
    inline: true,
    quiet: true,
    noInfo: true,
    historyApiFallback: true,
    clientLogLevel: 'warning',
    stats: {
      colors: true
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  devtool: 'source-map'
};
