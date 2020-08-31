/**
 * @jest-environment jsdom
 */

import React, { useState } from "react"
import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import { fireEvent } from "@testing-library/react"
import { Tabs, Tab, TabsProps } from "."
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"

describe("Tabs states", () => {
  it(" * should render uncontrolled", () => {
    const { container, getByText, queryByText } = testWrapper<TabsProps>(
      props => (
        <Tabs {...props}>
          <Tab label="hi">Hello</Tab>
          <Tab label="Hi again">Hello again</Tab>
          <Tab label="Bye">Goodbye</Tab>
          <Tab label="Bye Bye">Fairwell</Tab>
        </Tabs>
      ),
      {},
      DefaultTheme,
      null
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

    const { queryByText, getByText } = testWrapper<TabsProps>(
      props => {
        const [selected, setSelected] = useState(2)

        return (
          <Tabs
            {...props}
            selected={selected}
            onChange={onChange.mockImplementation(index => setSelected(index))}
          >
            <Tab label="hi">Hello</Tab>
            <Tab label="Hi again">Hello again</Tab>
            <Tab label="Bye">Goodbye</Tab>
            <Tab label="Bye Bye">Fairwell</Tab>
          </Tabs>
        )
      },
      {},
      DefaultTheme,
      null
    )

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
    const { queryByText, getByText } = testWrapper<TabsProps>(
      props => (
        <Tabs {...props}>
          <Tab label="hi" disabled>
            Hello
          </Tab>
          <Tab label="Hi again">Hello again</Tab>
          <Tab label="Bye">Goodbye</Tab>
          <Tab label="Bye Bye">Fairwell</Tab>
        </Tabs>
      ),
      {},
      DefaultTheme,
      null
    )

    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()

    fireEvent.click(getByText("hi"))
    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()
  })
})
