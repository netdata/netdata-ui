import React from "react"
import { renderWithProviders, screen, user } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"
import { Toggle } from "."

const OutlineToggle = props => (
  <Toggle variant="outline" size="small" checked={false} onChange={() => {}} {...props} />
)

it.each([
  ["small", "34px", "20px", "13px", "2px", "14px"],
  ["compact", "26px", "16px", "9px", "2px", "10px"],
])(
  "centres the %s outline switch knob at both ends",
  (size, width, height, knob, inset, travel) => {
    const { rerender } = renderWithProviders(<OutlineToggle size={size} />)
    const track = screen.getByRole("switch").nextElementSibling
    expect(track).toHaveStyleRule("width", width)
    expect(track).toHaveStyleRule("height", height)
    expect(track).toHaveStyleRule("border-width", "1.5px")
    expect(track).toHaveStyleRule("width", knob, { modifier: ":after" })
    expect(track).toHaveStyleRule("height", knob, { modifier: ":after" })
    expect(track).toHaveStyleRule("left", inset, { modifier: ":after" })
    expect(track).toHaveStyleRule("top", inset, { modifier: ":after" })
    rerender(<OutlineToggle size={size} checked />)
    expect(screen.getByRole("switch").nextElementSibling).toHaveStyleRule(
      "transform",
      `translateX(${travel})`,
      { modifier: ":after" }
    )
  }
)

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("uses the outline palette in the %s theme", (_, theme) => {
  const { rerender } = renderWithProviders(<OutlineToggle />, { theme })
  const track = screen.getByRole("switch").nextElementSibling
  expect(track).toHaveStyleRule("background", "rgba(255,255,255,0.0)")
  expect(track).toHaveStyleRule("border-color", theme.colors.controlBorder)
  expect(track).toHaveStyleRule("background-color", theme.colors.controlBorder, {
    modifier: ":after",
  })
  rerender(<OutlineToggle checked />)
  const onTrack = screen.getByRole("switch").nextElementSibling
  expect(onTrack).toHaveStyleRule("background", theme.colors.segmentedAccentText)
  expect(onTrack).toHaveStyleRule("border-color", theme.colors.segmentedAccentText)
  expect(onTrack).toHaveStyleRule("background-color", theme.colors.buttonNeutralText, {
    modifier: ":after",
  })
})

it("opts into Enter activation once without submitting its form", async () => {
  const onChange = jest.fn()
  const onSubmit = jest.fn(e => e.preventDefault())
  renderWithProviders(
    <form onSubmit={onSubmit}>
      <OutlineToggle activateOnEnter onChange={onChange} />
    </form>
  )
  await user().tab()
  await user().keyboard("{Enter}")
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onSubmit).not.toHaveBeenCalled()
})

it("retains checkbox Enter behavior by default", async () => {
  const onChange = jest.fn()
  renderWithProviders(<OutlineToggle onChange={onChange} />)
  await user().tab()
  await user().keyboard("{Enter}")
  expect(onChange).not.toHaveBeenCalled()
})

it("keeps a compact switch label clickable with a fractional label gap", async () => {
  const onChange = jest.fn()
  renderWithProviders(
    <OutlineToggle
      size="compact"
      Label="span"
      labelRight="On"
      labelGap={1.75}
      onChange={onChange}
    />
  )
  expect(screen.getByText("On")).toHaveStyleRule("margin-left", "7px")
  await user().click(screen.getByText("On"))
  expect(onChange).toHaveBeenCalledTimes(1)
})

it("dims only the disabled outline track while keeping its state word legible", () => {
  const { container } = renderWithProviders(
    <OutlineToggle disabled Label="span" labelRight="Off" />
  )
  expect(container.querySelector("label")).not.toHaveStyleRule("opacity", "0.4")
  expect(screen.getByRole("switch").nextElementSibling).toHaveStyleRule("opacity", "0.4")
})
