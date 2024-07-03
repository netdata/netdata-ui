import React from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import Menu from "./index"

const render = props =>
  renderWithProviders(
    <Menu
      label="character"
      items={[
        { value: "narrator", label: "The Narrator" },
        { value: "durgen", label: "Tyler Durden" },
        { value: "singer", label: "Marla Singer" },
      ]}
      {...props}
    />
  )

it("renders", () => {
  const { queryByText, queryByTestId } = render()

  expect(queryByText("character")).toBeVisible()
  expect(queryByTestId("drop")).not.toBeInTheDocument()
  expect(queryByText("The Narrator")).not.toBeInTheDocument()
})

it("renders open", () => {
  const { getByText, queryByTestId } = render()

  fireEvent.click(getByText("character"))

  expect(getByText("character")).toBeVisible()
  expect(queryByTestId("drop")).toBeInTheDocument()
  expect(getByText("The Narrator")).toBeInTheDocument()
})

it("closes on item click", () => {
  const onOpen = jest.fn()
  const onClose = jest.fn()
  const { getByText, queryByTestId } = render({ onOpen, onClose })

  fireEvent.click(getByText("character"))
  expect(onOpen).toBeCalled()

  fireEvent.click(getByText("Tyler Durden"))
  expect(onClose).toBeCalled()
  expect(queryByTestId("drop")).not.toBeInTheDocument()
})

it("renders controlled", () => {
  const onChange = jest.fn()
  const { getByText, queryByTestId } = render({
    value: "durgen",
    onChange,
    label: null,
  })

  fireEvent.click(getByText("Tyler Durden"))
  fireEvent.click(getByText("Marla Singer"))
  expect(onChange).toBeCalledWith("singer")
  expect(queryByTestId("drop")).not.toBeInTheDocument()
})
