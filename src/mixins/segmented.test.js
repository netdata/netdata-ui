import React from "react"
import styled, { ThemeProvider } from "styled-components"
import { render, screen } from "@testing-library/react"
import "jest-styled-components"
import { DefaultTheme } from "@/theme"
import { segmentedTrack, segmentedItem } from "./segmented"

const Track = styled.div`
  ${segmentedTrack}
`
const Item = styled.button`
  ${segmentedItem}
`
const { colors } = DefaultTheme

describe("segmented track", () => {
  it("draws a tinted track with a hairline border and 3px inset", () => {
    render(
      <ThemeProvider theme={DefaultTheme}>
        <Track data-testid="t" />
      </ThemeProvider>
    )
    const track = screen.getByTestId("t")
    expect(track).toHaveStyleRule("border", `1px solid ${colors.segmentedBorder}`)
    expect(track).toHaveStyleRule("padding", "3px")
    expect(track).toHaveStyleRule("border-radius", "4px")
  })

  it("raises the active item on the dropdown surface and keeps others transparent", () => {
    render(
      <ThemeProvider theme={DefaultTheme}>
        <Item data-testid="on" active />
        <Item data-testid="off" />
      </ThemeProvider>
    )
    expect(screen.getByTestId("on")).toHaveStyleRule("background", colors.dropdown)
    expect(screen.getByTestId("on")).toHaveStyleRule("font-weight", "600")
    expect(screen.getByTestId("off")).toHaveStyleRule("background", "rgba(255,255,255,0.0)")
    expect(screen.getByTestId("off")).toHaveStyleRule("color", colors.textFocus, { modifier: ":hover" })
  })
})
