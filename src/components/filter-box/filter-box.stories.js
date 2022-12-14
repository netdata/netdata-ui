import React, { useState } from "react"
import styled from "styled-components"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "utils/readme"
import { FilterBox, FilterBoxProcessing } from "."
import { Text } from "src/components/typography"
import readme from "./README.md"

const filterBoxStory = storiesOf("Input/Filter Box", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
}

const StyledFilterBox = styled(FilterBox)`
  width: 200px;
  flex-grow: 0;
  flex-shrink: 0;
`

const InlineContainer = styled.div`
  height: 60px;
  width: 600px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
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
]

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
        <InlineContainer>
          <button type="button" style={{ marginRight: "10px" }}>
            Sample text
          </button>
          <StyledFilterBox
            options={options}
            onParseOk={handleParse}
            data={data}
            onChange={handleChange}
            inline
            resultsQty={employees.length}
            metaDisplay="compact"
            placeholder="Filter employees"
          />
        </InlineContainer>
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

filterBoxStory.add(
  "All filter sizes",
  () => {
    const [employees, setEmployees] = useState(data)

    const handleParse = expressions => {
      const newData = new FilterBoxProcessing(options).process(data, expressions)
      setEmployees(newData)
    }

    const handleChange = query => {}

    return (
      <>
        <InlineContainer>
          <button type="button" style={{ marginRight: "10px" }}>
            Sample text
          </button>
          <StyledFilterBox
            size="tiny"
            options={options}
            onParseOk={handleParse}
            data={data}
            onChange={handleChange}
            inline
            resultsQty={employees.length}
            metaDisplay="compact"
            placeholder="Filter employees"
          />
        </InlineContainer>
        <InlineContainer>
          <button type="button" style={{ marginRight: "10px" }}>
            Sample text
          </button>
          <StyledFilterBox
            size="small"
            options={options}
            onParseOk={handleParse}
            data={data}
            onChange={handleChange}
            inline
            resultsQty={employees.length}
            metaDisplay="compact"
            placeholder="Filter employees"
          />
        </InlineContainer>
        <InlineContainer>
          <button type="button" style={{ marginRight: "10px" }}>
            Sample text
          </button>
          <StyledFilterBox
            size="large"
            options={options}
            onParseOk={handleParse}
            data={data}
            onChange={handleChange}
            inline
            resultsQty={employees.length}
            metaDisplay="compact"
            placeholder="Filter employees"
          />
        </InlineContainer>
      </>
    )
  },
  subData
)
