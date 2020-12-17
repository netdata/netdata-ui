import React from "react"
import { addParameters, addDecorator, configure } from "@storybook/react"
import { addReadme } from "storybook-readme"
import { withTests } from "@storybook/addon-jest"
import { withThemesProvider } from "storybook-addon-styled-component-theme"
import { withKnobs } from "@storybook/addon-knobs"
import centered from "@storybook/addon-centered/react"
import { DefaultTheme } from "src/theme/default"
import { GlobalStyles } from "src/global-styles"

const results = require("../.jest-test-results.json")

// @ts-ignore
addDecorator(centered)

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

addDecorator(story => (
  <>
    <GlobalStyles />
    {story()}
  </>
))

addDecorator(withThemesProvider([DefaultTheme]))

const loadStories = () => {
  const req = require.context("../src", true, /\.stories\.(tsx|js)$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
