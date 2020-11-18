import React from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { MockedCheckbox, MockedCheckboxList } from "./checkbox.mock"

describe("Checkbox test", () => {
  it(" * should render with required props", () => {
    const { container } = renderWithProviders(<MockedCheckbox />)
    const result = container.querySelectorAll("input")
    expect(result).not.toBeNull()
  })

  // for checkboxes, the event that's fired is the click event,
  // and that causes the change event handler to be called.
  // learn more: https://github.com/testing-library/react-testing-library/issues/156

  it(" * should check the checkbox on interaction", () => {
    const { container } = renderWithProviders(<MockedCheckbox />)
    const checkbox = container.querySelectorAll("input")[0]
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })
  it(" * should toggle checkbox on-off", () => {
    const { container } = renderWithProviders(<MockedCheckbox />)
    const checkbox = container.querySelectorAll("input")[0]
    fireEvent.click(checkbox)
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })

  it(" * should support indeterminate state for checkboxes list", () => {
    const { container } = renderWithProviders(<MockedCheckboxList />)
    const checkboxesList = container.querySelectorAll("input")
    const mainCheckbox = checkboxesList[0]
    const childCheckbox = checkboxesList[1]
    fireEvent.click(childCheckbox)
    expect(mainCheckbox.indeterminate).toBe(true)
  })
})
