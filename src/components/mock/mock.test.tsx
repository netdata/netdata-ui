/* eslint-disable spaced-comment */
/// <reference types="./types" />
/* eslint-enable spaced-comment */
import "@testing-library/jest-dom/extend-expect"
import { Mock } from "./mock"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"

const localeMock = {
  ru: {
    "mock.message": "Нажми",
  },
  en: {
    "mock.message": "Click me! (from config)",
  },
  de: {
    "mock.message": "Klick mich!",
  },
}

describe("Mock component test", () => {
  it(" * should render with no props", () => {
    const { queryByText } = testWrapper<null>(Mock, null, DefaultTheme, localeMock)
    const result = queryByText("default")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with test prop", () => {
    const { queryByText } = testWrapper<MockPropsT>(
      Mock,
      { text: "Test prop text" },
      DefaultTheme,
      localeMock
    )
    const result = queryByText("Test prop text")
    expect(result && result.textContent).not.toBeNull()
  })
})
