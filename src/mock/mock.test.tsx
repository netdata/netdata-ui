import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { ThemeProvider } from "styled-components"
import { Mock } from "./mock"
import { MockTheme2 } from "../theme/mock/mock-theme2"

describe("Mock component test", () => {
  it(" * should render with no props", () => {
    const { queryByText } = render(
      <ThemeProvider theme={MockTheme2}>
        <Mock />
      </ThemeProvider>
    )
    const result = queryByText("default")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with test prop", () => {
    const { queryByText } = render(
      <ThemeProvider theme={MockTheme2}>
        <Mock test="test" />
      </ThemeProvider>
    )
    const result = queryByText("test")
    expect(result && result.textContent).not.toBeNull()
  })
})
