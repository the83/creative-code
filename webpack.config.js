const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './art/src/index.ts',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Theron\'s Creative Coding Space',
      filename: 'index.html'
    })
  ],
};
