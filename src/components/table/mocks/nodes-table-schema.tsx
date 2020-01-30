import React from "react"
import { UnreachableNodeMask } from "./styled"

export const NodesTableSchema = [
  {
    id: "status",
    accessor: "status",
    width: 40,
    Header: () => {
      return <div />
    },
    Cell: ({ row, cell }: any) => {
      return <div>{cell.value === "critical" && "X"}</div>
    },
  },
  { id: "services", accessor: "services" },
  {
    id: "node",
    accessor: row => {
      return row.node.name
    },
    width: 160,
    Header: ({ column }: any) => {
      return <div>Node name</div>
    },
    Cell: ({ cell, row }: any) => {
      const {
        node: { name },
        status,
      } = row.original
      if (status === "unreachable") {
        return (
          <>
            <div>{name}</div>
            <UnreachableNodeMask>Unreachable</UnreachableNodeMask>
          </>
        )
      }
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
