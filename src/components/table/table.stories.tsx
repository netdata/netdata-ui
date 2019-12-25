import React, { useState } from "react"
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

const initialState = [
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
]

sidebarStory.add(
  "Users table with selection persist",
  () => {
    const [state, setState] = useState(initialState)
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            const changedName = Math.random()
              .toString()
              .slice(0, 4)
            setState([
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
                  name: `Zoidberg #${changedName}`,
                  mail: "drZ@planetmail.com",
                },
                dots: "123",
              },
            ])
          }}
        >
          Reload Data
        </button>
        <Table
          sortedBy={["user"]}
          columns={UserTableSchema}
          data={state}
          selectedItemsClb={items => console.log(items)}
          autoResetSelectedRows={false}
        />
      </div>
    )
  },
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
      data={initialState}
      selectedItemsClb={items => console.log(items)}
    />
  ),
  subData
)
