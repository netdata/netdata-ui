import React from "react"
import { storiesOf } from "@storybook/react"

import Table from "./table"

const NewTableStory = storiesOf("COMPONENTS|new-table")

NewTableStory.add("Table", () => {
  return <Table />
})
