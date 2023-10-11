const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")

const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "hidden-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProduction ? "netdata-ui.min.js" : "netdata-ui.js",
    library: "NetdataUIKit",
    libraryTarget: "var",
  },
  externals: ["react", "react-dom", "styled-components"],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
          },
          "svgo-loader",
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        oneOf: [
          { exclude: /node_modules/, use: ["raw-loader"] },
          {
            use: ["css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}
