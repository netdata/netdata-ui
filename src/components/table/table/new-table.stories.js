import React, { useState } from "react"
import { storiesOf } from "@storybook/react"

import Table from "./table"
import Box from "src/components/templates/box"

const colorFilter = {
  id: "colorFilter",
  options: [
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ],
  onChange: selected => {
    console.log(selected)
  },
  value: "",
}

const NewTableStory = storiesOf("COMPONENTS|new-table")

NewTableStory.add("Table", () => {
  const [value, setValue] = useState()
  const filteringOptions = [{ ...colorFilter, onChange: value => setValue(value), value }]

  return (
    <Box width="100%">
      <Table filteringOptions={filteringOptions} handleSearch />
    </Box>
  )
})
