import React from "react"
import { ThemeProvider } from "styled-components"

const inkedKeys = ["text", "textLite", "textDescription"]

const tooltipInkTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    ...Object.fromEntries(inkedKeys.map(key => [key, theme.colors.tooltipText])),
  },
})

const TooltipInk = ({ children }) => (
  <ThemeProvider theme={tooltipInkTheme}>{children}</ThemeProvider>
)

export default TooltipInk
