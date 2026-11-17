import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { fieldHaloShadow } from "@/mixins/fieldSurface"
import { TextInput } from "./input"

describe.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("surface TextInput in %s", (name, theme) => {
  const { panelBg, controlBorder, inputBorderHover, segmentedFocus, error } = theme.colors

  it("keeps a filled field through hover and focus", () => {
    renderWithProviders(<TextInput appearance="surface" name="host" onChange={() => {}} />, {
      theme,
    })
    const field = screen.getByRole("textbox", { name: "host" })

    expect(field).toHaveStyleRule("background-color", panelBg)
    expect(field).toHaveStyleRule("border", `1px solid ${controlBorder}`)
    expect(field).toHaveStyleRule("border-radius", "6px")
    expect(field).toHaveStyleRule("border", `1px solid ${inputBorderHover}`, {
      modifier: "&:hover",
    })
    expect(field).toHaveStyleRule("background-color", panelBg, { modifier: "&:hover" })
    expect(field).toHaveStyleRule("border-color", segmentedFocus, { modifier: "&:focus-visible" })
    expect(field).toHaveStyleRule("background-color", panelBg, { modifier: "&:focus-visible" })
    expect(field).toHaveStyleRule("box-shadow", fieldHaloShadow(segmentedFocus), {
      modifier: "&:focus-visible",
    })
  })

  it("rings an invalid field in the error colour", () => {
    renderWithProviders(<TextInput appearance="surface" name="port" error onChange={() => {}} />, {
      theme,
    })
    const field = screen.getByRole("textbox", { name: "port" })

    expect(field).toHaveStyleRule("border-color", error, { modifier: "&:focus-visible" })
    expect(field).toHaveStyleRule("box-shadow", fieldHaloShadow(error), {
      modifier: "&:focus-visible",
    })
  })
})
