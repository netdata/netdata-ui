import { DefaultTheme, DarkTheme } from "@/theme"
import { modalShadow, scrimColor, isDarkTheme } from "./elevation"

describe("elevation", () => {
  it("builds one modal shadow recipe from the theme dropdownShadow colour", () => {
    const light = DefaultTheme.colors.dropdownShadow
    const dark = DarkTheme.colors.dropdownShadow

    expect(modalShadow({ theme: DefaultTheme })).toBe(
      `0 16px 40px -8px ${light}, 0 2px 6px ${light}`
    )
    expect(modalShadow({ theme: DarkTheme })).toBe(`0 16px 40px -8px ${dark}, 0 2px 6px ${dark}`)
  })

  it("detects dark themes from the main background, not the theme name", () => {
    expect(isDarkTheme({ theme: DefaultTheme })).toBe(false)
    expect(isDarkTheme({ theme: DarkTheme })).toBe(true)
    expect(isDarkTheme({ theme: { ...DarkTheme, name: "Custom" } })).toBe(true)
  })

  it("uses an ink scrim on light and a near-black scrim on dark", () => {
    expect(scrimColor({ theme: DefaultTheme })).toBe("rgba(53, 65, 74, 0.32)")
    expect(scrimColor({ theme: DarkTheme })).toBe("rgba(8, 10, 10, 0.6)")
  })
})

describe("sidePanelShadow", () => {
  it("casts the modal shadow horizontally toward the page content", () => {
    const { sidePanelShadow } = require("./elevation")
    const c = DefaultTheme.colors.dropdownShadow

    expect(sidePanelShadow({ theme: DefaultTheme, side: "left" })).toBe(
      `16px 0 40px -8px ${c}, 2px 0 6px ${c}`
    )
    expect(sidePanelShadow({ theme: DefaultTheme, side: "right" })).toBe(
      `-16px 0 40px -8px ${c}, -2px 0 6px ${c}`
    )
  })
})
