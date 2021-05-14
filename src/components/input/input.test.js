/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { renderWithProviders, fireEvent } from "testUtilities"
import { TextInputMock, errorMsg, successMsg } from "./input.mock"

describe("TextInput test", () => {
  it(" * should render with required props", () => {
    const { container } = renderWithProviders(<TextInputMock />)
    const result = container.querySelectorAll("input")
    expect(result).not.toBeNull()
  })

  it(" * should change value and transition to success state", () => {
    const utils = renderWithProviders(<TextInputMock />)
    const input = utils.getByLabelText("testInput")
    fireEvent.change(input, { target: { value: "Jira or Zenhub?" } })
    fireEvent.blur(input)
    const success = utils.getByText(successMsg)
    expect(success).not.toBeNull()
    expect(input.value).toBe("Jira or Zenhub?")
  })

  it(" * should transition to error state if lost focus while empty", () => {
    const utils = renderWithProviders(<TextInputMock />)
    const input = utils.getByLabelText("testInput")
    fireEvent.focus(input)
    fireEvent.blur(input)
    const error = utils.getByText(errorMsg)
    expect(error).not.toBeNull()
  })
})
