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

it("renders open", async () => {
  const { getByText, findByText, queryByTestId } = render()

  fireEvent.click(getByText("character"))

  expect(getByText("character")).toBeVisible()
  expect(queryByTestId("drop")).toBeInTheDocument()
  expect(await findByText("The Narrator")).toBeInTheDocument()
})

it("closes on item click", async () => {
  const onOpen = jest.fn()
  const onClose = jest.fn()
  const { getByText, findByText, queryByTestId } = render({ onOpen, onClose })

  fireEvent.click(getByText("character"))
  expect(onOpen).toHaveBeenCalled()

  fireEvent.click(await findByText("Tyler Durden"))
  expect(onClose).toHaveBeenCalled()
  expect(queryByTestId("drop")).not.toBeInTheDocument()
})

it("renders controlled", async () => {
  const onChange = jest.fn()
  const { getByText, findByText, queryByTestId } = render({
    value: "durgen",
    onChange,
    label: null,
  })

  fireEvent.click(getByText("Tyler Durden"))
  fireEvent.click(await findByText("Marla Singer"))
  expect(onChange).toHaveBeenCalledWith("singer")
  expect(queryByTestId("drop")).not.toBeInTheDocument()
})
