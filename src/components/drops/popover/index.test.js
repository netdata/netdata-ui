import React from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { Text } from "@/components/typography"
import Popover from "./index"

it("renders", () => {
  const { queryByText } = renderWithProviders(
    <Popover content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  expect(queryByText("popover target")).toBeVisible()
  expect(queryByText("popover content")).not.toBeInTheDocument()
})

it("hovers", () => {
  const { queryByText } = renderWithProviders(
    <Popover content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  fireEvent.mouseOver(queryByText("popover target"))
  expect(queryByText("popover content")).toBeInTheDocument()
})

it("remains open on drop content hover", () => {
  const { queryByText } = renderWithProviders(
    <Popover content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  fireEvent.mouseOver(queryByText("popover target"))
  fireEvent.mouseOver(queryByText("popover content"))
  expect(queryByText("popover content")).toBeInTheDocument()
})

it("renders plain", () => {
  const { queryByTestId, queryByText } = renderWithProviders(
    <Popover plain content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  fireEvent.mouseOver(queryByText("popover target"))

  expect(queryByTestId("drop")).toHaveTextContent("popover content")
})

it("renders content from function", () => {
  const { queryByText } = renderWithProviders(
    <Popover content={() => "popover content"}>
      {props => <Text {...props}>popover target</Text>}
    </Popover>
  )

  fireEvent.mouseOver(queryByText("popover target"))

  expect(queryByText("popover target")).toBeVisible()
  expect(queryByText("popover content")).toBeInTheDocument()
})

it("align", () => {
  const { getByTestId, queryByText, rerender } = renderWithProviders(
    <Popover content="popover content">
      <Text>popover target</Text>
    </Popover>
  )
  fireEvent.mouseOver(queryByText("popover target"))
  expect(getByTestId("drop-arrow")).not.toHaveStyleRule("transform")

  rerender(
    <Popover align="right" content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(90deg)")

  rerender(
    <Popover align="bottom" content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(180deg)")

  rerender(
    <Popover align="left" content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(270deg)")
})
