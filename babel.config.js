module.exports = {
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        "@babel/transform-runtime",
        ["styled-components", { ssr: false, displayName: false }],
      ],
    },
  },
}
