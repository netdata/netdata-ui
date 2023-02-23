import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import ProgressBar from "."

describe("ProgressBar component", () => {
  test("should render component with width", () => {
    renderWithProviders(<ProgressBar width="20%" />)

    expect(screen.getByTestId("progressBar")).toBeInTheDocument()
    expect(screen.getByTestId("progressBar-progress20%")).toBeInTheDocument()
  })

  test("should render component with value", () => {
    renderWithProviders(
      <ProgressBar
        value={[
          { color: ["blue", "indigo"], width: "30%" },
          { color: ["green", "limeGreen"], width: "60%" },
        ]}
      />
    )

    expect(screen.getByTestId("progressBar")).toBeInTheDocument()
    expect(screen.getByTestId("progressBar-progress30%")).toBeInTheDocument()
    expect(screen.getByTestId("progressBar-progress60%")).toBeInTheDocument()
  })
})
