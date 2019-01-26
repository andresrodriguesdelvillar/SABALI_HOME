const path = require("path");
const webpack = require("webpack");

const BaseDir = path.resolve(__dirname, "../", "../", "../");

// --config
const SECRET_KEY = require("../../config/secrets").SECRET_KEY;

module.exports = {
  entry: ["@babel/polyfill", "./server.js"],
  output: {
    filename: "server.bundle.js",
    path: path.resolve(BaseDir, "dist/"),
    publicPath: BaseDir + "dist/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.SECRET_KEY": JSON.stringify(SECRET_KEY)
    })
  ],
  mode: "production",
  target: "node"
};
