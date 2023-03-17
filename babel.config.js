module.exports = {
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: ["@babel/transform-runtime", "babel-plugin-styled-components"],
    },
  },
}
