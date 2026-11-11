import styled, { ThemeProvider } from "styled-components"
import { render, screen } from "@testing-library/react"
import "jest-styled-components"
import { DefaultTheme, DarkTheme } from "@/theme"
import { controlHeight, controlFontSize, controlSizeOf } from "./controlSize"

const Box = styled.div`
  height: ${props => controlHeight(controlSizeOf(props))(props)};
  font-size: ${props => controlFontSize(controlSizeOf(props))(props)};
`

const renderBox = props =>
  render(
    <ThemeProvider theme={DefaultTheme}>
      <Box data-testid="b" {...props} />
    </ThemeProvider>
  )

describe("control size ladder", () => {
  it("is one theme constant shared by both themes", () => {
    expect(DefaultTheme.constants.CONTROL_SIZES).toEqual({
      compact: { height: 24, fontSize: 12 },
      default: { height: 30, fontSize: 13 },
      large: { height: 32, fontSize: 14 },
    })
    expect(DarkTheme.constants.CONTROL_SIZES).toBe(DefaultTheme.constants.CONTROL_SIZES)
  })

  it.each([
    [{}, "30px", "13px"],
    [{ large: true }, "32px", "14px"],
    [{ compact: true }, "24px", "12px"],
    [{ size: "large" }, "32px", "14px"],
    [{ size: "compact" }, "24px", "12px"],
  ])("resolves %p to %s / %s", (props, height, fontSize) => {
    renderBox(props)
    expect(screen.getByTestId("b")).toHaveStyleRule("height", height)
    expect(screen.getByTestId("b")).toHaveStyleRule("font-size", fontSize)
  })
})
