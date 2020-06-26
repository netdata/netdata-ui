import React, { useState, useMemo } from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"
import { Table } from "./table"
import { EnhancedTable } from "./mocks/styled"
import { UserTableSchema } from "./mocks/mocked-table-schema"
import { NodesTableSchema } from "./mocks/nodes-table-schema"
import { readmeCleanup } from "../../../utils/readme"
// @ts-ignore
import readme from "./README.md"
import { getColor } from "../../theme"
import { webkitVisibleScrollbar } from "../../mixins"
import { customGroupBy } from "./mocks/utils"

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["table.test.tsx"],
}
const tableStory = storiesOf("COMPONENTS|Controls/Table", module)

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
    disabled: true,
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

tableStory.add(
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
            const changedName = Math.random().toString().slice(0, 4)
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
          itemIsDisabled={item => item.disabled}
          selectedItemsClb={items => {
            action(JSON.stringify(items.filter(item => item.disabled)))
          }}
          toggleSelectedItemClb={(item, checked) => {
            action(JSON.stringify(item))
            action(checked ? "selected" : "deselected")
          }}
        />
      </div>
    )
  },
  subData
)

type Node = {
  node: { name: string }
  alarm: { critical: number; warning: number; unreachable?: boolean }
  services: string[]
  [chartID: string]: { chartName: string } | any
}

const sampleNode = {
  node: { name: "Happiness" },
  services: [],
  alarm: { critical: 0, warning: 0 },
  chart: { chartName: "Zoom Chart" },
  chart2: { chartName: "Zoom Chart" },
  chart3: { chartName: "Zoom Chart" },
  chart4: { chartName: "Zoom Chart" },
}

const sampleNodes = new Array(1000).fill(sampleNode)

const nodesData = [
  {
    node: { name: "Agent Arachovis" },
    alarm: { critical: 2, warning: 3 },
    services: ["ubuntu", "mariadb"],
    chart: { chartName: "Fun Chart" },
    chart2: { chartName: "Fun Chart" },
    chart3: { chartName: "Fun Chart" },
    chart4: { chartName: "Fun Chart" },
  },
  {
    node: { name: "Babel" },
    alarm: { critical: 0, warning: 0 },
    services: ["ubuntu"],
    chart: { chartName: "One more Chart" },
    chart2: { chartName: "One more Chart" },
    chart3: { chartName: "One more Chart" },
    chart4: { chartName: "One more Chart" },
  },
  {
    node: { name: "Zoom" },
    services: ["mariadb"],
    alarm: { critical: 0, warning: 0 },
    chart: { chartName: "Zoom Chart" },
    chart2: { chartName: "Zoom Chart" },
    chart3: { chartName: "Zoom Chart" },
    chart4: { chartName: "Zoom Chart" },
  },
  {
    node: { name: "Happiness" },
    services: [],
    alarm: { critical: 0, warning: 0, unreachable: true },
    chart: { chartName: "Zoom Chart" },
    chart2: { chartName: "Zoom Chart" },
    chart3: { chartName: "Zoom Chart" },
    chart4: { chartName: "Zoom Chart" },
  },
  ...sampleNodes,
]

const groupsOrderSettings = {
  groupsOrder: {
    status: {
      critical: 1,
      warning: 2,
      unreachable: 3,
      okay: 4,
    },
    services: {
      "No Services": 99,
    },
  },
  prioritySettings: {
    unprioritizedGroupsPlacement: 5,
  },
}

const prepareData = (arr: any) =>
  arr.reduce((a, c) => {
    const {
      alarm: { critical, warning, unreachable },
    } = c
    let status = "okay"
    if (unreachable) {
      status = "unreachable"
    } else if (critical > 0) {
      status = "critical"
    } else if (warning > 0) {
      status = "warning"
    }
    return [...a, { ...c, status }]
  }, [])

const preparedData = prepareData(nodesData)

const FixedContainer = styled.div`
  position: relative;
  height: 150px;
  width: 400px;
  overflow: auto;
  ${webkitVisibleScrollbar}
`

const BlockTable = styled(Table)`
  border: 1px solid black;
  border-bottom: 0;
  position: relative;

  .table-head {
    background: pink;
    top: 0;
    z-index: 1;
    position: sticky;
  }

  .header-group {
  }
  .table-body {
  }

  .table-row {
    :last-child {
      .td {
        border-bottom: 0;
      }
    }
  }

  .column-head,
  .table-cell {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
`

const MemoizedTable = React.memo(BlockTable) as typeof Table

const blockTableInitialState = {
  sortBy: [{ id: "node", desc: false }],
  hiddenColumns: ["services"],
  globalFilter: { node: [] },
}

const globalFilterByNodeName = (rows, columnsIDs, filterValue) => {
  const nodeNames = filterValue.node || []
  const filteredRows = rows.filter(row => {
    const rowValue = row.values.node
    if (rowValue === undefined || nodeNames.length === 0) {
      return true
    }
    const formattedValue = String(rowValue).toLowerCase()
    return nodeNames.some(nodeName => formattedValue.includes(String(nodeName).toLowerCase()))
  })
  return filteredRows
}

tableStory.add(
  "Block layout table",
  () => {
    const [groupBy, setGroupBy] = useState([] as string[])
    const [tableRef, setTableRef] = useState({ current: null }) as any
    const [filterValue, setFilterValue] = useState("")
    const [globalFilter, setGlobalFilter] = useState({ node: [] } as any)

    const handleAddFilter = (e: any) => {
      if (e.keyCode === 13) {
        setGlobalFilter({ node: [...globalFilter.node, filterValue] })
        setFilterValue("")
      }
    }

    const controlledState = useMemo(
      () => ({
        groupBy,
        globalFilter,
      }),
      [groupBy, globalFilter]
    )

    return (
      <div>
        <div>
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
              <option value="status"> Alarm Status</option>
              <option value="services"> Services </option>
            </select>
          </label>
          <input
            value={filterValue}
            onChange={e => {
              setFilterValue(e.target.value)
            }}
            placeholder="Add filters"
            onKeyDown={handleAddFilter}
          />
          {globalFilter.node.map(name => `${name} `)}
        </div>
        <FixedContainer>
          <MemoizedTable<Node>
            callbackRef={node => {
              if (tableRef.current === null && node !== null) {
                setTableRef({ current: node })
              }
            }}
            groupsOrderSettings={groupsOrderSettings}
            layoutType="block"
            controlledState={controlledState}
            initialState={blockTableInitialState}
            columns={NodesTableSchema}
            data={preparedData}
            groupByFn={customGroupBy}
            globalFilter={globalFilterByNodeName}
          />
        </FixedContainer>
      </div>
    )
  },
  subData
)

const StyledTable = styled(Table)`
  width: 600px;
  background-color: ${getColor(["red", "roseWhite"])};
`

tableStory.add(
  "Users with overrided style",

  () => (
    <StyledTable
      sortableBy={["user"]}
      columns={UserTableSchema}
      data={initialState}
      selectedItemsClb={() => {}}
    />
  ),
  subData
)
