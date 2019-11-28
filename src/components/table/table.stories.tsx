import React from "react"
import { storiesOf } from "@storybook/react"
import { Table } from "./table"

const sidebarStory = storiesOf("COMPONENTS|Controls/Table", module)

sidebarStory.add("empty", () => <Table />)
