import React from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import { Table } from "./table"
import { UserTableSchema } from "./components/UserHeader"
import { readmeCleanup } from "../../../utils/readme"
// @ts-ignore
import readme from "./README.md"
import { getColor } from "../../theme"

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["table.test.tsx"],
}
const sidebarStory = storiesOf("COMPONENTS|Controls/Table", module)

sidebarStory.add(
  "Users table",
  () => (
    <Table
      sortedBy={["user"]}
      columns={UserTableSchema}
      data={[
        {
          user: { photo: "https://i.pravatar.cc/30", name: "Fry", mail: "noway@noway.com" },
          dots: "123",
        },
        {
          user: { photo: "https://i.pravatar.cc/31", name: "Amy", mail: "amy@vong.com" },
          dots: "123",
        },
        {
          user: {
            photo: "https://i.pravatar.cc/32",
            name: "dr. Zoidberg",
            mail: "drZ@planetmail.com",
          },
          dots: "123",
        },
      ]}
      selectedItemsClb={items => console.log(items)}
    />
  ),
  subData
)

const StyledTable = styled(Table)`
  width: 800px;
  background-color: ${getColor(["red", "roseWhite"])};
`

sidebarStory.add(
  "Users with overrided style",
  () => (
    <StyledTable
      sortedBy={["user"]}
      columns={UserTableSchema}
      data={[
        {
          user: { photo: "https://i.pravatar.cc/30", name: "Fry", mail: "noway@noway.com" },
          dots: "123",
        },
        {
          user: { photo: "https://i.pravatar.cc/31", name: "Amy", mail: "amy@vong.com" },
          dots: "123",
        },
        {
          user: {
            photo: "https://i.pravatar.cc/32",
            name: "dr. Zoidberg",
            mail: "drZ@planetmail.com",
          },
          dots: "123",
        },
      ]}
      selectedItemsClb={items => console.log(items)}
    />
  ),
  subData
)
