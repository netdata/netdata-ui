import React, { createRef } from "react"
import { renderWithProviders, screen } from "testUtilities"
import VisuallyHidden from "./index"

it("keeps a hidden label in the accessible name with a native ref", () => {
  const ref = createRef()
  renderWithProviders(
    <>
      <VisuallyHidden as="label" ref={ref} htmlFor="path">
        Secret path
      </VisuallyHidden>
      <input id="path" />
    </>
  )
  expect(screen.getByRole("textbox", { name: "Secret path" })).toBeInTheDocument()
  expect(ref.current.tagName).toBe("LABEL")
  expect(ref.current).not.toHaveAttribute("aria-hidden")
  expect(ref.current).toHaveStyleRule("position", "absolute")
  expect(ref.current).toHaveStyleRule("clip", "rect(0 0 0 0)")
  expect(ref.current).toHaveStyleRule("width", "1px")
})

it("preserves live-region attributes and literal text on the default span", () => {
  renderWithProviders(
    <VisuallyHidden role="status" aria-live="polite" data-testid="announcement">
      3 changes
    </VisuallyHidden>
  )
  const hidden = screen.getByRole("status")
  expect(hidden.tagName).toBe("SPAN")
  expect(hidden).toHaveAttribute("aria-live", "polite")
  expect(hidden).toHaveTextContent("3 changes")
  expect(hidden).toHaveAttribute("data-testid", "announcement")
})
