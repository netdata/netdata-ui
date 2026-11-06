/**
 * @jest-environment jsdom
 */
import React from "react"
import { getContrast, mix } from "polished"
import { renderWithProviders, fireEvent, screen, user } from "testUtilities"
import { DarkTheme } from "@/theme/dark"
import { DefaultTheme } from "@/theme/default"
import { Button } from "./button"
import { ButtonGroup } from "./buttonGroup"

describe("Button states", () => {
  it("shows a focus ring for keyboard focus only", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("outline", "none", { modifier: "&&:focus" })
    expect(button).toHaveStyleRule("outline", expect.stringMatching(/^2px solid /), {
      modifier: "&&:focus-visible",
    })
    expect(button).toHaveStyleRule("outline-offset", "2px", { modifier: "&&:focus-visible" })
  })

  it("stops the loading spinner when reduced motion is requested", () => {
    const { container } = renderWithProviders(<Button label="Save" isLoading />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("animation", "none", {
      modifier: "&& .ntd-spinner",
      media: "(prefers-reduced-motion:reduce)",
    })
  })

  it("renders disabled", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" disabled />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("opacity", "0.4", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("pointer-events", "none", {
      modifier: "&&",
    })
  })

  it("renders a button with text being in default format", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "lowercase", {
      modifier: "&&>span",
    })
    expect(button).toHaveStyleRule("text-transform", "uppercase", {
      modifier: "&&>span::first-letter",
    })
  })

  it("renders a button with text that has no text-transform", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="none" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "none", {
      modifier: "&&>span",
    })
  })

  it("renders a button with text being capitalized", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="capitalize" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "capitalize", {
      modifier: "&&>span",
    })
  })

  it("renders a button with text being in uppercase", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="uppercase" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "uppercase", {
      modifier: "&&>span",
    })
  })

  it("renders a button with text being in lowercase", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="lowercase" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "lowercase", {
      modifier: "&&>span",
    })
  })

  it("renders a button with text being in full-width", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="fullWidth" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "full-width", {
      modifier: "&&>span",
    })
  })

  it("renders a text with only one capital letter, the first one", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="firstLetter" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "lowercase", {
      modifier: "&&>span",
    })
    expect(button).toHaveStyleRule("text-transform", "uppercase", {
      modifier: "&&>span::first-letter",
    })
  })

  it("renders loading text", () => {
    const { getByText } = renderWithProviders(
      <Button label="Test prop text" loadingLabel="loading..." isLoading />
    )
    expect(getByText(/loading/)).toBeInTheDocument()
  })

  it("renders with icon", () => {
    const { container, getByText, getByTitle } = renderWithProviders(
      <Button label="Test prop text" icon="plus" />
    )
    const button = container.firstChild

    expect(getByText(/prop text/)).toBeInTheDocument()
    expect(button).toHaveStyleRule("margin-left", "4px", {
      modifier: "&&>span",
    })
    expect(getByTitle("plus")).toBeInTheDocument()
  })

  it("renders only icon", () => {
    const { container } = renderWithProviders(<Button flavour="hollow" icon="plus" />)
    const button = container.firstChild
    expect(button).toMatchSnapshot()
  })

  it("renders smaller only icon", () => {
    const { container } = renderWithProviders(<Button flavour="hollow" icon="plus" small />)
    const button = container.firstChild
    expect(button).toMatchSnapshot()
  })

  it("renders active styles when active", () => {
    const { container } = renderWithProviders(<Button label="Test" active />)
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.primaryPressed,
      {
        modifier: "&&",
      }
    )
  })

  it("renders active styles while its dropdown is expanded", () => {
    const { container } = renderWithProviders(<Button label="Test" aria-expanded />)
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.primaryPressed,
      {
        modifier: '&&[aria-expanded="true"]',
      }
    )
  })

  it("renders loading icon", () => {
    const { container, getByText, queryByTitle } = renderWithProviders(
      <Button label="Test prop text" icon="plus" isLoading />
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(/prop text/)).toBeInTheDocument()
    expect(queryByTitle("plus")).not.toBeInTheDocument()
  })

  it("is clickable", () => {
    const onClickFn = jest.fn()
    const { getByText } = renderWithProviders(<Button label="Test prop text" onClick={onClickFn} />)

    fireEvent.click(getByText(/prop text/))
    expect(onClickFn).toHaveBeenCalled()
  })
})

