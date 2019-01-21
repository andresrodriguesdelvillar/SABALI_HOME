const path = require("path");
const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");
const BaseDir = path.resolve(__dirname, "../", "../", "../");

module.exports = {
  entry: ["@babel/polyfill", "./server.js"],
  output: {
    filename: "server.bundle.js",
    path: path.resolve(BaseDir, "dist/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        parser: {
          amd: true
        }
      }
    ]
  },
  mode: "development",
  target: "node",
  plugins: [
    new NodemonPlugin({}) // Dong
  ]
};
