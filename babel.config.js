const isES6 = process.env.BABEL_ENV === "es6"
const isTest = process.env.NODE_ENV === "test"

module.exports = {
  presets: [
    ["@babel/env", { modules: isES6 ? false : "commonjs" }],
    ["@babel/preset-react", { runtime: "automatic", development: false }],
  ],
  plugins: [
    ["styled-components", { ssr: !isTest, displayName: !isTest }],
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
