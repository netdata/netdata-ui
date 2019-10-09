import "@testing-library/jest-dom/extend-expect"
import { Mock, MockPropsT } from "./mock"
import { MockTheme2 } from "../theme/mock/mock-theme2"
import { testWrapper } from "../../test-utils"

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
    const { queryByText } = testWrapper<null>(Mock, null, MockTheme2, localeMock)
    const result = queryByText("default")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with test prop", () => {
    const { queryByText } = testWrapper<MockPropsT>(
      Mock,
      { test: "Test prop text" },
      MockTheme2,
      localeMock
    )
    const result = queryByText("Test prop text")
    expect(result && result.textContent).not.toBeNull()
  })
})
