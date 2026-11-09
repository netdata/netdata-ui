import React, { useState } from "react"
import { renderWithProviders, fireEvent, screen, user } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { Button } from "./button"

const themes = [
  ["light", DefaultTheme],
  ["dark", DarkTheme],
]

describe.each(themes)("surface Button in %s", (name, theme) => {
  it("preserves a filled neutral control surface through hover and selected states", () => {
    renderWithProviders(<Button neutral flavour="hollow" appearance="surface" label="Class" />, {
      theme,
    })
    for (const token of ["controlText", "controlHoverText", "controlPressedText"]) {
      expect(theme.colors[token]).toBe(theme.colors.textFocus)
    }
    const button = screen.getByRole("button", { name: "Class" })
    expect(button).toHaveStyleRule("background-color", theme.colors.controlBackground, {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", theme.colors.border, { modifier: "&&" })
    expect(button).toHaveStyleRule("color", theme.colors.textFocus, { modifier: "&&" })
    expect(button).toHaveStyleRule("border-radius", "4px", { modifier: "&&" })
    expect(button).toHaveStyleRule("background-color", theme.colors.controlHoverBackground, {
      modifier: "&&:hover",
    })
    expect(button).toHaveStyleRule("border-color", theme.colors.controlBorder, {
      modifier: "&&:hover",
    })
    expect(button).toHaveStyleRule("color", theme.colors.textFocus, { modifier: "&&:hover" })
    for (const modifier of ["&&:active", '&&[aria-pressed="true"]', '&&[aria-expanded="true"]']) {
      expect(button).toHaveStyleRule("background-color", theme.colors.controlPressedBackground, {
        modifier,
      })
      expect(button).toHaveStyleRule("border-color", theme.colors.controlBorder, { modifier })
      expect(button).toHaveStyleRule("color", theme.colors.textFocus, { modifier })
    }
  })

  it("maps surface label and icon ink independently for every state", () => {
    const palette = {
      controlText: "statusMutedText",
      controlHoverText: "textFocus",
      controlPressedText: "text",
    }
    renderWithProviders(
      <>
        <Button
          neutral
          flavour="hollow"
          appearance="surface"
          label="Filters"
          icon="gear"
          colorPalette={palette}
        />
        <Button
          neutral
          flavour="hollow"
          appearance="surface"
          label="Disabled Filters"
          icon="gear"
          colorPalette={palette}
          aria-disabled="true"
        />
      </>,
      { theme }
    )
    const button = screen.getByRole("button", { name: "Filters" })
    expect(button).toHaveStyleRule("color", theme.colors.statusMutedText, { modifier: "&&" })
    expect(button).toHaveStyleRule("fill", theme.colors.statusMutedText, {
      modifier: "&& .button-icon",
    })
    expect(button).toHaveStyleRule("color", theme.colors.textFocus, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("fill", theme.colors.textFocus, {
      modifier: "&&:hover .button-icon",
    })
    for (const modifier of ["&&:active", '&&[aria-pressed="true"]', '&&[aria-expanded="true"]']) {
      expect(button).toHaveStyleRule("color", theme.colors.text, { modifier })
    }
    const disabled = screen.getByRole("button", { name: "Disabled Filters" })
    expect(disabled).toHaveStyleRule("color", theme.colors.statusMutedText, {
      modifier: '&&[aria-disabled="true"]:hover',
    })
    expect(disabled).toHaveStyleRule("fill", theme.colors.statusMutedText, {
      modifier: '&&[aria-disabled="true"]:hover .button-icon',
    })
  })

  it.each([
    [{ danger: true }, "error"],
    [{ warning: true }, "warning"],
    [{ color: "attention" }, "attention"],
  ])("preserves special ink %j instead of applying surface palette roles", (special, token) => {
    renderWithProviders(
      <Button
        neutral
        flavour="hollow"
        appearance="surface"
        label="Special"
        colorPalette={{
          controlText: "statusMutedText",
          controlHoverText: "statusMutedText",
          controlPressedText: "statusMutedText",
        }}
        {...special}
      />,
      { theme }
    )
    expect(screen.getByRole("button")).toHaveStyleRule("color", theme.colors[token], {
      modifier: "&&",
    })
  })

  it("keeps an aria-disabled surface at its resting colors on hover", () => {
    renderWithProviders(
      <Button neutral flavour="hollow" appearance="surface" label="Class" aria-disabled="true" />,
      { theme }
    )
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-disabled", "true")
    expect(button).toHaveStyleRule("background-color", theme.colors.controlBackground, {
      modifier: '&&[aria-disabled="true"]:hover',
    })
    expect(button).toHaveStyleRule("border-color", theme.colors.border, {
      modifier: '&&[aria-disabled="true"]:hover',
    })
  })

  it("leaves neutral hollow defaults transparent with their existing border", () => {
    renderWithProviders(<Button neutral flavour="hollow" label="Class" />, { theme })
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("background-color", theme.colors.transparent.full, {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", theme.colors.buttonNeutralBorder, {
      modifier: "&&",
    })
  })
})

it("retains native disabled and pressed attributes and keyboard activation", async () => {
  const Control = () => {
    const [pressed, setPressed] = useState(false)
    return (
      <Button
        neutral
        flavour="hollow"
        appearance="surface"
        aria-pressed={pressed}
        onClick={() => setPressed(value => !value)}
        label="Class"
      />
    )
  }
  const { unmount } = renderWithProviders(<Control />)
  const actor = user()
  await actor.tab()
  await actor.keyboard("{Enter}")
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true")
  unmount()
  const onClick = jest.fn()
  renderWithProviders(
    <Button
      neutral
      flavour="hollow"
      appearance="surface"
      disabled
      onClick={onClick}
      label="Class"
    />
  )
  expect(screen.getByRole("button")).toBeDisabled()
  fireEvent.click(screen.getByRole("button"))
  expect(onClick).not.toHaveBeenCalled()
})

it("supports a token-array palette override for an originally transparent surface", () => {
  renderWithProviders(
    <Button
      neutral
      flavour="hollow"
      appearance="surface"
      label="Filter"
      colorPalette={{ controlBackground: ["transparent", "full"] }}
    />
  )
  const button = screen.getByRole("button")
  expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.transparent.full, {
    modifier: "&&",
  })
  expect(button).toHaveStyleRule("color", DefaultTheme.colors.textFocus, { modifier: "&&" })
})
