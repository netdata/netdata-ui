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
    ]
  )

  config.resolve.extensions.push(".ts", ".tsx", ".md")
  return config
}
