import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import { Icon } from "./icon"

const renderIcon = props => {
  renderWithProviders(<Icon data-testid="icon" {...props} />)
  return screen.getByTestId("icon")
}

describe("Icon", () => {
  it("inherits the surrounding text color when no color is passed", () => {
    expect(renderIcon({ name: "alarm_bell" })).toHaveStyleRule("fill", "currentColor")
  })

  it("fills with the theme color when a color is passed", () => {
    expect(renderIcon({ name: "alarm_bell", color: "primary" })).toHaveStyleRule(
      "fill",
      DefaultTheme.colors.primary
    )
  })

  it("applies a hover color", () => {
    expect(renderIcon({ name: "alarm_bell", hoverColor: "error" })).toHaveStyleRule(
      "fill",
      DefaultTheme.colors.error,
      { modifier: ":hover" }
    )
  })

  it.each([
    ["small", "14px"],
    ["medium", "16px"],
    ["large", "24px"],
  ])("keeps the %s size at %s", (size, px) => {
    const icon = renderIcon({ name: "alarm_bell", size })
    expect(icon).toHaveStyleRule("width", px)
    expect(icon).toHaveStyleRule("height", px)
  })

  it("derives the size from the _s suffix", () => {
    expect(renderIcon({ name: "checkmark_s" })).toHaveStyleRule("width", "14px")
  })

  it("lets explicit width and height win", () => {
    const icon = renderIcon({ name: "alarm_bell", width: "18px", height: "20px" })
    expect(icon).toHaveStyleRule("width", "18px")
    expect(icon).toHaveStyleRule("height", "20px")
  })

  it("dims and disables pointer events when disabled", () => {
    const icon = renderIcon({ name: "alarm_bell", disabled: true })
    expect(icon).toHaveStyleRule("opacity", "0.4")
    expect(icon).toHaveStyleRule("pointer-events", "none")
  })

  it("rotates in quarter turns", () => {
    expect(renderIcon({ name: "alarm_bell", rotate: 1 })).toHaveStyleRule(
      "transform",
      "rotate(90deg)"
    )
  })

  it("renders nothing for an unknown icon name", () => {
    renderWithProviders(<Icon name="does_not_exist" data-testid="icon" />)
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument()
  })
})
