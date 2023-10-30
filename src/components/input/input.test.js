/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { renderWithProviders } from "testUtilities"
import { TextInputMock } from "./input.mock"

describe("TextInput test", () => {
  it(" * should render with required props", () => {
    const { container } = renderWithProviders(<TextInputMock />)
    const result = container.querySelectorAll("input")
    expect(result).not.toBeNull()
  })
})
