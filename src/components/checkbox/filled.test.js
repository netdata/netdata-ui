import { useState } from "react"
import { renderWithProviders, screen, user } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"
import { Checkbox } from "."

const FilledCheckbox = props => <Checkbox as="span" variant="filled" checked={false} {...props} />
const box = () => screen.getByTestId("styled-checkbox")

it("places native names, validation and focus callbacks on the input", async () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()
  renderWithProviders(
    <FilledCheckbox
      inputProps={{
        id: "select_jobs",
        "aria-label": "Select jobs",
        "aria-invalid": true,
        "aria-describedby": "selection_hint",
        title: "Select jobs",
        onFocus,
        onBlur,
        "data-testid": "row-checkbox",
      }}
    />
  )
  const input = screen.getByRole("checkbox", { name: "Select jobs" })
  expect(input).toHaveAttribute("id", "select_jobs")
  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAttribute("aria-describedby", "selection_hint")
  expect(input).toHaveAttribute("title", "Select jobs")
  expect(input).toHaveAttribute("data-testid", "row-checkbox")
  expect(input.parentElement.parentElement.tagName).toBe("SPAN")
  await user().tab()
  expect(input).toHaveFocus()
  expect(onFocus).toHaveBeenCalledTimes(1)
  await user().tab()
  expect(onBlur).toHaveBeenCalledTimes(1)
})

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("preserves filled checkbox geometry and palette in %s", (_, theme) => {
  const { rerender } = renderWithProviders(<FilledCheckbox />, { theme })
  expect(box()).toHaveStyleRule("width", "16px")
  expect(box()).toHaveStyleRule("height", "16px")
  expect(box()).toHaveStyleRule("border-radius", "4px")
  expect(box()).toHaveStyleRule("border", `1.5px solid ${theme.colors.controlBorder}`)
  expect(box()).toHaveStyleRule("background-color", theme.colors.inputBg)
  rerender(<FilledCheckbox checked />)
  expect(box()).toHaveStyleRule("background-color", theme.colors.buttonNeutralFill)
  expect(box()).toHaveStyleRule("border", `1.5px solid ${theme.colors.buttonNeutralFill}`)
  expect(box()).toHaveStyleRule("width", "9px", { modifier: ":after" })
  expect(box()).toHaveStyleRule("height", "9px", { modifier: ":after" })
  expect(box()).toHaveStyleRule("background-color", theme.colors.buttonNeutralText, {
    modifier: ":after",
  })
  rerender(<FilledCheckbox indeterminate />)
  expect(screen.getByRole("checkbox")).toBePartiallyChecked()
  expect(box()).toHaveStyleRule("height", "2px", { modifier: ":after" })
  expect(box()).toHaveStyleRule("clip-path", "none", { modifier: ":after" })
})

const Controlled = props => {
  const [checked, setChecked] = useState(false)
  return (
    <label>
      Choose all
      <FilledCheckbox checked={checked} onChange={setChecked} {...props} />
    </label>
  )
}

it("keeps an outer label clickable and supports Space once per action", async () => {
  renderWithProviders(<Controlled />)
  const input = screen.getByRole("checkbox", { name: "Choose all" })
  await user().click(screen.getByText("Choose all"))
  expect(input).toBeChecked()
  await user().tab()
  input.focus()
  await user().keyboard(" ")
  expect(input).not.toBeChecked()
})

it("focuses the filled native checkbox when its visible box is clicked", async () => {
  renderWithProviders(<FilledCheckbox inputProps={{ "aria-label": "Select job" }} />)
  await user().click(box())
  expect(screen.getByRole("checkbox", { name: "Select job" })).toHaveFocus()
})

it("hovers a standalone filled box without requiring a label ancestor", () => {
  const { rerender } = renderWithProviders(<FilledCheckbox />)
  expect(box().closest("label")).toBeNull()
  expect(box()).toHaveStyleRule("border-color", DefaultTheme.colors.buttonNeutralFill, {
    modifier: ":hover",
  })
  rerender(<FilledCheckbox disabled />)
  expect(box()).not.toHaveStyleRule("border-color", expect.anything(), { modifier: ":hover" })
})
