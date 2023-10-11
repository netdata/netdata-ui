const isES6 = process.env.BABEL_ENV === "es6"
const isTest = process.env.NODE_ENV === "test"

module.exports = {
  presets: [
    ["@babel/env", { loose: true, modules: isES6 ? false : "commonjs" }],
    "@babel/preset-react",
  ],
  plugins: [
    ["styled-components", { ssr: !isTest, displayName: !isTest }],
    "@babel/plugin-transform-spread",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
        },
      },
    ],
  ].filter(Boolean),
  env: {
    test: {
      presets: ["@babel/env"],
      plugins: ["@babel/transform-runtime"],
    },
  },
}
