/**
 * @jest-environment jsdom
 */
import React from "react"
import { renderWithProviders } from "testUtilities"
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
