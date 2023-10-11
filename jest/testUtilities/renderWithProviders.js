import React from "react"
import { render } from "@testing-library/react"
import { ThemeProvider } from "styled-components"
import { DefaultTheme } from "@/theme/default"

export default (Component, { theme = DefaultTheme, ...rest } = {}) =>
  render(Component, {
    wrapper: props => <ThemeProvider theme={theme} {...props} />,
    ...rest,
  })
