import styled, { ThemeProvider } from "styled-components"
import { render, screen } from "@testing-library/react"
import "jest-styled-components"
import { DefaultTheme, DarkTheme } from "@/theme"
import rawColors from "@/theme/rawColors"
import { focusRing, fieldFocusRing, focusRingOutline, focusRingAt } from "./focusRing"

const Ring = styled.button`
  ${focusRing}
`
const Sibling = styled.span`
  input:focus-visible + & {
    ${focusRingOutline}
  }
`
const Field = styled.input`
  ${fieldFocusRing}
`

const renderIn = (theme, node) => render(<ThemeProvider theme={theme}>{node}</ThemeProvider>)

describe("focusRing", () => {
  it("draws a 2px primary outline with a 2px offset on keyboard focus only", () => {
    renderIn(DefaultTheme, <Ring>go</Ring>)
    const el = screen.getByRole("button")
    expect(el).toHaveStyleRule("outline", "none", { modifier: ":focus" })
    expect(el).toHaveStyleRule("outline", `2px solid ${DefaultTheme.colors.primary}`, {
      modifier: ":focus-visible",
    })
    expect(el).toHaveStyleRule("outline-offset", "2px", { modifier: ":focus-visible" })
  })
})

describe("fieldFocusRing", () => {
  it("turns the border primary and adds a 1px inner line, no outer glow", () => {
    renderIn(DarkTheme, <Field aria-label="f" />)
    const el = screen.getByLabelText("f")
    expect(el).toHaveStyleRule("border-color", rawColors.green.green100, {
      modifier: ":focus-visible",
    })
    expect(el).toHaveStyleRule("box-shadow", `inset 0 0 0 1px ${rawColors.green.green100}`, {
      modifier: ":focus-visible",
    })
    expect(el).toHaveStyleRule("outline", "none", { modifier: ":focus-visible" })
  })
})

describe("focusRingOutline", () => {
  it("composes the same ring onto any selector, e.g. a visual sibling of a hidden input", () => {
    renderIn(DefaultTheme, <Sibling data-testid="s" />)
    const el = screen.getByTestId("s")
    expect(el).toHaveStyleRule("outline", `2px solid ${DefaultTheme.colors.primary}`, {
      modifier: "input:focus-visible+&",
    })
    expect(el).toHaveStyleRule("outline-offset", "2px", { modifier: "input:focus-visible+&" })
  })
})

it.each([DefaultTheme, DarkTheme])("preserves an explicit inset focus role in $name", theme => {
  const InsetRing = styled.button`
    ${focusRingAt({ offset: -2, color: "segmentedFocus", radius: "var(--field-radius)" })}
  `
  renderIn(theme, <InsetRing>inset</InsetRing>)
  const ring = screen.getByRole("button", { name: "inset" })
  expect(ring).toHaveStyleRule("outline", `2px solid ${theme.colors.segmentedFocus}`, {
    modifier: ":focus-visible",
  })
  expect(ring).toHaveStyleRule("outline-offset", "-2px", { modifier: ":focus-visible" })
  expect(ring).toHaveStyleRule("border-radius", "var(--field-radius)", {
    modifier: ":focus-visible",
  })
  expect(ring).not.toHaveStyleRule("outline", "none", { modifier: ":focus" })
})
