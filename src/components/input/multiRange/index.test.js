import React from "react"
import MultiRangeInput from "."
import { renderWithProviders, screen } from "testUtilities"

const setup = props => renderWithProviders(<MultiRangeInput {...props} />)

describe("MultiRangeInput component", () => {
  test("should render component", () => {
    setup()
    expect(screen.getByTestId("multiRangeInput")).toBeInTheDocument()
    expect(screen.getByTestId("minRangeInput")).toBeInTheDocument()
    expect(screen.getByTestId("maxRangeInput")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-slider")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-sliderTrack")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-values")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-minValue")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-maxValue")).toBeInTheDocument()
  })
})
