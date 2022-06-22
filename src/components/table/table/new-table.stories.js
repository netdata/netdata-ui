import React from "react"
import { storiesOf } from "@storybook/react"

import Table from "./table"
import Box from "../../templates/box"

const NewTableStory = storiesOf("COMPONENTS|new-table")

const filteringOptions = Array(3)
  .fill()
  .map((_, i) => i + 1)

NewTableStory.add("Table", () => {
  return (
    <Box width="100%">
      <Table filteringOptions={filteringOptions} handleSearch />
    </Box>
  )
})
