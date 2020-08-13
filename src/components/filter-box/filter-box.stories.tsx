import React, { useState } from "react"
import styled from "styled-components"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "../../../utils/readme"
import { FilterBox, FilterBoxProcessing, FilterBoxOption } from "."
import { Text } from "../typography"

// @ts-ignore
import readme from "./README.md"

const filterBoxStory = storiesOf("COMPONENTS|Controls/Filter Box", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
}

const StyledFilterBox = styled(FilterBox)`
  width: 400px;
`

const data = [
  { name: "Bob", position: "Front End" },
  { name: "Alice", position: "Front End" },
  { name: "Chris", position: "Back End" },
  { name: "May", position: "Back End" },
]

const options = [
  { columnField: "name", type: "text" },
  { columnField: "position", type: "selection" },
] as FilterBoxOption[]

filterBoxStory.add(
  "Simple filter box",
  () => {
    const [employees, setEmployees] = useState(data)

    const handleParse = expressions => {
      const newData = new FilterBoxProcessing(options).process(data, expressions)
      setEmployees(newData)
    }

    const handleChange = query => {}

    return (
      <>
        <StyledFilterBox
          options={options}
          onParseOk={handleParse}
          data={employees}
          onChange={handleChange}
        />
        {employees.map(({ name, position }) => (
          <div key={name}>
            <Text>{`${name} ${position}`}</Text>
          </div>
        ))}
      </>
    )
  },
  subData
)
