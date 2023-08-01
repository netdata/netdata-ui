import React from "react"
import useLocalStorage from "react-use/lib/useLocalStorage"
import { addReadme } from "storybook-readme"
import centered from "@storybook/addon-centered/react"
import { withKnobs } from "@storybook/addon-knobs"
import { withTests } from "@storybook/addon-jest"

import { DefaultTheme } from "src/theme/default"
import { DarkTheme } from "src/theme/dark"
import { GlobalStyles } from "src/global-styles"

import { ThemeProvider } from "styled-components"
import Flex from "../src/components/templates/flex"

import { Toggle } from "../src/components/toggle"
import { Text } from "src/components/typography"

const results = require("../.jest-test-results.json")

export const decorators = [
  addReadme,
  centered,
  withKnobs,
  withTests({ results }),
  story => {
    const [isDarkTheme, setIsDarkTheme] = useLocalStorage("is_dark_theme")
    const handleChange = e => {
      setIsDarkTheme(e.currentTarget.checked)
    }
    return (
      <ThemeProvider theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <GlobalStyles />
        <div id="story-wrapper" style={{ minHeight: "100vh" }}>
          {story()}
          <Flex>
            <Toggle
              labelRight={"Dark theme"}
              labelLeft={"Light theme"}
              onChange={handleChange}
              checked={!!isDarkTheme}
              colored={false}
              disabled={false}
              Label={Text}
            />
          </Flex>
        </div>
      </ThemeProvider>
    )
  },
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
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
}
