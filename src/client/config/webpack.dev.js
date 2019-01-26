// ___________modules____________
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const webpack = require("webpack");

//__________ Paths_______________

const BaseDir = path.resolve(__dirname, "../", "../", "../");
const BaseClient = path.resolve(__dirname, "../");
const src = path.resolve(__dirname, "../", "src/");
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
    filename: "client.bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/
      },
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
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  mode: "development",
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      inject: true
    }),
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        SECRET_KEY: JSON.stringify(SECRET_KEY)
      }
    }),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,

      server: {
        baseDir: ["../../dist/client/"]
      }
    })
  ]
};
