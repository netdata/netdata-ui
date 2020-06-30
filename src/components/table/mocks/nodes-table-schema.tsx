import React, { useCallback } from "react"
import { UnreachableNodeMask } from "./styled"
import { Toggle } from "../../toggle"

export const NodesTableSchema = [
  {
    id: "status",
    accessor: "status",
    width: 40,
    Header: () => {
      return <div />
    },
    Cell: ({ cell }: any) => {
      return <div>{cell.value === "critical" && "X"}</div>
    },
  },
  {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }: any) => {
      const { indeterminate, ...rest } = getToggleAllRowsSelectedProps()
      return <Toggle {...rest} labelLeft="off" labelRight="on" colored={!indeterminate} />
    },
    Cell: ({ row, itemIsDisabled, toggleSelectedItemClb }: any) => {
      const { checked, onChange, ...rest } = row.getToggleRowSelectedProps()

      const isDisabled = itemIsDisabled ? itemIsDisabled(row.original) : false
      const isChecked = isDisabled ? false : checked

      const onToggle = useCallback(
        e => {
          if (!isDisabled && toggleSelectedItemClb) {
            toggleSelectedItemClb(row.original, e.target.checked)
          }

          onChange(e)
        },
        [row, isDisabled, toggleSelectedItemClb, onChange]
      )

      return (
        <Toggle
          {...rest}
          checked={isChecked}
          onChange={onToggle}
          disabled={isDisabled}
          labelLeft="off"
          labelRight="on"
          colored={checked}
        />
      )
    },
  },
  { id: "services", accessor: "services" },
  {
    id: "node",
    accessor: row => {
      return row.node.name
    },
    width: 160,
    Header: () => {
      return <div>Node name</div>
    },
    Cell: ({ row }: any) => {
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
    Cell: () => <div>Chart placeholder</div>,
  },
  {
    id: "chart2",
    accessor: "chart2",
    width: 200,
    Header: () => <div>Chart Name</div>,
    Cell: () => <div>Chart placeholder</div>,
  },
  {
    id: "chart3",
    accessor: "chart3",
    width: 200,
    Header: () => <div>Chart Name</div>,
    Cell: () => <div>Chart placeholder</div>,
  },
  {
    id: "chart4",
    accessor: "chart4",
    width: 200,
    Header: () => <div>Chart Name</div>,
    Cell: () => <div>Chart placeholder</div>,
  },
]
