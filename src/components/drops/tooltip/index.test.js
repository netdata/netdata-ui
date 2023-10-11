import React from "react"
import { renderWithProviders, fireEvent, waitFor } from "testUtilities"
import { Text } from "@/components/typography"
import Tooltip from "./index"

it("renders", () => {
  const { queryByText } = renderWithProviders(
    <Tooltip content="tooltip content">
      <Text>tooltip target</Text>
    </Tooltip>
  )

  expect(queryByText("tooltip target")).toBeVisible()
  expect(queryByText("tooltip content")).not.toBeInTheDocument()
})

it("hovers", () => {
  const { queryByText } = renderWithProviders(
    <Tooltip content="tooltip content">
      <Text>tooltip target</Text>
    </Tooltip>
  )

  fireEvent.mouseOver(queryByText("tooltip target"))
  expect(queryByText("tooltip content")).toBeInTheDocument()
})

it("renders plain", () => {
  const { queryByTestId, queryByText } = renderWithProviders(
    <Tooltip plain content="tooltip content">
      <Text>tooltip target</Text>
    </Tooltip>
  )

  fireEvent.mouseOver(queryByText("tooltip target"))

  expect(queryByTestId("drop")).toHaveTextContent("tooltip content")
})

it("renders content from function", () => {
  const { queryByText } = renderWithProviders(
    <Tooltip content={() => "tooltip content"}>
      {props => <Text {...props}>tooltip target</Text>}
    </Tooltip>
  )

  fireEvent.mouseOver(queryByText("tooltip target"))

  expect(queryByText("tooltip target")).toBeVisible()
  expect(queryByText("tooltip content")).toBeInTheDocument()
})

it("align", () => {
  const { getByTestId, queryByText, rerender } = renderWithProviders(
    <Tooltip content="tooltip content">
      <Text>tooltip target</Text>
    </Tooltip>
  )
  fireEvent.mouseOver(queryByText("tooltip target"))
  expect(getByTestId("drop-arrow")).not.toHaveStyleRule("transform")

  rerender(
    <Tooltip align="right" content="tooltip content">
      <Text>tooltip target</Text>
    </Tooltip>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(90deg)")

  rerender(
    <Tooltip align="bottom" content="tooltip content">
      <Text>tooltip target</Text>
    </Tooltip>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(180deg)")

  rerender(
    <Tooltip align="left" content="tooltip content">
      <Text>tooltip target</Text>
    </Tooltip>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(270deg)")
})
