import React, { useState, useMemo, useCallback, useEffect } from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import { useMeasure } from "react-use"
import { VirtualizedTable } from "./virtualized-table"
import { NodesTableSchema } from "./mocks/nodes-table-schema"
import { readmeCleanup } from "../../../utils/readme"
// @ts-ignore
import readme from "./README.md"
import { customGroupBy, filterByExpressions, filterOptions } from "./mocks/utils"
import { FilterBox, FilterExpression } from "../filter-box"

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["table.test.tsx"],
}
const virtualizedTableStory = storiesOf("COMPONENTS|Controls/VirtualizedTable", module)

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

const sampleNodes = new Array(200).fill(sampleNode)

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
]

const virtualNodesData = [...nodesData, ...sampleNodes]

const getItemKey = (index, data) => {
  const row = data.orderedRows[index]
  return `${(row.original && row.original.node.name) || row.id} ${index}`
}

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

const NoScrollContainer = styled.div`
  position: relative;
  height: 350px;
  width: 400px;
`

const VirtualizedBlockTable = styled(VirtualizedTable)`
  border: 1px solid black;
  border-bottom: 0;
  position: relative;

  .table-head {
    top: 0;
    left: 0;
    background: pink;
    z-index: 1;
    position: sticky !important;
    position: -webkit-sticky !important;
  }

  .header-group {
  }
  .table-body {
    position: relative;
    width: 100%;
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

const MemoizedVirtualTable = React.memo<any>(VirtualizedBlockTable) as typeof VirtualizedTable

const blockTableInitialState = {
  sortBy: [{ id: "node", desc: false }],
  hiddenColumns: ["services"],
}

virtualizedTableStory.add(
  "Virtualized table",
  () => {
    const [groupBy, setGroupBy] = useState([] as string[])
    const [globalFilter, setGlobalFilter] = useState({ expressions: [] as FilterExpression[] })
    const [tableRef, setTableRef] = useState({ current: null }) as any
    const [virtualContainerRef, setVirtualContainerRef] = useState({ current: null })
    const [nodes, setNodes] = useState(virtualNodesData)
    const [resultsQty, setResultsQty] = useState(undefined)

    const virtualizedData = useMemo(() => prepareData(nodes), [nodes])

    const controlledState = useMemo(
      () => ({
        groupBy,
        globalFilter,
      }),
      [globalFilter, groupBy]
    )

    const [ref, { width, height }] = useMeasure()

    const nodeHeights = useMemo(() => nodes.map(() => 25 + Math.round(Math.random() * 50)), [nodes])
    const getItemHeight = useCallback((index: number) => nodeHeights[index] + 8, [nodeHeights])

    const virtualizedSettings = useMemo(
      () => ({
        width,
        height,
        itemSize: getItemHeight,
        variableSize: true,
        verticalGutter: 8,
        itemKey: getItemKey,
        rendererHash: nodes.reduce((acc, current) => {
          return `${acc}${current.node.name}`
        }, ""),
        outerRef: node => {
          if (virtualContainerRef.current === null && node !== null) {
            setVirtualContainerRef({ current: node })
          }
        },
      }),
      [width, height, getItemHeight, nodes, virtualContainerRef]
    )

    useEffect(() => {
      if (tableRef.current) {
        tableRef.current.resetAfterIndex(0, false)
      }
      // eslint-disable-next-line
    }, [nodes])

    const handleFilterExpressions = (expressions: FilterExpression[]) => {
      setGlobalFilter({ expressions })
    }

    const logResults = useCallback(results => {
      setResultsQty(results.length)
    }, [])

    return (
      <div>
        <div>
          <label htmlFor="groupBySelect">
            Group by:
            <select
              id="groupBySelect"
              onChange={(e: any) => {
                const { value }: { value: string } = e.target as any
                tableRef.current.resetAfterIndex(0, false) // sizes cache invalidation
                setGroupBy([value])
              }}
            >
              <option value="">None</option>
              <option value="status"> Alarm Status</option>
              <option value="services"> Services </option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              const [first, ...rest] = nodes
              setNodes(rest)
            }}
          >
            delete first
          </button>
          <button
            type="button"
            onClick={() => {
              const [first, second, ...rest] = nodes

              setNodes([first, { ...second, alarm: { critical: 1, warning: 0 } }, ...rest])
            }}
          >
            change status
          </button>
        </div>
        <div>
          <FilterBox
            data={virtualizedData}
            options={filterOptions}
            onParseOk={handleFilterExpressions}
            accessorPaths={{ node: ["node", "name"] }}
            resultsQty={resultsQty}
          />
        </div>
        <NoScrollContainer ref={ref}>
          {width > 0 && height > 0 && (
            <MemoizedVirtualTable<Node>
              callbackRef={node => {
                console.log("table rerender")
                if (tableRef.current === null && node !== null) {
                  setTableRef({ current: node })
                }
              }}
              groupsOrderSettings={groupsOrderSettings}
              layoutType="block"
              controlledState={controlledState}
              initialState={blockTableInitialState}
              columns={NodesTableSchema}
              data={virtualizedData}
              groupByFn={customGroupBy}
              virtualizedSettings={virtualizedSettings}
              globalFilter={filterByExpressions}
              dataResultsCallback={logResults}
            />
          )}
        </NoScrollContainer>
      </div>
    )
  },
  subData
)
