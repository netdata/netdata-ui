import { renderWithProviders, screen, fireEvent } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import Arrow from "./arrow"

const { colors } = DefaultTheme

describe("Navigation overflow Arrow", () => {
  it("is a labelled button that scrolls left", () => {
    const onClick = jest.fn()
    renderWithProviders(<Arrow name="navLeft" onClick={onClick} />)
    const button = screen.getByRole("button", { name: "Scroll tabs left" })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("is labelled for the right edge and pinned there", () => {
    renderWithProviders(<Arrow name="navRight" right onClick={() => {}} />)
    const button = screen.getByRole("button", { name: "Scroll tabs right" })
    expect(button).toHaveStyleRule("right", "0")
    expect(button).toHaveStyleRule("border-left", `1px solid ${colors.border}`)
  })

  it("separates the left arrow from the tabs with a divider", () => {
    renderWithProviders(<Arrow name="navLeft" onClick={() => {}} />)
    const button = screen.getByRole("button", { name: "Scroll tabs left" })
    expect(button).toHaveStyleRule("left", "0")
    expect(button).toHaveStyleRule("border-right", `1px solid ${colors.border}`)
  })

  it("has a 24px target with a hover surface and the green focus ring", () => {
    renderWithProviders(<Arrow name="navLeft" onClick={() => {}} />)
    const button = screen.getByRole("button", { name: "Scroll tabs left" })
    expect(button).toHaveStyleRule("width", "24px")
    expect(button).toHaveStyleRule("background-color", colors.menuItemHover, {
      modifier: ":hover",
    })
    expect(button).toHaveStyleRule("outline", `2px solid ${colors.primary}`, {
      modifier: ":focus-visible",
    })
    expect(button).toHaveStyleRule("outline-offset", "-2px", { modifier: ":focus-visible" })
  })
})

describe("Navigation overflow Arrow borders", () => {
  it("drops the native button border except the divider side", () => {
    renderWithProviders(<Arrow name="navRight" right onClick={() => {}} />)
    const button = screen.getByRole("button", { name: "Scroll tabs right" })
    expect(button).toHaveStyleRule("border-style", "none")
    expect(button).toHaveStyleRule("border-left-style", "solid")
  })
})
