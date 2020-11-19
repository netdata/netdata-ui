/**
 * @jest-environment jsdom
 */

import React, { useState } from "react"
import { renderWithProviders, fireEvent, waitForDomChange } from "testUtilities"
import { FilterBox, FilterBoxProcessing, FilterBoxOption } from "."
import { Text } from "../typography"

export const data = [
  { name: "Bob", position: "Front End" },
  { name: "Alice", position: "Front End" },
  { name: "Chris", position: "Back End" },
  { name: "May", position: "Back End" },
]

export const options = [
  { columnField: "name", type: "text" },
  { columnField: "position", type: "selection" },
] as FilterBoxOption[]

// @ts-ignore
global.document.body.createTextRange = () => ({
  getBoundingClientRect() {
    return {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top: 0,
      right: 100,
      bottom: 100,
      left: 0,
      toJSON: "",
    }
  },
  getClientRects() {
    return []
  },
})

const MockedFilterBox = (({ getResultsQty, ...rest }) => {
  const [employees, setEmployees] = useState(data)

  const handleParse = expressions => {
    const newData = new FilterBoxProcessing(options).process(data, expressions)
    setEmployees(newData)
  }

  const resultsQty = getResultsQty && getResultsQty(employees)

  return (
    <>
      <FilterBox
        options={options}
        onParseOk={handleParse}
        data={employees}
        resultsQty={resultsQty}
        {...rest}
      />
      {employees.map(({ name, position }) => (
        <div key={name}>
          <Text className="contentClass">{`${name} ${position}`}</Text>
        </div>
      ))}
    </>
  )
}) as any

describe.skip("Filter Box test", () => {
  it(" * should filter results by expression", async () => {
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const onChange = jest.fn()
    const utils = renderWithProviders(
      <MockedFilterBox
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        getResultsQty={results => results.length}
      />
    )

    const results = utils.container.querySelectorAll(".contentClass")
    expect(results.length).toBe(4)

    const input = utils.container.querySelectorAll("textarea")[0]
    expect(onBlur).not.toBeCalled()
    expect(onFocus).not.toBeCalled()

    fireEvent.focus(input)
    expect(onBlur).not.toBeCalled()
    expect(onFocus).toBeCalledTimes(1)

    fireEvent.click(utils.getByText("name"))

    fireEvent.click(utils.getByText("=="))
    fireEvent.change(input, { target: { value: "Alice" } })

    await waitForDomChange()
    fireEvent.blur(input)
    expect(onBlur).toBeCalledTimes(1)

    const newResults = utils.container.querySelectorAll(".contentClass")
    expect(newResults.length).toBe(1)
    expect(utils.getByText(/Results:/)).toBeInTheDocument()
    expect(utils.getByText(/1/)).toBeInTheDocument()
    expect(onChange).toBeCalledTimes(6)
  })

  it(" * should filter results by selection", async () => {
    const onParseError = jest.fn()
    const utils = renderWithProviders(<MockedFilterBox onParseError={onParseError} />)

    const results = utils.container.querySelectorAll(".contentClass")
    expect(results.length).toBe(4)

    const input = utils.container.querySelectorAll("textarea")[0]
    fireEvent.focus(input)
    fireEvent.click(utils.getByText("position"))

    fireEvent.click(utils.getByText("=="))
    fireEvent.click(utils.getByText('"Back End"'))

    await waitForDomChange()
    fireEvent.blur(input)

    const newResults = utils.container.querySelectorAll(".contentClass")
    expect(newResults.length).toBe(2)
    expect(utils.getByText(/Chris/)).toBeInTheDocument()
    expect(utils.getByText(/May/)).toBeInTheDocument()
    expect(onParseError).not.toBeCalled()
  })

  it(" * should show warning when filter not completed", async () => {
    const utils = renderWithProviders(<MockedFilterBox />)

    const results = utils.container.querySelectorAll(".contentClass")
    expect(results.length).toBe(4)

    const input = utils.container.querySelectorAll("textarea")[0]
    fireEvent.focus(input)
    fireEvent.click(utils.getByText("position"))

    fireEvent.click(utils.getByText("=="))

    await waitForDomChange()
    fireEvent.blur(input)

    const newResults = utils.container.querySelectorAll(".contentClass")
    expect(newResults.length).toBe(4)
    expect(utils.getByText(/The filter is not complete/)).toBeInTheDocument()
  })

  it(" * should show error when filter is wrong", async () => {
    const onParseError = jest.fn()
    const onParseOk = jest.fn()
    const utils = renderWithProviders(
      <MockedFilterBox onParseError={onParseError} onParseOk={onParseOk} />
    )

    const results = utils.container.querySelectorAll(".contentClass")
    expect(results.length).toBe(4)

    const input = utils.container.querySelectorAll("textarea")[0]
    fireEvent.focus(input)
    fireEvent.click(utils.getByText("name"))

    fireEvent.click(utils.getByText("=="))

    fireEvent.paste(input, { clipboard: { getValue: () => "name = Alice" } })
    fireEvent.blur(input)

    await waitForDomChange()
    await waitForDomChange()

    const newResults = utils.container.querySelectorAll(".contentClass")
    expect(newResults.length).toBe(4)
    expect(utils.getByText(/Invalid filter/)).toBeInTheDocument()
    expect(onParseError).toBeCalledTimes(1)
    expect(onParseOk).not.toBeCalled()

    fireEvent.focus(input)
    await waitForDomChange()
    expect(utils.queryByText(/Invalid filter/)).not.toBeInTheDocument()
  })
})
