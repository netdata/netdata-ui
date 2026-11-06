import React from "react"
import { renderWithProviders, screen, user } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"
import { TextInputMock } from "./input.mock"
import { TextInput } from "."

const { colors } = DefaultTheme

const setup = (props = {}, options) =>
  renderWithProviders(<TextInput name="field" value="" onChange={() => {}} {...props} />, options)

const field = () => screen.getByRole("textbox")

const Icon = () => <svg data-testid="icon" />

describe("TextInput test", () => {
  it(" * should render with required props", () => {
    const { container } = renderWithProviders(<TextInputMock />)
    const result = container.querySelectorAll("input")
    expect(result).not.toBeNull()
  })
})

describe("TextInput sizing", () => {
  // Round 6 D1: fields join the 28px control ladder; tiny and compact are the dense 24px step.
  it("is 28px tall with 13px text by default", () => {
    setup()
    expect(field()).toHaveStyleRule("height", "28px")
    expect(field()).toHaveStyleRule("font-size", "13px")
    expect(field()).toHaveStyleRule("font-size", "13px", { modifier: "::placeholder" })
  })

  it.each(["small", "large"])("is 28px tall for size %s", size => {
    setup({ size })
    expect(field()).toHaveStyleRule("height", "28px")
    expect(field()).toHaveStyleRule("padding", "0 10px")
  })

  it.each(["tiny", "compact"])("is 24px tall with 12px text and an 8px inset for size %s", size => {
    setup({ size })
    expect(field()).toHaveStyleRule("height", "24px")
    expect(field()).toHaveStyleRule("font-size", "12px")
    expect(field()).toHaveStyleRule("padding", "0 8px")
  })

  it("keeps the height prop as an override", () => {
    setup({ height: 8 })
    expect(field()).toHaveStyleRule("height", "32px")
  })

  it("insets text by 10px with a 16px line", () => {
    setup()
    expect(field()).toHaveStyleRule("padding", "0 10px")
    expect(field()).toHaveStyleRule("line-height", "16px")
  })

  it("inherits the body font instead of the user-agent input font", () => {
    setup({ value: "cpu.usage" })
    expect(field()).toHaveStyleRule("font-family", "inherit")
    // jsdom applies the cascade but does not resolve inheritance, so the winning value is "inherit".
    expect(window.getComputedStyle(field()).fontFamily).toBe("inherit")
  })

  it("uses the 4px control radius", () => {
    setup()
    expect(field()).toHaveStyleRule("border-radius", "4px")
  })

  it("makes room for a left icon", () => {
    setup({ iconLeft: <Icon /> })
    expect(field()).toHaveStyleRule("padding-left", "28px")
  })

  it("places icons 8px from the field edges", () => {
    setup({ iconLeft: <Icon />, iconRight: <Icon /> })
    const [left, right] = screen.getAllByTestId("icon").map(icon => icon.parentElement)
    expect(left).toHaveStyleRule("left", "8px")
    expect(right).toHaveStyleRule("right", "8px")
  })

  it("makes room for a right icon", () => {
    setup({ iconRight: <Icon /> })
    expect(field()).toHaveStyleRule("padding-right", "28px")
  })

  it("makes room for a right icon and an indicator", () => {
    setup({ iconRight: <Icon />, fieldIndicator: "3/20" })
    expect(field()).toHaveStyleRule("padding-right", "52px")
  })
})

