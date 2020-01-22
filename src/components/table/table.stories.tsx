import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import { Table } from "./table"
import { EnhancedTable } from "./mocks/styled"
import { UserTableSchema } from "./mocks/mocked-table-schema"
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
    user: { photo: "https://i.pravatar.cc/30", name: "Fry" },
    dots: "123",
    email: "noway@noway.com",
  },

  {
    user: { photo: "https://i.pravatar.cc/31", name: "Amy" },
    email: "amy@vong.com",
    dots: "123",
  },
  {
    user: {
      photo: "https://i.pravatar.cc/32",
      name: "dr. Zoidberg",
    },
    email: "drZ@planetmail.com",
    dots: "123",
  },
]

sidebarStory.add(
  "Users table with selection persist",
  () => {
    const [state, setState] = useState(initialState)
    const [groupBy, setGroupBy] = useState([] as string[])
    return (
      <div>
        <button
          type="button"
          style={{ marginRight: "15px" }}
          onClick={() => {
            const changedName = Math.random()
              .toString()
              .slice(0, 4)
            setState([
              {
                user: { photo: "https://i.pravatar.cc/30", name: "Fry" },
                email: "noway@noway.com",
                dots: "123",
              },
              {
                user: { photo: "https://i.pravatar.cc/31", name: "Amy" },
                email: "amy@vong.com",
                dots: "123",
              },
              {
                user: { photo: "https://i.pravatar.cc/31", name: "Vong420" },
                dots: "123",
                email: "amy@vong.com",
              },
              {
                user: {
                  photo: "https://i.pravatar.cc/32",
                  name: `Zoidberg #${changedName}`,
                },
                email: "drZ@planetmail.com",
                dots: "123",
              },
              {
                user: { photo: "https://i.pravatar.cc/31", name: "Samy" },
                email: "amy@vong.com",
                dots: "123",
              },
            ])
          }}
        >
          Reload Data
        </button>
        <label htmlFor="groupBySelect">
          Group by:
          <select
            id="groupBySelect"
            onChange={(e: any) => {
              const { value }: { value: string } = e.target as any
              setGroupBy([value])
            }}
          >
            <option value="">None</option>
            <option value="email"> Email </option>
            <option value="user">User name</option>
          </select>
        </label>
        <EnhancedTable
          sortableBy={["user"]}
          controlledState={{ groupBy }}
          initialState={{ sortBy: [{ id: "user", desc: false }] }}
          columns={UserTableSchema}
          data={state}
          selectedItemsClb={items => {}}
        />
      </div>
    )
  },
  subData
)

const StyledTable = styled(Table)`
  width: 600px;
  background-color: ${getColor(["red", "roseWhite"])};
`

sidebarStory.add(
  "Users with overrided style",
  () => (
    <StyledTable
      sortableBy={["user"]}
      columns={UserTableSchema}
      data={initialState}
      selectedItemsClb={items => {}}
    />
  ),
  subData
)
