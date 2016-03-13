var webpack = require('webpack');
var path = require('path');

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin()
];

module.exports = {
    entry: './src/index',
    output: {
      path: 'lib',
      filename: 'taggedInput.js',
      library: 'taggedInput',
      libraryTarget: 'commonjs2',
    },
    module: {
      loaders: [{   
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }]
    },
    externals: [{
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }],
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
