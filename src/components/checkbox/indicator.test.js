import { createRef } from "react"
import { fireEvent, renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { CheckboxIndicator } from "."

beforeEach(() => expect(CheckboxIndicator).toBeDefined())

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("shows passive checkbox and radio states without native controls in %s", (_, theme) => {
  const { container } = renderWithProviders(
    <>
      <CheckboxIndicator data-testid="empty" size={3.5} markSize={2} />
      <CheckboxIndicator data-testid="checked" checked size={3.5} markSize={2} />
      <CheckboxIndicator data-testid="radio-empty" shape="radio" size={3.5} markSize={1.5} />
      <CheckboxIndicator data-testid="radio" checked shape="radio" size={3.5} markSize={1.5} />
    </>,
    { theme }
  )
  expect(container.querySelector("input, label, [tabindex], [role]")).toBeNull()
  for (const id of ["empty", "checked", "radio-empty", "radio"]) {
    const mark = screen.getByTestId(id)
    expect(mark.tagName).toBe("SPAN")
    expect(mark).toHaveAttribute("aria-hidden", "true")
    expect(mark).toHaveStyleRule("width", "14px")
    expect(mark).toHaveStyleRule("box-sizing", "border-box")
    expect(mark).toHaveStyleRule("height", "14px")
  }
  expect(screen.getByTestId("empty")).toHaveStyleRule(
    "border",
    `1.5px solid ${theme.colors.controlBorder}`
  )
  expect(screen.getByTestId("empty")).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)")
  expect(screen.getByTestId("empty")).toHaveStyleRule("transform", "scale(0)", {
    modifier: ":after",
  })
  expect(screen.getByTestId("checked")).toHaveStyleRule(
    "border",
    `1.5px solid ${theme.colors.buttonNeutralFill}`
  )
  expect(screen.getByTestId("checked")).toHaveStyleRule(
    "background-color",
    theme.colors.buttonNeutralFill
  )
  expect(screen.getByTestId("checked")).toHaveStyleRule("width", "8px", { modifier: ":after" })
  expect(screen.getByTestId("checked")).toHaveStyleRule("transform", "scale(1)", {
    modifier: ":after",
  })
  expect(screen.getByTestId("checked")).toHaveStyleRule(
    "background-color",
    theme.colors.buttonNeutralText,
    { modifier: ":after" }
  )
  expect(screen.getByTestId("radio-empty")).toHaveStyleRule("border-radius", "50%")
  expect(screen.getByTestId("radio")).toHaveStyleRule("border-radius", "50%")
  expect(screen.getByTestId("radio")).toHaveStyleRule("width", "6px", { modifier: ":after" })
  expect(screen.getByTestId("radio")).toHaveStyleRule("height", "6px", { modifier: ":after" })
  expect(screen.getByTestId("radio")).toHaveStyleRule("border-radius", "50%", {
    modifier: ":after",
  })
  expect(screen.getByTestId("radio")).toHaveStyleRule("clip-path", "none", { modifier: ":after" })
})

it("keeps the option owner's ref and data markers without introducing hover or focus behavior", () => {
  const ref = createRef()
  renderWithProviders(
    <CheckboxIndicator ref={ref} data-testid="mark" data-mark="radio" data-checked={false} />
  )
  const mark = screen.getByTestId("mark")
  expect(ref.current).toBe(mark)
  expect(mark).toHaveAttribute("data-mark", "radio")
  expect(mark).toHaveAttribute("data-checked", "false")
  expect(mark).not.toHaveStyleRule("border-color", expect.anything(), { modifier: ":hover" })
  expect(mark).not.toHaveStyleRule("border-color", expect.anything(), { modifier: "label:hover &" })
  fireEvent.click(mark)
  expect(mark).toHaveAttribute("data-state", "unchecked")
  expect(document.activeElement).not.toBe(mark)
})
