import React, { useState } from "react"
import { ThemeProvider } from "styled-components"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"
import { GlobalStyles } from "@/global-styles"
import Flex from "@/components/templates/flex"

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
    backgrounds: { disable: true },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === "dark" ? DarkTheme : DefaultTheme

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
      items: ["light", "dark"],
      dynamicTitle: true,
    },
  },
}

export default preview