describe("Default Button", () => {
  it("renders", () => {
    const { container, getByText } = renderWithProviders(
      <Button label="Test prop text" textTransform="fullWidth" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.primary, {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", DefaultTheme.colors.primary, {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FFFFFF", {
      modifier: "&&",
    })

    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it("renders for danger", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" danger />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#DB162F", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#DB162F", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FFFFFF", {
      modifier: "&&",
    })
  })

  it("renders for warning", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" warning />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#A05E00", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#A05E00", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FFFFFF", {
      modifier: "&&",
    })
  })

  it("renders neutral", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" neutral />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.buttonNeutralFill, {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", DefaultTheme.colors.buttonNeutralFill, {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FFFFFF", {
      modifier: "&&",
    })
  })
})

describe("Hollow Button", () => {
  it("renders", () => {
    const { container, getByText } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", DefaultTheme.colors.primary, {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.secondaryColor, {
      modifier: "&&",
    })

    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it("renders for danger", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" danger />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#DB162F", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#DB162F", {
      modifier: "&&",
    })
  })

  it("renders for warning", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" warning />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#A05E00", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#A05E00", {
      modifier: "&&",
    })
  })

  it("renders for neutral", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" neutral />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", DefaultTheme.colors.buttonNeutralBorder, {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.text, {
      modifier: "&&",
    })
  })
})

describe("Borderless Button", () => {
  it("renders", () => {
    const { container, getByText } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.primary, {
      modifier: "&&",
    })

    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it("renders for danger", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" danger />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#DB162F", {
      modifier: "&&",
    })
  })

  it("renders for warning", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" warning />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#A05E00", {
      modifier: "&&",
    })
  })

  it("renders for neutral", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" neutral />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.buttonNeutralFill, {
      modifier: "&&",
    })
  })
})

