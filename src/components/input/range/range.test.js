import React from "react"
import RangeInput from "./index"
import { renderWithProviders, screen } from "testUtilities"

const setup = props => renderWithProviders(<RangeInput {...props} />)

describe("InputRange component", () => {
  test("should render component", () => {
    setup()
    expect(screen.getByTestId("rangeInput")).toBeInTheDocument()
  })
})
