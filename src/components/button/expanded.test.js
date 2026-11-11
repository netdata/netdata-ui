import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import IconButton from "./iconButton"

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("keeps disclosure expansion separate from selected appearance in %s", (name, theme) => {
  renderWithProviders(
    <>
      <IconButton
        icon="chevron_down"
        aria-label="Disclosure"
        aria-expanded="true"
        highlightExpanded={false}
        colorPalette={{ buttonNeutralBorderlessHover: "controlHoverBackground" }}
      />
      <IconButton icon="chevron_down" aria-label="Existing" aria-expanded="true" />
    </>,
    { theme }
  )
  const disclosure = screen.getByRole("button", { name: "Disclosure" })
  expect(disclosure).toHaveAttribute("aria-expanded", "true")
  expect(disclosure).toHaveStyle({ backgroundColor: theme.colors.transparent.full })
  expect(disclosure).toHaveStyleRule("background-color", theme.colors.controlHoverBackground, {
    modifier: "&&:hover",
  })
  expect(disclosure).toHaveStyleRule(
    "background-color",
    theme.colors.buttonNeutralBorderlessPressed,
    { modifier: "&&:active" }
  )
  expect(disclosure).toHaveStyleRule(
    "background-color",
    theme.colors.buttonNeutralBorderlessPressed,
    { modifier: '&&[aria-pressed="true"]' }
  )
  expect(screen.getByRole("button", { name: "Existing" })).toHaveStyle({
    backgroundColor: theme.colors.buttonNeutralBorderlessPressed,
  })
})
