import React from "react"
import { CellBox, NestedCellContainer, NestedCell } from "./styled"

export const NodesTableSchema = [
  {
    id: "alarm",
    accessor: "alarm",
    width: 40,
    Header: () => {
      return <div />
    },
    Cell: ({ row, cell }: any) => {
      return <div>C: 0</div>
    },
  },
  {
    id: "node",
    accessor: row => {
      return row.node.name
    },
    width: 160,
    Header: ({ column }: any) => {
      return <div {...column.getGroupByToggleProps()}>Node name</div>
    },
    Cell: ({ cell, row }: any) => {
      const {
        node: { name },
      } = row.original
      return <div>{name}</div>
    },
  },

  {
    id: "chart",
    accessor: "chart",
    width: 200,
    Header: () => <div>Chart Name</div>,
    Cell: (props: any) => <div>Chart placeholder</div>,
  },
  {
    id: "chart2",
    accessor: "chart2",
    width: 200,
    Header: () => <div>Chart Name</div>,
    Cell: (props: any) => <div>Chart placeholder</div>,
  },
  {
    id: "chart3",
    accessor: "chart3",
    width: 200,
    Header: () => <div>Chart Name</div>,
    Cell: (props: any) => <div>Chart placeholder</div>,
  },
  {
    id: "chart4",
    accessor: "chart4",
    width: 200,
    Header: () => <div>Chart Name</div>,
    Cell: (props: any) => <div>Chart placeholder</div>,
  },
]
