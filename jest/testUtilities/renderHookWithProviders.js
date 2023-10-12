import React from "react"
import { renderHook } from "@testing-library/react-hooks"
import { ThemeProvider } from "styled-components"
import { DefaultTheme } from "@/theme/default"

export default (hook, { theme = DefaultTheme, ...rest } = {}) =>
  renderHook(hook, {
    wrapper: props => <ThemeProvider theme={theme} {...props} />,
    ...rest,
  })
