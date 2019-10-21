module.exports = async ({ config }) => {
  config.module.rules.push(
    ...[
      {
        test: /\.(png\?.*|jpg\?.*|jpg|png)$/,
        loader: "url-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve("awesome-typescript-loader"),
          },
        ],
      },
      {
        test: /\.stories\.tsx?$/,
        loaders: [
          {
            loader: require.resolve("@storybook/source-loader"),
            options: { parser: "typescript" },
          },
        ],
        enforce: "pre",
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

  config.resolve.extensions.push(".ts", ".tsx", ".md")
  // Workaround to make storybook serve raw svg, not static path
  config.module.rules = config.module.rules.map(data => {
    if (/svg\|/.test(String(data.test)))
      data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
    return data
  })
  return config
}
