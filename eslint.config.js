import globals from "globals"
import pluginJs from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import storybook from "eslint-plugin-storybook"

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es6,
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },
  {
    ignores: [
      ".*.js",
      "node_modules/",
      "dist/",
      "!.storybook",
    ],
  },
]
