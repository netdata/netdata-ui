module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["@netdata/eslint-config-netdata"],
  rules: {
    "react/jsx-filename-extension": 0,
    "import/extensions": 0,
    "react/prop-types": 0,
  },
}
