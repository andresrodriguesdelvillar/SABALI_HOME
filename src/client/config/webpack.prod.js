// ___________modules____________
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");

//__________ Paths_______________

const BaseDir = path.resolve(__dirname, "../", "../", "../");
const BaseClient = path.resolve(__dirname, "../");
const src = path.resolve(BaseClient, "src/");
const dist = path.resolve(BaseDir, "dist/", "client/");

//____________Webpack__________

// --- Webpack vars

const entry = path.resolve(src, "index.js");
const htmlTemplate = path.resolve(src, "templates/", "index.html");

// --config

module.exports = {
  entry: entry,
  output: {
    path: dist,
    publicPath: "",
    filename: "client.bundle.js"
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      }
    ]
  },
  mode: "production",
  target: "node",
  plugins: [
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      inject: true
    }),
    new WebpackCleanupPlugin()
  ]
};
