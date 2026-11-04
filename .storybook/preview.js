import React, { useState } from "react"
import { ThemeProvider } from "styled-components"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"
import { GlobalStyles } from "@/global-styles"
import Flex from "@/components/templates/flex"

const themes = { light: DefaultTheme, dark: DarkTheme }

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: { disabled: true },
  },

  decorators: [
    (Story, context) => {
      const theme = themes[context.globals.theme] || DefaultTheme

      // Docs pages render many stories inline, so a full-viewport frame would give each one a screen of whitespace.
      if (context.viewMode === "docs")
        return (
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Flex background="mainBackground" padding={[6]} justifyContent="center" round={1.5}>
              <Story />
            </Flex>
          </ThemeProvider>
        )

      return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Flex
            width="100vw"
            height="100vh"
            background="mainBackground"
            alignItems="center"
            justifyContent="center"
          >
            <Flex>
              <Story />
            </Flex>
          </Flex>
        </ThemeProvider>
      )
    },
  ],
}

export const globalTypes = {
  theme: {
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      title: "Theme",
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
      dynamicTitle: true,
    },
  },
}

export default preview
