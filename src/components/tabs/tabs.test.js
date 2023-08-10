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

    expect(getByText("hi")).toHaveStyleRule("font-weight", "bold")
    expect(queryByText("Hello")).toBeInTheDocument()
    expect(queryByText("Hello again")).not.toBeInTheDocument()
    expect(queryByText("Goodbye")).not.toBeInTheDocument()
    expect(queryByText("Fairwell")).not.toBeInTheDocument()

    const tab = getByText("Bye Bye")
    fireEvent.click(tab)
    expect(tab).toHaveStyleRule("font-weight", "bold")
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
    expect(getByText("Bye")).toHaveStyleRule("font-weight", "bold")
    expect(queryByText("Goodbye")).toBeInTheDocument()
    expect(queryByText("Fairwell")).not.toBeInTheDocument()

    const tab = getByText("Hi again")
    fireEvent.click(tab)
    expect(tab).toHaveStyleRule("font-weight", "bold")
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
    expect(getByText("Hi again")).toHaveStyleRule("font-weight", "bold")
    expect(queryByText("Hello again")).toBeInTheDocument()

    const tab = getByText("hi")
    fireEvent.click(tab)
    expect(tab).toHaveStyleRule("font-weight", "normal")
    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()
  })
})
