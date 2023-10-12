import React from "react"
import { renderWithProviders } from "testUtilities"
import { DefaultTheme as theme } from "@/theme/default"
import Flex from "./index"

const base = theme.constants.SIZE_SUB_UNIT

it("renders", () => {
  const { getByText } = renderWithProviders(<Flex>Content</Flex>)
  expect(getByText("Content")).toBeInTheDocument()
})

it("renders with align", () => {
  const { getByText } = renderWithProviders(
    <Flex alignContent="end" column>
      Content
    </Flex>
  )

  expect(getByText("Content")).toHaveStyleRule("display", "flex")
  expect(getByText("Content")).toHaveStyleRule("align-content", "flex-end")
  expect(getByText("Content")).toHaveStyleRule("flex-direction", "column")
})

it("renders spaces align", () => {
  const { getByText } = renderWithProviders(
    <Flex width="10rem" border overflow="auto" padding={[1, 2, 1, 0]} margin={[1, "auto"]}>
      Content
    </Flex>
  )

  expect(getByText("Content")).toHaveStyleRule("width", "10rem")
  expect(getByText("Content")).toHaveStyleRule("border", `1px solid ${theme.colors.border}`)
  expect(getByText("Content")).toHaveStyleRule("overflow", "auto")
  expect(getByText("Content")).toHaveStyleRule("padding", `${base}px ${base * 2}px ${base}px 0`)
  expect(getByText("Content")).toHaveStyleRule("margin", `${base}px auto`)
})
