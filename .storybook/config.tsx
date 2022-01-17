import React, { useState } from "react"
import { addParameters, addDecorator, configure } from "@storybook/react"
import { addReadme } from "storybook-readme"
import { withTests } from "@storybook/addon-jest"
import { withKnobs } from "@storybook/addon-knobs"
import centered from "@storybook/addon-centered/react"
import { DefaultTheme } from "src/theme/default"
import { DarkTheme } from "src/theme/dark"

import { GlobalStyles } from "src/global-styles"
import { ThemeProvider } from "styled-components"
import Flex from "../src/components/templates/flex"
import { Button } from "../src/components/button"
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

addDecorator(story => {
  const [theme, setTheme] = useState("dark")

  return (
    <>
      <ThemeProvider theme={theme === "light" ? DefaultTheme : DarkTheme}>
        <GlobalStyles />
        <div id="story-wrapper" style={{ minHeight: "100vh" }}>
          {story()}
          <Flex>
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              label={"Change theme"}
            />
          </Flex>
        </div>
      </ThemeProvider>
    </>
  )
})

const loadStories = () => {
  const req = require.context("../src", true, /\.stories\.(tsx|js)$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