// Round 6 D5: a text-only action that keeps the control height.
describe("Link Button", () => {
  const transparent = "rgba(255,255,255,0.0)"

  it("is text in the tone colour with no surface or border", () => {
    renderWithProviders(<Button label="View docs" flavour="link" />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.primary, { modifier: "&&" })
    expect(button).toHaveStyleRule("background-color", transparent, { modifier: "&&" })
    expect(button).toHaveStyleRule("border-color", transparent, { modifier: "&&" })
    expect(button).toHaveStyleRule("text-decoration", "none", { modifier: "&&" })
  })

  it("underlines on hover without bringing up a surface", () => {
    renderWithProviders(<Button label="View docs" flavour="link" />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("text-decoration", "underline", { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("background-color", transparent, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("border-color", transparent, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("background-color", transparent, { modifier: "&&:active" })
  })

  it("keeps the control heights with a 4px text inset", () => {
    const { unmount } = renderWithProviders(<Button label="View docs" flavour="link" />)
    expect(screen.getByRole("button")).toHaveStyleRule("min-height", "28px", { modifier: "&&" })
    expect(screen.getByRole("button")).toHaveStyleRule("padding", "0 4px", { modifier: "&&" })
    unmount()
    renderWithProviders(<Button label="View docs" flavour="link" large />)
    expect(screen.getByRole("button")).toHaveStyleRule("min-height", "32px", { modifier: "&&" })
    expect(screen.getByRole("button")).toHaveStyleRule("padding", "0 4px", { modifier: "&&" })
  })

  it.each([
    ["danger", "error"],
    ["warning", "warning"],
  ])("uses the %s tone", (tone, colorKey) => {
    renderWithProviders(<Button label="Remove" flavour="link" {...{ [tone]: true }} />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("color", DefaultTheme.colors[colorKey], { modifier: "&&" })
    expect(button).toHaveStyleRule("background-color", transparent, { modifier: "&&:hover" })
  })
})

describe("Button sizing", () => {
  // Round 6 D1: one control ladder, 28px default.
  it("is 28px tall with 13px text, a 16px line box and 12px side padding by default", () => {
    const { container } = renderWithProviders(<Button label="Apply" />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("min-height", "28px", { modifier: "&&" })
    expect(button).toHaveStyleRule("font-size", "13px", { modifier: "&&" })
    expect(button).toHaveStyleRule("line-height", "16px", { modifier: "&&" })
    expect(button).toHaveStyleRule("padding", "0 12px", { modifier: "&&" })
  })

  it("is 32px tall with 14px text and 16px side padding when large", () => {
    const { container } = renderWithProviders(<Button label="Apply" large />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("min-height", "32px", { modifier: "&&" })
    expect(button).toHaveStyleRule("font-size", "14px", { modifier: "&&" })
    expect(button).toHaveStyleRule("line-height", "20px", { modifier: "&&" })
    expect(button).toHaveStyleRule("padding", "0 16px", { modifier: "&&" })
  })

  it("is 24px tall with 12px text and 12px side padding when compact", () => {
    const { container } = renderWithProviders(<Button label="Apply" compact />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("min-height", "24px", { modifier: "&&" })
    expect(button).toHaveStyleRule("font-size", "12px", { modifier: "&&" })
    expect(button).toHaveStyleRule("line-height", "16px", { modifier: "&&" })
    expect(button).toHaveStyleRule("padding", "0 12px", { modifier: "&&" })
  })

  it("does not forward compact to the DOM", () => {
    renderWithProviders(<Button label="Apply" compact />)
    expect(screen.getByRole("button")).not.toHaveAttribute("compact")
  })

  it.each([
    ["compact", { compact: true }, "24px"],
    ["default", {}, "28px"],
    ["large", { large: true }, "32px"],
  ])("is a square at the %s height when it only has an icon", (_, sizeProps, size) => {
    const { container } = renderWithProviders(<Button icon="plus" {...sizeProps} />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("min-width", size, { modifier: "&&" })
    expect(button).toHaveStyleRule("min-height", size, { modifier: "&&" })
    expect(button).toHaveStyleRule("padding", "0", { modifier: "&&" })
  })

  it("uses the 4px control radius", () => {
    const { container } = renderWithProviders(<Button label="Apply" />)
    expect(container.firstChild).toHaveStyleRule("border-radius", "4px", { modifier: "&&" })
  })
})

describe("Button state grammar", () => {
  it("draws the primary focus ring", () => {
    const { container } = renderWithProviders(<Button label="Apply" />)
    expect(container.firstChild).toHaveStyleRule(
      "outline",
      `2px solid ${DefaultTheme.colors.primary}`,
      {
        modifier: "&&:focus-visible",
      }
    )
  })

  it("steps darker on hover and pressed in the light theme", () => {
    const { container } = renderWithProviders(<Button label="Apply" />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.primaryHover, {
      modifier: "&&:hover",
    })
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.primaryPressed, {
      modifier: "&&:active",
    })
  })

  it("steps lighter on hover and darker when pressed in the dark theme", () => {
    const { container } = renderWithProviders(<Button label="Apply" />, { theme: DarkTheme })
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#00CD51", { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("background-color", "#009A3D", { modifier: "&&:active" })
  })

  it("does not draw an inset shadow when pressed", () => {
    const { container } = renderWithProviders(<Button label="Apply" active />)
    expect(container.firstChild).not.toHaveStyleRule("box-shadow", expect.anything(), {
      modifier: "&&",
    })
    expect(container.firstChild).not.toHaveStyleRule("box-shadow", expect.anything(), {
      modifier: "&&:active",
    })
  })

  it("keeps the neutral label readable on hover and pressed", () => {
    const { container } = renderWithProviders(<Button label="Apply" neutral />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.buttonNeutralFillHover, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.buttonNeutralText, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.buttonNeutralFillPressed, { modifier: "&&:active" })
  })

  it("keeps the neutral hollow icon foreground separate from its border", () => {
    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        buttonNeutralFill: "#123456",
        buttonNeutralBorder: "#ABCDEF",
      },
    }
    const { container } = renderWithProviders(
      <Button icon="plus" label="Add" neutral flavour="hollow" />,
      { theme }
    )
    expect(container.firstChild).toHaveStyleRule("border-color", "#ABCDEF", { modifier: "&&" })
    expect(container.firstChild).toHaveStyleRule("fill", "#123456", { modifier: "&& .button-icon" })
  })

  it("steps the neutral hollow border on hover", () => {
    const { container } = renderWithProviders(<Button label="Apply" neutral flavour="hollow" />)
    expect(container.firstChild).toHaveStyleRule("border-color", DefaultTheme.colors.buttonNeutralBorderHover, {
      modifier: "&&:hover",
    })
  })

  it("uses the dedicated neutral hollow pressed surface", () => {
    const { container } = renderWithProviders(<Button label="Apply" neutral flavour="hollow" />)
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.buttonNeutralHollowPressed,
      { modifier: "&&:active" }
    )
  })

  it("gives neutral borderless buttons a hover surface", () => {
    const { container } = renderWithProviders(<Button icon="plus" neutral flavour="borderless" />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.buttonNeutralBorderlessHover, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.buttonNeutralFillHover, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.buttonNeutralBorderlessPressed, { modifier: "&&:active" })
  })

  it("keeps primary borderless buttons flat on hover", () => {
    const { container } = renderWithProviders(<Button label="Edit" flavour="borderless" />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&:hover",
    })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.primaryHover, {
      modifier: "&&:hover",
    })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.primaryPressed, {
      modifier: "&&:active",
    })
  })

  it("maps a legacy colorPalette onto hover and pressed", () => {
    const colorPalette = {
      primary: "primaryAI",
      accent: "accentAI",
      primaryHighlight: "primaryHighlightAI",
    }
    const { container } = renderWithProviders(<Button label="Ask AI" colorPalette={colorPalette} />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.accentAI, {
      modifier: "&&:hover",
    })
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.primaryHighlightAI, {
      modifier: "&&:active",
    })
  })

  it("uses custom contrast ink tokens from a color palette", () => {
    const colorPalette = {
      attention: "#FFFFFF",
      onColorDark: "#123456",
      onColorLight: "#FEDCBA",
    }
    const { container } = renderWithProviders(
      <Button label="Ask AI" color="attention" colorPalette={colorPalette} />
    )
    expect(container.firstChild).toHaveStyleRule("color", "#123456", { modifier: "&&" })
  })

  it("animates only colours, and not at all under reduced motion", () => {
    const { container } = renderWithProviders(<Button label="Apply" />)
    const button = container.firstChild
    expect(button).toHaveStyleRule(
      "transition",
      expect.stringMatching(/^background-color 140ms ease-out/),
      {
        modifier: "&&",
      }
    )
    expect(button).toHaveStyleRule("transition", "none", {
      modifier: "&&",
      media: "(prefers-reduced-motion:reduce)",
    })
  })
})

// WCAG AA for 12px labels.
const readableOn = background => ({
  asymmetricMatch: color => getContrast(color, background) >= 4.5,
  toAsymmetricMatcher: () => `a colour with >= 4.5:1 contrast on ${background}`,
})

const readableThemeInk = (theme, background) =>
  getContrast(theme.colors.onColorDark, background) >= getContrast(theme.colors.onColorLight, background)
    ? theme.colors.onColorDark
    : theme.colors.onColorLight

describe("Button status and neutral steps", () => {
  const steps = {
    light: {
      theme: DefaultTheme,
      danger: "#DB162F",
      warning: "#A05E00",
    },
    dark: {
      theme: DarkTheme,
      danger: "#DB162F",
      warning: "#BF7100",
    },
  }

  Object.entries(steps).forEach(([themeName, { theme, ...tones }]) => {
    Object.entries(tones).forEach(([tone, rest]) => {
      const hover = mix(0.12, theme.colors.main, rest)
      const pressed = mix(0.24, theme.colors.main, rest)
      it(`steps ${tone} one mix toward the ink colour in the ${themeName} theme`, () => {
        renderWithProviders(<Button label="Delete" {...{ [tone]: true }} />, { theme })
        const button = screen.getByRole("button")
        expect(button).toHaveStyleRule("background-color", rest, { modifier: "&&" })
        expect(button).toHaveStyleRule("background-color", hover, { modifier: "&&:hover" })
        expect(button).toHaveStyleRule("background-color", pressed, { modifier: "&&:active" })
        expect(button).toHaveStyleRule("border-color", pressed, { modifier: "&&:active" })
      })

      it(`keeps the ${tone} label readable in every state in the ${themeName} theme`, () => {
        renderWithProviders(<Button label="Delete" {...{ [tone]: true }} />, { theme })
        const button = screen.getByRole("button")
        expect(button).toHaveStyleRule("color", readableThemeInk(theme, rest), { modifier: "&&" })
        expect(button).toHaveStyleRule("color", readableThemeInk(theme, hover), { modifier: "&&:hover" })
        expect(button).toHaveStyleRule("color", readableThemeInk(theme, pressed), { modifier: "&&:active" })
      })

      it(`does not dim a pressed borderless ${tone} label in the ${themeName} theme`, () => {
        renderWithProviders(<Button label="Delete" flavour="borderless" {...{ [tone]: true }} />, {
          theme,
        })
        const button = screen.getByRole("button")
        const surface = theme.colors.mainBackground
        expect(button).toHaveStyleRule("color", pressed, { modifier: "&&:active" })
        expect(getContrast(pressed, surface)).toBeGreaterThan(getContrast(rest, surface))
      })
    })
  })

  it("steps a custom colour the same way", () => {
    renderWithProviders(<Button label="Go" color="primary" />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule(
      "background-color",
      mix(0.12, DefaultTheme.colors.main, DefaultTheme.colors.primary),
      { modifier: "&&:hover" }
    )
    expect(button).toHaveStyleRule(
      "background-color",
      mix(0.24, DefaultTheme.colors.main, DefaultTheme.colors.primary),
      { modifier: "&&:active" }
    )
  })

  it("tints a hollow custom-colour button with its own hue, not primary green", () => {
    renderWithProviders(<Button label="Go" flavour="hollow" color="attention" />, {
      theme: DarkTheme,
    })
    const button = screen.getByRole("button")
    const surface = "rgba(219,148,244,0.12)"
    expect(button).toHaveStyleRule("background-color", surface, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("background-color", surface, { modifier: "&&:active" })
  })

  it("steps the dark neutral button one grey step instead of jumping to white", () => {
    renderWithProviders(<Button label="Apply" neutral />, { theme: DarkTheme })
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("background-color", DarkTheme.colors.buttonNeutralFillHover, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("background-color", DarkTheme.colors.buttonNeutralFillPressed, { modifier: "&&:active" })
    expect(button).toHaveStyleRule("color", DarkTheme.colors.buttonNeutralText, { modifier: "&&:active" })
  })

  it("steps the dark neutral borderless label without jumping to white", () => {
    renderWithProviders(<Button label="More" neutral flavour="borderless" />, { theme: DarkTheme })
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("color", DarkTheme.colors.buttonNeutralFillHover, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("color", DarkTheme.colors.buttonNeutralFillPressed, { modifier: "&&:active" })
  })
})

describe("Button typography", () => {
  it("inherits the body font instead of the user-agent button font", () => {
    renderWithProviders(<Button label="Apply" />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("font-family", "inherit", { modifier: "&&" })
    // jsdom applies the cascade but does not resolve inheritance, so the winning value is "inherit".
    expect(window.getComputedStyle(button).fontFamily).toBe("inherit")
  })

  it("gives the selected segment the same label weight in both themes", () => {
    const items = [
      { label: "1h", value: "1h" },
      { label: "6h", value: "6h" },
    ]
    const { unmount } = renderWithProviders(<ButtonGroup items={items} value="6h" />)
    expect(screen.getByRole("button", { name: "6h" })).toHaveStyleRule("font-weight", "500", {
      modifier: "&&",
    })
    unmount()
    renderWithProviders(<ButtonGroup items={items} value="6h" />, { theme: DarkTheme })
    expect(screen.getByRole("button", { name: "6h" })).toHaveStyleRule("font-weight", "500", {
      modifier: "&&",
    })
  })
})

describe("Button behaviour", () => {
  it("does not call onClick while loading", async () => {
    const onClick = jest.fn()
    renderWithProviders(<Button label="Save" isLoading onClick={onClick} />)
    await user().click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("can be activated from the keyboard", async () => {
    const onClick = jest.fn()
    renderWithProviders(<Button label="Save" onClick={onClick} />)
    await user().tab()
    expect(screen.getByRole("button")).toHaveFocus()
    await user().keyboard("{Enter}")
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("forwards the ref to the native button", () => {
    const ref = React.createRef()
    renderWithProviders(<Button label="Save" ref={ref} />)
    expect(ref.current).toBe(screen.getByRole("button"))
  })
})
