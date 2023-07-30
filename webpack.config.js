const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './art/src/index.tsx',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.(ts|js|jsx|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },

  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'art/src/index.html',
      filename: 'index.html'
    })
  ],
};
