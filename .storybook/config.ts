import { addParameters, addDecorator, configure } from "@storybook/react"
import { addReadme } from "storybook-readme"
import { withTests } from "@storybook/addon-jest"
import { withThemesProvider } from "storybook-addon-styled-component-theme"
import { withKnobs } from "@storybook/addon-knobs"
import { setIntlConfig, withIntl } from "storybook-addon-intl"
import centered from "@storybook/addon-centered/react"
import { DefaultTheme } from "../src/theme/default"

import { messages } from "./localeMessages"

const results = require("../.jest-test-results.json")

const getMessages = locale => messages[locale]

setIntlConfig({
  locales: ["ru", "en", "de"],
  defaultLocale: "en",
  getMessages,
})

// @ts-ignore
addDecorator(centered)

addDecorator(withIntl)

addDecorator(withKnobs)
// @ts-ignore
addDecorator(withTests({ results }))

addParameters({
  options: {
    name: "Netdata UI-kit",
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: "bottom",
    hierarchySeparator: /\/|\./,
    sidebarAnimations: true,
    enableShortcuts: true,
    isToolshown: false,
    theme: undefined,
  },
})

addDecorator(addReadme)

addDecorator(withThemesProvider([DefaultTheme]))

const loadStories = () => {
  const req = require.context("../stories", true, /\.stories\.tsx$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
