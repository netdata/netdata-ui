import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Mock } from "./mock"

describe("Mock component test", () => {
  it(" * should render with no props", () => {
    const { queryByText } = render(<Mock />)
    const result = queryByText("default")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with test prop", () => {
    const { queryByText } = render(<Mock test="test" />)
    const result = queryByText("test")
    expect(result && result.textContent).not.toBeNull()
  })
})
