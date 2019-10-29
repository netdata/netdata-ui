import "@testing-library/jest-dom/extend-expect"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"
import { Button } from "../button"

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
    const { queryByText } = testWrapper<any>(
      Button,
      { label: "Test prop text" },
      DefaultTheme,
      localeMock
    )
    const result = queryByText("Test prop text")
    expect(result && result.textContent).not.toBeNull()
  })
})
