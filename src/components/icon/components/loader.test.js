/**
 * @jest-environment jsdom
 */
import React, { createRef } from "react"
import { renderWithProviders } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { LoaderIcon } from "./loader"

describe("LoaderIcon", () => {
  it("stops animating when reduced motion is requested", () => {
    const { container } = renderWithProviders(<LoaderIcon />)
    const svg = container.firstChild
    expect(svg).toHaveStyleRule("animation", "none", {
      media: "(prefers-reduced-motion:reduce)",
    })
    expect(svg).toHaveStyleRule("stroke-dashoffset", "0", {
      media: "(prefers-reduced-motion:reduce)",
    })
  })
})

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("renders a compact themed ring with a native ref in %s", (_, theme) => {
  const ref = createRef()
  const { container } = renderWithProviders(
    <LoaderIcon
      variant="ring"
      ref={ref}
      size={2.5}
      thickness={0.375}
      color="statusMutedText"
      duration="800ms"
      aria-hidden="true"
      data-busy="test"
    />,
    { theme }
  )
  const ring = container.firstElementChild
  expect(ring.tagName).toBe("SPAN")
  expect(ref.current).toBe(ring)
  expect(ring).toHaveAttribute("aria-hidden", "true")
  expect(ring).toHaveAttribute("data-busy", "test")
  expect(ring).toHaveStyleRule("width", "10px")
  expect(ring).toHaveStyleRule("height", "10px")
  expect(ring).toHaveStyleRule("border", "1.5px solid currentColor")
  expect(ring).toHaveStyleRule("border-right-color", "rgba(255,255,255,0.0)")
  expect(ring).toHaveStyleRule("color", theme.colors.statusMutedText)
  expect(ring).toHaveStyleRule("animation", expect.stringMatching(/800ms linear infinite/))
  expect(ring).toHaveStyleRule("animation", "none", { media: "(prefers-reduced-motion:reduce)" })
})

it("keeps the drawing loader as the default", () => {
  const { container } = renderWithProviders(<LoaderIcon />)
  expect(container.firstElementChild.tagName).toBe("svg")
  expect(container.firstElementChild).toHaveAttribute("viewBox", "0 0 21 17")
  expect(container.querySelector("path")).not.toBeNull()
  expect(container.firstElementChild).toHaveStyleRule("width", "24px")
})
