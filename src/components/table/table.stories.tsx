import React from "react"
import { storiesOf } from "@storybook/react"
import { Table } from "./table"
import { UserHeader } from "./components/UserHeader"

const sidebarStory = storiesOf("COMPONENTS|Controls/Table", module)

sidebarStory.add("empty", () => (
  <Table
    sortedBy={["options"]}
    columns={UserHeader}
    data={[{ options: "andy", adding: "123" }, { options: "amy", adding: "123" }]}
    selectedItemsClb={items => console.log(items)}
  />
))
