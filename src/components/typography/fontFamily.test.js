import React from "react"
import "jest-styled-components"
import { renderWithProviders, screen } from "testUtilities"
import { H1, Text, TextSmall } from "./index"

describe("typography font family", () => {
  it.each([
    ["H1", H1],
    ["Text", Text],
    ["TextSmall", TextSmall],
  ])("%s renders IBM Plex Sans first with a system fallback", (_, Component) => {
    renderWithProviders(<Component>value</Component>)
    const family = getComputedStyle(screen.getByText("value")).fontFamily
    expect(family.startsWith('"IBM Plex Sans"')).toBe(true)
    expect(family).toContain("-apple-system")
    expect(family).toContain("sans-serif")
  })
})