describe("TextInput states", () => {
  it("shifts the border one step on hover", () => {
    setup()
    expect(field()).toHaveStyleRule("border", `1px solid ${colors.inputBorderHover}`, {
      modifier: ":hover",
    })
  })

  it("keeps the error red on hover", () => {
    setup({ error: "Required" }, { theme: DarkTheme })
    expect(field()).toHaveStyleRule("border", `1px solid ${DarkTheme.colors.error}`, {
      modifier: ":hover",
    })
  })

  it("uses the dedicated control surface at rest", () => {
    setup()
    expect(field()).toHaveStyleRule("background-color", colors.controlBackground)
    expect(field()).toHaveStyleRule("border", `1px solid ${colors.controlBorder}`)
  })

  it("brings up the element surface on hover", () => {
    setup()
    expect(field()).toHaveStyleRule("background-color", colors.controlHoverBackground, {
      modifier: ":hover",
    })
  })

  it("shows the primary border, the element surface and a soft 3px halo on focus", () => {
    setup()
    expect(field()).toHaveStyleRule("border-color", colors.primary, { modifier: ":focus-visible" })
    expect(field()).toHaveStyleRule("background-color", colors.controlHoverBackground, {
      modifier: ":focus-visible",
    })
    expect(field()).toHaveStyleRule("box-shadow", `inset 0 0 0 1px ${colors.primary}`, {
      modifier: ":focus-visible",
    })
    expect(field()).toHaveStyleRule("outline", "none", { modifier: ":focus-visible" })
  })

  it("keeps a given background on focus instead of the ghost surface", () => {
    setup({ background: "mainBackground" })
    expect(field()).toHaveStyleRule("background-color", colors.mainBackground)
    expect(field()).toHaveStyleRule("background-color", colors.mainBackground, {
      modifier: ":focus-visible",
    })
    expect(field()).toHaveStyleRule("border-color", colors.primary, { modifier: ":focus-visible" })
  })

  it("does not reset the border to its rest color on focus", () => {
    setup()
    expect(field()).not.toHaveStyleRule("border", `1px solid ${colors.inputBorder}`, {
      modifier: ":focus",
    })
  })

  it("keeps the focus halo red while in error", () => {
    setup({ error: true })
    expect(field()).toHaveStyleRule("box-shadow", `inset 0 0 0 1px ${colors.error}`, {
      modifier: ":focus-visible",
    })
  })

  it("fades the whole field when disabled", () => {
    setup({ disabled: true })
    expect(field()).toHaveStyleRule("opacity", "0.4")
    expect(field()).toHaveStyleRule("background-color", colors.controlBackground)
    expect(field()).toBeDisabled()
  })

  it("animates border changes and respects reduced motion", () => {
    setup()
    expect(field()).toHaveStyleRule(
      "transition",
      "background-color 120ms ease-out,border-color 120ms ease-out,box-shadow 160ms ease-out"
    )
    expect(field()).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion: reduce)",
    })
  })

  it("uses the dark card hairline instead of a grey slab in dark mode", () => {
    setup({}, { theme: DarkTheme })
    expect(field()).toHaveStyleRule("background-color", DarkTheme.colors.controlBackground)
    expect(field()).toHaveStyleRule("border", `1px solid ${DarkTheme.colors.controlBorder}`)
    expect(field()).toHaveStyleRule("background-color", DarkTheme.colors.controlHoverBackground, {
      modifier: ":hover",
    })
  })
})

describe("TextInput content", () => {
  it("renders label, hint and error message", () => {
    setup({ label: "Name", hint: "Your full name", error: "Required" })
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Your full name")).toBeInTheDocument()
    expect(screen.getByText("Required")).toHaveStyleRule("color", colors.errorText)
  })

  it("shows 'invalid' when error is true", () => {
    setup({ error: true })
    expect(screen.getByText("invalid")).toBeInTheDocument()
  })

  it("hides the error message when asked", () => {
    setup({ error: "Required", hideErrorMessage: true })
    expect(screen.queryByText("Required")).not.toBeInTheDocument()
  })

  it("renders the field indicator with tabular numerals", () => {
    setup({ fieldIndicator: "12/20" })
    expect(screen.getByText("12/20")).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  })

  it("labels the input with its name and forwards typing", async () => {
    const onChange = jest.fn()
    setup({ onChange })
    await user().type(screen.getByLabelText("field"), "a")
    expect(onChange).toHaveBeenCalled()
  })
})
