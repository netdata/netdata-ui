import "@testing-library/jest-dom/extend-expect"
import { MDXButton, MDXButtonProps } from "./button"
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

describe("MDXButton component test", () => {
  it(" * should render with no props", () => {
    const { queryByText } = testWrapper<null>(MDXButton, null, DefaultTheme, localeMock)
    const result = queryByText("default")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with test prop", () => {
    const { queryByText } = testWrapper<MDXButtonProps>(
      MDXButton,
      { label: "Test prop text" },
      DefaultTheme,
      localeMock
    )
    const result = queryByText("Test prop text")
    expect(result && result.textContent).not.toBeNull()
  })
})
