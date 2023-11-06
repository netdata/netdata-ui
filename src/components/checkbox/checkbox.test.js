import React from "react"
import { renderWithProviders, user, screen } from "testUtilities"
import { MockedCheckbox, MockedCheckboxList } from "./checkbox.mock"

describe("Checkbox test", () => {
  it(" * should render with required props", () => {
    renderWithProviders(<MockedCheckbox />)
    const result = screen.queryAllByRole("input")
    expect(result).not.toBeNull()
  })

  it(" * should support indeterminate state for checkboxes list", async () => {
    renderWithProviders(<MockedCheckboxList />)
    const checkboxesList = screen.getAllByTestId("checkbox")
    const childCheckbox = checkboxesList[1]

    await user().click(childCheckbox)
    expect(screen.getAllByTestId("checkbox-input")[0]).toHaveAttribute("data-indeterminate")
  })

  it(" * should not be clickable when we are at disabled", async () => {
    const { getByTestId } = renderWithProviders(<MockedCheckbox disabled={true} />)
    const input = getByTestId("checkbox-input")

    await user().click(input)

    expect(input).toBeDisabled()
  })
})
