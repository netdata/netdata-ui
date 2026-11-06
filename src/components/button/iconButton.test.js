import React from "react"
import { renderWithProviders, screen, fireEvent, act, user } from "testUtilities"
import { DarkTheme } from "@/theme/dark"
import { DefaultTheme } from "@/theme/default"
import IconButton from "./iconButton"

describe("IconButton", () => {
  // Round 6 D4: explicit squares on the control ladder, 28px by default.
  it("renders a 28px square neutral icon button with a 16px glyph", () => {
    renderWithProviders(<IconButton icon="plus" />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("min-width", "28px", { modifier: "&&" })
    expect(button).toHaveStyleRule("min-height", "28px", { modifier: "&&" })
    expect(button).toHaveStyleRule("width", "16px", { modifier: "&& .button-icon" })
    expect(button).toHaveStyleRule("color", DefaultTheme.colors.buttonNeutralFill, { modifier: "&&" })
  })

  it.each([
    ["compact", { compact: true }, "24px", "14px"],
    ["large", { large: true }, "32px", "16px"],
  ])("renders a %s square", (_, sizeProps, size, glyph) => {
    renderWithProviders(<IconButton icon="plus" {...sizeProps} />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("min-width", size, { modifier: "&&" })
    expect(button).toHaveStyleRule("min-height", size, { modifier: "&&" })
    expect(button).toHaveStyleRule("height", glyph, { modifier: "&& .button-icon" })
  })

  it("shows a neutral hover surface and an ink glyph on hover", () => {
    renderWithProviders(<IconButton icon="plus" />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("background-color", DefaultTheme.colors.buttonNeutralBorderlessHover, { modifier: "&&:hover" })
    expect(button).toHaveStyleRule("fill", DefaultTheme.colors.buttonNeutralFillHover, { modifier: "&&:hover .button-icon" })
  })

  it("keeps the pressed surface while its menu is expanded", () => {
    renderWithProviders(<IconButton icon="plus" aria-expanded="true" />)
    expect(screen.getByRole("button")).toHaveStyleRule("background-color", DefaultTheme.colors.buttonNeutralBorderlessPressed, {
      modifier: '&&[aria-expanded="true"]',
    })
  })

  it("uses the dark hover surface in the dark theme", () => {
    renderWithProviders(<IconButton icon="plus" />, { theme: DarkTheme })
    expect(screen.getByRole("button")).toHaveStyleRule("background-color", DarkTheme.colors.buttonNeutralBorderlessHover, {
      modifier: "&&:hover",
    })
  })

  // Consumers size glyphs against this historical axis mapping; changing it is a separate decision.
  it("keeps the legacy glyph axis mapping of width and height", () => {
    renderWithProviders(<IconButton icon="plus" width="20px" height="18px" />)
    const button = screen.getByRole("button")
    expect(button).toHaveStyleRule("height", "20px", { modifier: "&& .button-icon" })
    expect(button).toHaveStyleRule("width", "18px", { modifier: "&& .button-icon" })
  })

  it("calls onClick", () => {
    const onClick = jest.fn()
    renderWithProviders(<IconButton icon="plus" onClick={onClick} />)
    act(() => {
      fireEvent.click(screen.getByRole("button"))
    })
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("does not render a tooltip without tooltip text", () => {
    renderWithProviders(<IconButton icon="plus" />)
    fireEvent.mouseOver(screen.getByRole("button"))
    expect(screen.queryByTestId("drop")).not.toBeInTheDocument()
  })

  it("shows the tooltip on the inverse surface with the 6px floating radius", () => {
    jest.useFakeTimers()
    renderWithProviders(<IconButton icon="plus" tooltip="Previous" />)
    fireEvent.mouseOver(screen.getByRole("button"))
    act(() => jest.advanceTimersByTime(600))
    jest.useRealTimers()
    const text = screen.getByText("Previous")
    const bubble = text.parentElement
    expect(bubble).toHaveStyleRule("background-color", DefaultTheme.colors.tooltipBg)
    expect(bubble).toHaveStyleRule("border-radius", "6px")
    expect(text).toHaveStyleRule("color", DefaultTheme.colors.tooltipText)
  })

  it("uses the standard tooltip bubble: 13px text wrapping at 300px", () => {
    jest.useFakeTimers()
    renderWithProviders(<IconButton icon="plus" tooltip="Remove Status filter" />)
    fireEvent.mouseOver(screen.getByRole("button"))
    act(() => jest.advanceTimersByTime(600))
    jest.useRealTimers()
    const text = screen.getByText("Remove Status filter")
    expect(text).toHaveStyleRule("font-size", "13px")
    expect(text.parentElement).toHaveStyleRule("max-width", "300px")
  })

  it("stays natively disabled and out of the tab order by default", async () => {
    renderWithProviders(<IconButton icon="trashcan" tooltip="Delete" disabled />)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    await user().tab()
    expect(button).not.toHaveFocus()
  })

  describe("focusableWhenDisabled", () => {
    const setup = (props = {}) =>
      renderWithProviders(
        <IconButton
          icon="trashcan"
          tooltip="Managed by a parent"
          disabled
          focusableWhenDisabled
          {...props}
        />
      )

    it("uses aria-disabled instead of the native attribute so it stays in the tab order", async () => {
      setup()
      const button = screen.getByRole("button")
      expect(button).not.toBeDisabled()
      expect(button).toHaveAttribute("aria-disabled", "true")
      await user().tab()
      expect(button).toHaveFocus()
    })

    it("does not fire onClick from pointer or keyboard", async () => {
      const onClick = jest.fn()
      setup({ onClick })
      const u = user()
      await u.click(screen.getByRole("button"))
      await u.keyboard("{Enter}")
      expect(onClick).not.toHaveBeenCalled()
    })

    it("fades like a disabled control but keeps hover events for its tooltip", () => {
      setup()
      const button = screen.getByRole("button")
      expect(button).toHaveStyleRule("opacity", "0.4", { modifier: '&&[aria-disabled="true"]' })
      expect(button).toHaveStyleRule("pointer-events", "auto", { modifier: "&&" })
      jest.useFakeTimers()
      fireEvent.mouseOver(button)
      act(() => jest.advanceTimersByTime(600))
      jest.useRealTimers()
      expect(screen.getByText("Managed by a parent")).toBeInTheDocument()
    })

    it("does not react to hover", () => {
      setup()
      expect(screen.getByRole("button")).toHaveStyleRule(
        "background-color",
        "rgba(255,255,255,0.0)",
        {
          modifier: '&&[aria-disabled="true"]:hover',
        }
      )
    })

    it("works as a regular button when not disabled", async () => {
      const onClick = jest.fn()
      setup({ disabled: false, onClick })
      const button = screen.getByRole("button")
      expect(button).not.toHaveAttribute("aria-disabled")
      await user().click(button)
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})

describe("focusableWhenDisabled inside a form", () => {
  it("does not submit or reset the form when activated", async () => {
    const onSubmit = jest.fn(event => event.preventDefault())
    const onReset = jest.fn()
    renderWithProviders(
      <form onSubmit={onSubmit} onReset={onReset}>
        <IconButton icon="trashcan" tooltip="Locked" disabled focusableWhenDisabled />
        <IconButton icon="reload" type="reset" tooltip="Locked" disabled focusableWhenDisabled />
      </form>
    )
    const [submitButton, resetButton] = screen.getAllByRole("button")
    await user().click(submitButton)
    await user().click(resetButton)
    submitButton.focus()
    await user().keyboard("{Enter}")

    expect(onSubmit).not.toHaveBeenCalled()
    expect(onReset).not.toHaveBeenCalled()
    expect(submitButton).toHaveFocus()
  })
})
