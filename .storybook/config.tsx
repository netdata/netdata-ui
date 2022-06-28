import React from "react"
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
import Box from "../src/components/templates/box"

import { Toggle } from "../src/components/toggle"
import { useLocalStorage } from "react-use"
import { Text } from "src/components/typography"

const results = require("../.jest-test-results.json")
// const centered = story => {
//   return (
//     <Box
//       sx={{
//         flexDirection: "column",
//         position: "fixed",
//         inset: "0px",
//         display: "flex",
//         alignItems: "center",
//         overflow: "auto",
//         justifyContent: "center",
//       }}
//     >
//       {story()}
//     </Box>
//   )
// }
// // @ts-ignore
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
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("is_dark_theme")
  const handleChange = e => {
    setIsDarkTheme(e.currentTarget.checked)
  }
  return (
    <>
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
    </>
  )
})

const loadStories = () => {
  const req = require.context("../src", true, /\.stories\.(tsx|js)$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
