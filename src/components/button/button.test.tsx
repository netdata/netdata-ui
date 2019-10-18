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
  it(" * should render with no props", () => {
    const { queryByText } = testWrapper<null>(Button, null, DefaultTheme, localeMock)
    const result = queryByText("LABEL")
    expect(result && result.textContent).not.toBeNull()
  })

  it(" * should render with test prop", () => {
    const { queryByText } = testWrapper<ButtonProps>(
      Button,
      { label: "Test prop text" },
      DefaultTheme,
      localeMock
    )
    const result = queryByText("TEST PROP TEXT")
    expect(result && result.textContent).not.toBeNull()
  })
})
