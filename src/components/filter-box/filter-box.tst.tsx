/**
 * @jest-environment jsdom
 */

import React, { useState } from "react"
import { fireEvent } from "@testing-library/react"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"
import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import { FilterBox, FilterBoxProcessing, FilterBoxOption } from "."
import { Text } from "../typography"

// TODO - figure out TypeError: document.body.createTextRange is not a function
// one of underlying components might have a problem with jsdom environment lacking the method

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

const MockedFilterBox = () => {
  const [employees, setEmployees] = useState(data)

  const handleParse = expressions => {
    const newData = new FilterBoxProcessing(options).process(data, expressions)
    setEmployees(newData)
  }

  return (
    <>
      <FilterBox options={options} onParseOk={handleParse} data={employees} />
      {employees.map(({ name, position }) => (
        <div key={name}>
          <Text className="contentClass">{`${name} ${position}`}</Text>
        </div>
      ))}
    </>
  )
}

describe("Filter Box test", () => {
  it(" * should filter results by expression", () => {
    const utils = testWrapper<null>(MockedFilterBox, null, DefaultTheme, null)
    const input = utils.container.querySelectorAll("input")[0]
    fireEvent.change(input, { target: { value: "name == Alice" } })
    fireEvent.blur(input)
    const results = utils.container.querySelectorAll(".contentClass")
    expect(results.length).toBe(1)
  })
})
