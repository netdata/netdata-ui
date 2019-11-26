/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect"
import { fireEvent } from "@testing-library/react"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"
import { TextInputMock, errorMsg, successMsg } from "./input.mock"

describe("TextInput test", () => {
  it(" * should render with required props", () => {
    const { container } = testWrapper<null>(TextInputMock, null, DefaultTheme, null)
    const result = container.querySelectorAll("input")
    expect(result).not.toBeNull()
  })

  it(" * should change value and transition to success state", () => {
    const utils = testWrapper<null>(TextInputMock, null, DefaultTheme, null)
    const input = utils.getByLabelText("testInput") as HTMLInputElement
    fireEvent.change(input, { target: { value: "Jira or Zenhub?" } })
    fireEvent.blur(input)
    const success = utils.getByText(successMsg)
    expect(success).not.toBeNull()
    expect(input.value).toBe("Jira or Zenhub?")
  })

  it(" * should transition to error state if lost focus while empty", () => {
    const utils = testWrapper<null>(TextInputMock, null, DefaultTheme, null)
    const input = utils.getByLabelText("testInput") as HTMLInputElement
    fireEvent.focus(input)
    fireEvent.blur(input)
    const error = utils.getByText(errorMsg)
    expect(error).not.toBeNull()
  })
})
