import globals from "globals"
import pluginJs from "@eslint/js"
import eslintReact from "@eslint-react/eslint-plugin"
import storybook from "eslint-plugin-storybook"
import translationSafeText from "./eslint/rules/translationSafeText.js"

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
  eslintReact.configs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "@eslint-react/exhaustive-deps": "off",
    },
  },
  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ["**/*.test.js", "**/*.stories.js"],
    plugins: { local: { rules: { "translation-safe-text": translationSafeText } } },
    rules: { "local/translation-safe-text": "error" },
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
