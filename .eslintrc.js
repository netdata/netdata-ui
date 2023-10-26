module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended"
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      globals: {
        JSX: true,
      },
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
      },
    },
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    DEVELOPMENT: "readonly",
    DOCKER: "readonly",
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      parserOpts: {
        plugins: ["jsx"],
      },
    },
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/prop-types": [0],
    "react-hooks/rules-of-hooks": "error",
    "react/display-name": 0,
  },
}
