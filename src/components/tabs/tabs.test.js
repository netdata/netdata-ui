/**
 * @jest-environment jsdom
 */

import React, { useState } from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { Tabs, Tab } from "."

describe("Tabs states", () => {
  it(" * should render uncontrolled", () => {
    const { container, getByText, queryByText } = renderWithProviders(
      <Tabs>
        <Tab label="hi">Hello</Tab>
        <Tab label="Hi again">Hello again</Tab>
        <Tab label="Bye">Goodbye</Tab>
        <Tab label="Bye Bye">Fairwell</Tab>
      </Tabs>
    )

    const tabs = container.firstChild
    expect(tabs).toMatchSnapshot()

    expect(queryByText("Hello")).toBeInTheDocument()
    expect(queryByText("Hello again")).not.toBeInTheDocument()
    expect(queryByText("Goodbye")).not.toBeInTheDocument()
    expect(queryByText("Fairwell")).not.toBeInTheDocument()

    fireEvent.click(getByText("Bye Bye"))
    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Fairwell")).toBeInTheDocument()
  })

  it(" * should render controlled", () => {
    const onChange = jest.fn()
    const Component = () => {
      const [selected, setSelected] = useState(2)

      return (
        <Tabs
          selected={selected}
          onChange={onChange.mockImplementation(index => setSelected(index))}
        >
          <Tab label="hi">Hello</Tab>
          <Tab label="Hi again">Hello again</Tab>
          <Tab label="Bye">Goodbye</Tab>
          <Tab label="Bye Bye">Fairwell</Tab>
        </Tabs>
      )
    }

    const { queryByText, getByText } = renderWithProviders(<Component />)

    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).not.toBeInTheDocument()
    expect(queryByText("Goodbye")).toBeInTheDocument()
    expect(queryByText("Fairwell")).not.toBeInTheDocument()

    fireEvent.click(getByText("Hi again"))
    expect(onChange).toBeCalledWith(1)
    expect(queryByText("Goodbye")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()
  })

  it(" * should not allow disabled to be selected", () => {
    const Component = () => (
      <Tabs>
        <Tab label="hi" disabled>
          Hello
        </Tab>
        <Tab label="Hi again">Hello again</Tab>
        <Tab label="Bye">Goodbye</Tab>
        <Tab label="Bye Bye">Fairwell</Tab>
      </Tabs>
    )
    const { queryByText, getByText } = renderWithProviders(<Component />)

    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()

    fireEvent.click(getByText("hi"))
    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()
  })
})
