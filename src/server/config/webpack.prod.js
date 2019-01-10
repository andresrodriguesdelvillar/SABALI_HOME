const path = require("path");
const webpack = require("webpack");

const BaseDir = path.resolve(__dirname, "../", "../", "../");

module.exports = {
  entry: {
    main: ["./server.js"]
  },
  output: {
    filename: "server.bundle.js",
    path: path.resolve(BaseDir, 'dist/'),
    publicPath: BaseDir + 'dist/'
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
  mode: "production",
  target: "node"
};
