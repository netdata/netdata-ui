import { renderWithProviders, screen, userEvent } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { Button } from "./button"

it.each([DefaultTheme, DarkTheme])(
  "keeps an explicit hover edge above active styling in $name",
  theme => {
    renderWithProviders(
      <Button
        neutral
        flavour="hollow"
        hoverBrightness={1.08}
        hoverBorderColor="textFocus"
        colorPalette={{
          buttonNeutralBorder: "controlBorder",
          buttonNeutralBorderHover: "controlBorder",
        }}
      >
        Action
      </Button>,
      { theme }
    )
    const button = screen.getByRole("button", { name: "Action" })
    const modifier = '&&:hover:not(:disabled):not([aria-disabled="true"])'
    expect(button).toHaveStyleRule("filter", "brightness(1.08)", { modifier })
    expect(button).toHaveStyleRule("border-color", theme.colors.textFocus, { modifier })
    expect(button).toHaveStyleRule("border-color", theme.colors.controlBorder, {
      modifier: "&&:active",
    })
  }
)

it("lets a disabled native control retain its own pointer target without activating", async () => {
  const onClick = jest.fn()
  renderWithProviders(
    <Button disabled pointerEvents="auto" onClick={onClick}>
      Disabled
    </Button>
  )
  const button = screen.getByRole("button", { name: "Disabled" })
  expect(button).toHaveStyleRule("pointer-events", "auto", { modifier: "&&" })
  expect(button).toBeDisabled()
  await userEvent.setup().click(button)
  expect(onClick).not.toHaveBeenCalled()
})

it("keeps an aria-disabled pointer-blocked control in keyboard navigation", async () => {
  renderWithProviders(
    <Button aria-disabled="true" pointerEvents="none">
      Blocked
    </Button>
  )
  const button = screen.getByRole("button", { name: "Blocked" })
  expect(button).toHaveStyleRule("pointer-events", "none", { modifier: "&&" })
  await userEvent.setup().tab()
  expect(button).toHaveFocus()
})

it("preserves default pointer behavior without adding hover effects", () => {
  const { rerender } = renderWithProviders(<Button>Default</Button>)
  const button = screen.getByRole("button", { name: "Default" })
  expect(button).toHaveStyleRule("pointer-events", "auto", { modifier: "&&" })
  expect(button).not.toHaveStyleRule("filter", undefined, {
    modifier: '&&:hover:not(:disabled):not([aria-disabled="true"])',
  })
  rerender(<Button disabled>Default</Button>)
  expect(button).toHaveStyleRule("pointer-events", "none", { modifier: "&&" })
})

it.each([DefaultTheme, DarkTheme])(
  "keeps pressed semantics separate from persistent painting in $name",
  theme => {
    renderWithProviders(
      <>
        <Button aria-pressed="true">Default pressed</Button>
        <Button aria-pressed="true" highlightPressed={false}>
          Semantic pressed
        </Button>
        <Button aria-pressed="true" highlightPressed={false} active>
          Explicit active
        </Button>
        <Button aria-expanded="true" highlightPressed={false}>
          Expanded
        </Button>
      </>,
      { theme }
    )
    const semantic = screen.getByRole("button", { name: "Semantic pressed" })
    expect(semantic).toHaveAttribute("aria-pressed", "true")
    expect(semantic).toHaveStyle({ backgroundColor: theme.colors.primary })
    expect(semantic).not.toHaveStyleRule("background-color", undefined, {
      modifier: '&&[aria-pressed="true"]',
    })
    expect(semantic).toHaveStyleRule("background-color", theme.colors.primaryPressed, {
      modifier: "&&:active",
    })
    expect(screen.getByRole("button", { name: "Default pressed" })).toHaveStyle({
      backgroundColor: theme.colors.primaryPressed,
    })
    expect(screen.getByRole("button", { name: "Explicit active" })).toHaveStyle({
      backgroundColor: theme.colors.primaryPressed,
    })
    expect(screen.getByRole("button", { name: "Expanded" })).toHaveStyle({
      backgroundColor: theme.colors.primaryPressed,
    })
  }
)
