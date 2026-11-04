import React from "react"
import { renderWithProviders, screen, fireEvent } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import Documentation from "."

const { colors } = DefaultTheme

const renderOpen = (props = {}) => {
  renderWithProviders(
    <Documentation app="agent" {...props}>
      {(toggle, isOpen) => <button onClick={toggle}>{isOpen ? "hide" : "show"} help</button>}
    </Documentation>
  )
  fireEvent.click(screen.getByRole("button", { name: "show help" }))
  return screen.getByTestId("documentation-layer")
}

describe("Documentation", () => {
  it("passes toggle and isOpen to children and opens the layer", () => {
    renderOpen()
    expect(screen.getByRole("button", { name: "hide help" })).toBeInTheDocument()
    expect(screen.getByTestId("documentation-layer")).toBeInTheDocument()
  })

  it("keeps every documented test id in the general view", () => {
    renderOpen()
    ;[
      "documentation-help-close",
      "dashboard-info",
      "documentation-link",
      "documentation-report-bug-link",
      "documentation-community-support-link",
      "demo-link",
    ].forEach(id => expect(screen.getByTestId(id)).toBeInTheDocument())
  })

  it("closes from the header and reports it", () => {
    const onCloseClick = jest.fn()
    renderOpen({ onCloseClick })
    fireEvent.click(screen.getByTestId("documentation-help-close"))
    expect(onCloseClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId("documentation-layer")).not.toBeInTheDocument()
  })

  it("switches to the dashboard view and back", () => {
    renderOpen()
    fireEvent.click(screen.getByTestId("dashboard-info"))
    expect(screen.getByTestId("dashboard")).toBeInTheDocument()
    fireEvent.click(screen.getByTestId("dashboard-back"))
    expect(screen.getByTestId("documentation-link")).toBeInTheDocument()
  })

  it("frames the panel as a floating surface with 8px radius and a hairline border", () => {
    const layer = renderOpen()
    expect(layer).toHaveStyleRule("border-radius", "8px")
    expect(layer).toHaveStyleRule("border", `1px solid ${colors.border}`)
    const shadow = colors.dropdownShadow
    expect(layer).toHaveStyleRule("box-shadow", `0 16px 40px -8px ${shadow},0 2px 6px ${shadow}`)
    expect(layer).toHaveStyleRule("padding", "16px")
  })

  it("divides the header with the shared border colour", () => {
    renderOpen()
    const header = screen.getByTestId("documentation-help-close").parentElement
    expect(header).toHaveStyleRule("border-bottom", `1px solid ${colors.border}`)
  })

  it("spends primary green on the docs link only", () => {
    renderOpen()
    expect(screen.getByTestId("documentation-link")).toHaveStyleRule(
      "background-color",
      colors.primary,
      { modifier: "&&" }
    )
    ;[
      "dashboard-info",
      "documentation-report-bug-link",
      "documentation-community-support-link",
      "demo-link",
    ].forEach(id =>
      expect(screen.getByTestId(id)).not.toHaveStyleRule("background-color", colors.primary, {
        modifier: "&&",
      })
    )
  })

  it("underlines the inline issue link on hover instead of shifting its hue", () => {
    renderOpen()
    const link = screen.getByRole("link", { name: "Open an issue" })
    expect(link).toHaveStyleRule("text-decoration", "underline", { modifier: "&&&:hover" })
    expect(link).not.toHaveStyleRule("color", colors.accent, { modifier: "&&&:hover" })
    expect(link).toHaveStyleRule("text-underline-offset", "2px", { modifier: "&&&:hover" })
  })

  it("separates the agent dashboard section with the shared border colour", () => {
    renderOpen()
    const separator = screen.getByTestId("dashboard-info").parentElement.parentElement.nextSibling
    expect(separator).toHaveStyleRule("background-color", colors.border)
  })
})
