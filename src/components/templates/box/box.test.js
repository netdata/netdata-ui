import React from "react"
import { renderWithProviders } from "testUtilities"

import Box from "./index"

describe("Box functionality", () => {
  it("renders", () => {
    const { getByText } = renderWithProviders(<Box>Content</Box>)
    expect(getByText("Content")).toBeInTheDocument()
  })

  it("renders with position absolute", () => {
    const { getByText } = renderWithProviders(
      <Box position="absolute" top="1px" right="2px">
        Content
      </Box>
    )

    expect(getByText("Content")).toHaveStyleRule("position", "absolute")
    expect(getByText("Content")).toHaveStyleRule("top", "1px")
    expect(getByText("Content")).toHaveStyleRule("right", "2px")
  })
})
