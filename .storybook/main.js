const path = require("path")
module.exports = {
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  stories: ["../src/**/*.stories.js"],
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

    // Workaround to make storybook serve raw svg, not static path
    config.module.rules = config.module.rules.map(data => {
      if (/svg\|/.test(String(data.test)))
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
      return data
    })
    return config
  },
  docs: {
    autodocs: "tag",
  },
}
