import React from "react"
import { createRef } from "react"
import { StyleSheetManager } from "styled-components"
import isPropValid from "@emotion/is-prop-valid"
import { DefaultTheme, DarkTheme } from "@/theme"
import { renderWithProviders, screen } from "testUtilities"
import Skeleton from "./index"

it("keeps the existing pulse, default geometry and reduced-motion behavior", () => {
  const ref = createRef()
  renderWithProviders(
    <StyleSheetManager
      shouldForwardProp={(prop, target) => typeof target !== "string" || isPropValid(prop)}
    >
      <Skeleton id="waiting" role="presentation" ref={ref} data-testid="skeleton" />
    </StyleSheetManager>
  )
  const element = screen.getByTestId("skeleton")
  expect(element.tagName).toBe("DIV")
  expect(element.id).toBe("waiting")
  expect(element).toHaveAttribute("role", "presentation")
  expect(ref.current).toBe(element)
  expect(element).toHaveStyle({ width: "100%", height: "12px", borderRadius: "4px" })
  expect(element).toHaveStyleRule("animation", expect.stringContaining("1.5s ease-in infinite"))
  expect(element).toHaveStyleRule("animation", "none", {
    media: "(prefers-reduced-motion: reduce)",
  })
})

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])(
  "renders the %s shimmer from its theme with compact defaults and a motion opt-out",
  (_, base) => {
    const theme = { ...base, colors: { ...base.colors, border: "#102030", generic: "#405060" } }
    renderWithProviders(
      <StyleSheetManager
        shouldForwardProp={(prop, target) => typeof target !== "string" || isPropValid(prop)}
      >
        <Skeleton variant="shimmer" data-testid="skeleton" />
        <Skeleton variant="shimmer" width="240px" height="8px" round={2} data-testid="custom" />
      </StyleSheetManager>,
      { theme }
    )
    const element = screen.getByTestId("skeleton")
    expect(element).toHaveStyle({ width: "100px", height: "10px", borderRadius: "5px" })
    expect(element).toHaveStyleRule("background", expect.stringContaining("#102030 40%"))
    expect(element).toHaveStyleRule("background", expect.stringContaining("#405060 50%"))
    expect(element).toHaveStyleRule("background", expect.stringContaining("#102030 60%"))
    expect(element).toHaveStyleRule("background-size", "300%")
    expect(element).toHaveStyleRule("background-position-x", "100%")
    expect(element).toHaveStyleRule("animation", expect.stringContaining("1s infinite linear"))
    expect(element).toHaveStyleRule("animation", "none", {
      media: "(prefers-reduced-motion: reduce)",
    })
    expect(screen.getByTestId("custom")).toHaveStyle({
      width: "240px",
      height: "8px",
      borderRadius: "8px",
    })
  }
)

it("keeps pulse endpoints at half and full alpha of the supplied theme edge", () => {
  const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, borderSecondary: "#102030" } }
  renderWithProviders(
    <StyleSheetManager
      shouldForwardProp={(prop, target) => typeof target !== "string" || isPropValid(prop)}
    >
      <Skeleton />
    </StyleSheetManager>,
    { theme }
  )
  const styles = document.head.textContent
  expect(styles).toMatch(/background:\s*rgba\(16,\s*32,\s*48,\s*0\.5\)/)
  expect(styles).toMatch(/background:\s*rgba\(16,\s*32,\s*48,\s*1\)/)
})

it("scales default pulse and shimmer geometry with the local theme sub-unit", () => {
  const theme = {
    ...DefaultTheme,
    constants: { ...DefaultTheme.constants, SIZE_SUB_UNIT: 8, SIZE_UNIT: 16 },
  }
  renderWithProviders(
    <StyleSheetManager
      shouldForwardProp={(prop, target) => typeof target !== "string" || isPropValid(prop)}
    >
      <Skeleton data-testid="pulse" />
      <Skeleton variant="shimmer" data-testid="shimmer" />
    </StyleSheetManager>,
    { theme }
  )
  expect(screen.getByTestId("pulse")).toHaveStyle({
    width: "100%",
    height: "24px",
    borderRadius: "8px",
  })
  expect(screen.getByTestId("shimmer")).toHaveStyle({
    width: "200px",
    height: "20px",
    borderRadius: "10px",
  })
})
