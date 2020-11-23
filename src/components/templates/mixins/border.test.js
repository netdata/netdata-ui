import React from "react"
import { renderWithProviders } from "testUtilities"
import styled from "styled-components"
import { DefaultTheme as theme } from "src/theme/default"
import styledBorder from "./border"

const borderColor = theme.colors.border

it("renders", () => {
  expect(styledBorder({ theme })).toBe("")
})

it("renders default", () => {
  expect(styledBorder({ theme, border: true }).trim()).toBe(`border: 1px solid ${borderColor};`)
})

it("renders border horizontally", () => {
  expect(styledBorder({ theme, border: "horizontal" })).toBe(`
    border-top: 1px solid ${borderColor};
    border-bottom: 1px solid ${borderColor};
  `)
})

it("renders border vertically", () => {
  expect(styledBorder({ theme, border: "vertical" })).toBe(`
    border-left: 1px solid ${borderColor};
    border-right: 1px solid ${borderColor};
  `)
})

it("renders custom border bottom", () => {
  expect(
    styledBorder({
      theme,
      border: { color: "disabled", side: "bottom", size: "1rem", type: "dashed" },
    }).trim()
  ).toBe(`border-bottom: 1rem dashed ${theme.colors.disabled};`)
})

it("renders custom border vertically", () => {
  expect(
    styledBorder({
      theme,
      border: { color: "disabled", side: "vertical", size: "2px", type: "dashed" },
    })
  ).toBe(`
    border-left: 2px dashed ${theme.colors.disabled};
    border-right: 2px dashed ${theme.colors.disabled};
  `)
})

it("renders invalid", () => {
  expect(styledBorder({ theme, border: "invalid" })).toBe("")
})
