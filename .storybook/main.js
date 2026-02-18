const path = require("path")

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async config => {
    config.module.rules.push(
      ...[
        {
          test: /\.(m?js)$/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(png\?.*|jpg\?.*|jpg|png)$/,
          loader: "url-loader",
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: "html-loader",
            },
            {
              loader: "markdown-loader",
            },
          ],
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
      ]
    )
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.resolve(__dirname, "../src/"),
      utils: path.resolve(__dirname, "../utils/"),
    }

    config.module.rules = config.module.rules.map(data => {
      if (/svg\|/.test(String(data.test)))
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
      return data
    })
    return config
  },
}
module.exports = config
