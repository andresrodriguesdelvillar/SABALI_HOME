const path = require("path");
const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");
const BaseDir = path.resolve(__dirname, "../", "../", "../");

// --config
const SECRET_KEY = require("../../config/secrets").SECRET_KEY;

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
        use: "babel-loader"
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        SECRET_KEY: JSON.stringify(SECRET_KEY)
      }
    }),
    new NodemonPlugin({}) // Dong
  ]
};
