import React from "react"
import RangeInput from "./index"
import { renderWithProviders, screen, fireEvent } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"

const { colors } = DefaultTheme

const setup = (props, options) =>
  renderWithProviders(<RangeInput onChange={() => {}} {...props} />, options)

const range = () => screen.getByTestId("rangeInput")

describe("InputRange component", () => {
  test("should render component", () => {
    setup()
    expect(range()).toBeInTheDocument()
  })

  test("applies defaults", () => {
    setup()
    expect(range()).toHaveAttribute("type", "range")
    expect(range()).toHaveAttribute("min", "0")
    expect(range()).toHaveAttribute("max", "100")
    expect(range()).toHaveAttribute("step", "1")
    expect(range()).toHaveValue("0")
  })

  test("calls onChange when moved", () => {
    const onChange = jest.fn()
    setup({ value: 10, onChange })
    fireEvent.change(range(), { target: { value: "40" } })
    expect(onChange).toHaveBeenCalled()
  })

  test("fills proportionally to value", () => {
    setup({ value: 25 })
    expect(range()).toHaveStyleRule("background-size", "25% 100%")
  })

  test("fill accounts for min", () => {
    setup({ min: 50, max: 100, value: 75 })
    expect(range()).toHaveStyleRule("background-size", "50% 100%")
  })

  test("fill is empty at min", () => {
    setup({ min: 50, max: 100, value: 50 })
    expect(range()).toHaveStyleRule("background-size", "0% 100%")
  })

  test("track is 4px with a neutral unfilled color", () => {
    setup()
    expect(range()).toHaveStyleRule("height", "4px")
    expect(range()).toHaveStyleRule("border-radius", "2px")
    expect(range()).toHaveStyleRule("background-color", colors.border)
  })

  test("lifts the dark unfilled track one surface step above the border", () => {
    setup({}, { theme: DarkTheme })
    expect(range()).toHaveStyleRule("background-color", "#293030")
  })

  test("thumb is a 12px ring that does not grow when pressed", () => {
    setup()
    const thumb = { modifier: "::-webkit-slider-thumb" }
    expect(range()).toHaveStyleRule("width", "12px", thumb)
    expect(range()).toHaveStyleRule("height", "12px", thumb)
    expect(range()).toHaveStyleRule("border", `2px solid ${colors.primary}`, thumb)
    expect(range()).not.toHaveStyleRule("height", "16px", {
      modifier: "::-webkit-slider-thumb:active",
    })
  })

  test("thumb fills when pressed", () => {
    setup()
    expect(range()).toHaveStyleRule("background", colors.primary, {
      modifier: ":active::-webkit-slider-thumb",
    })
  })

  test("styles the Firefox thumb and progress", () => {
    setup()
    expect(range()).toHaveStyleRule("width", "12px", { modifier: "::-moz-range-thumb" })
    expect(range()).toHaveStyleRule("background", colors.primary, {
      modifier: "::-moz-range-progress",
    })
  })

  test("shows the focus ring on the thumb only", () => {
    setup()
    expect(range()).toHaveStyleRule("outline", "none", { modifier: ":focus-visible" })
    expect(range()).toHaveStyleRule(
      "box-shadow",
      `0 0 0 2px ${colors.mainBackground},0 0 0 4px ${colors.primary}`,
      { modifier: ":focus-visible::-webkit-slider-thumb" }
    )
  })

  test("fades when disabled", () => {
    setup({ disabled: true })
    expect(range()).toHaveStyleRule("opacity", "0.4", { modifier: ":disabled" })
    expect(range()).toBeDisabled()
  })

  test("respects reduced motion", () => {
    setup()
    expect(range()).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion: reduce)",
      modifier: "::-webkit-slider-thumb",
    })
  })
})
