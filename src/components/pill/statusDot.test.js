import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import { DarkTheme, DefaultTheme } from "@/theme"
import { StatusDot } from "./index"

it.each([1.75, 2])("sizes a chromeless status mark in local units: %s", size => {
  renderWithProviders(
    <StatusDot size={size} color="statusErrorText" tone="error" data-testid="mark" />
  )
  const mark = screen.getByTestId("mark")
  expect(mark.tagName).toBe("SPAN")
  expect(mark).toHaveAttribute("aria-hidden", "true")
  expect(mark).toHaveAttribute("data-tone", "error")
  expect(mark).toHaveAttribute("data-hollow", "false")
  expect(mark).toHaveStyleRule("width", `${size * 4}px`)
  expect(mark).toHaveStyleRule("height", `${size * 4}px`)
  expect(mark).toHaveStyleRule("background-color", DefaultTheme.colors.statusErrorText)
})

it.each([DefaultTheme, DarkTheme])(
  "preserves a hollow mark's exact ink and seven pixel default in $name",
  theme => {
    renderWithProviders(
      <StatusDot dot="hollow" color="statusMutedText" tone="muted" data-testid="mark" />,
      { theme }
    )
    const mark = screen.getByTestId("mark")
    expect(mark).toHaveAttribute("data-hollow", "true")
    expect(mark).toHaveStyleRule("width", "7px")
    expect(mark).toHaveStyleRule("border", `1.5px solid ${theme.colors.statusMutedText}`)
  }
)

it.each([DefaultTheme, DarkTheme])("supports a dashed hollow mark in $name", theme => {
  renderWithProviders(
    <StatusDot dot="dashed" color="segmentedAccentText" size={1.75} data-testid="mark" />,
    { theme }
  )
  const mark = screen.getByTestId("mark")
  expect(mark).toHaveAttribute("data-hollow", "true")
  expect(mark).toHaveStyleRule("border", `1.5px dashed ${theme.colors.segmentedAccentText}`)
  expect(mark).toHaveStyleRule("width", "7px")
  expect(mark).not.toHaveStyleRule("background-color")
})
