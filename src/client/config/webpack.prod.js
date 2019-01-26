// ___________modules____________
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const ServiceWorkerPlugin = require("serviceworker-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
const SECRET_KEY = require("../../config/secrets").SECRET_KEY;

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
  plugins: [
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      inject: true,
      favicon: "./src/templates/favicon.ico"
    }),
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      "process.env.SECRET_KEY": JSON.stringify(SECRET_KEY)
    }),
    new ServiceWorkerPlugin({
      entry: path.join(__dirname, "../service-worker.js")
    }),
    new CopyWebpackPlugin([{ from: "./src/templates/manifest.json" }])
  ]
};
