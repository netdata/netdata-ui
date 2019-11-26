/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect"
import { Button, ButtonProps } from "./button"
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
  el: {
    "mock.message": "Πάτησέ με :) !",
  },
}

describe("Button component test", () => {
  it(" * should render with test prop", () => {
    const { queryByText } = testWrapper<ButtonProps>(
      Button,
      { label: "Test prop text" },
      DefaultTheme,
      localeMock
    )
    const result = queryByText("Test prop text")
    expect(result && result.textContent).not.toBeNull()
  })
})
