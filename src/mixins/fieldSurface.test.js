import styled from "styled-components"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { chevronMark, fieldSurface, fieldHalo, fieldHaloShadow } from "@/index"

const Field = styled.input`
  ${fieldSurface}
`

const Invalid = styled.input`
  &:focus {
    ${fieldHalo("statusErrorText")}
  }
`

describe.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("field surface in %s", (name, theme) => {
  const { panelBg, controlBorder, inputBorderHover, segmentedFocus, statusErrorText } = theme.colors

  it("fills the field, edges it, and marks hover and focus", () => {
    renderWithProviders(<Field aria-label="Name" />, { theme })
    const field = screen.getByRole("textbox", { name: "Name" })

    expect(field).toHaveStyleRule("background", panelBg)
    expect(field).toHaveStyleRule("border", `1px solid ${controlBorder}`)
    expect(field).toHaveStyleRule("border-radius", "6px")
    expect(field).toHaveStyleRule("border-color", inputBorderHover, { modifier: "&:hover" })
    expect(field).toHaveStyleRule("border-color", segmentedFocus, { modifier: "&:focus" })
    expect(field).toHaveStyleRule("box-shadow", fieldHaloShadow(segmentedFocus), {
      modifier: "&:focus",
    })
    expect(field).toHaveStyleRule("outline", "none", { modifier: "&:focus" })
  })

  it("draws the halo in any token colour", () => {
    renderWithProviders(<Invalid aria-label="Port" />, { theme })

    expect(screen.getByRole("textbox", { name: "Port" })).toHaveStyleRule(
      "box-shadow",
      fieldHaloShadow(statusErrorText),
      { modifier: "&:focus" }
    )
  })
})

it("builds a soft 3px halo from a colour", () => {
  expect(fieldHaloShadow("#123456")).toBe("0 0 0 3px color-mix(in srgb, #123456 22%, transparent)")
})

it("draws the chevron from the text colour of its host", () => {
  expect(chevronMark).toMatchObject({
    borderRight: "1.5px solid currentColor",
    borderBottom: "1.5px solid currentColor",
  })
})
