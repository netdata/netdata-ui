import React, { useCallback } from "react"

import Row from "./row"
import DataCell from "./dataCell"

import useSharedTable from "../hooks/useSharedTable"

const Rows = ({
  disableClickRow,
  flexRender,
  getRowHandler = "getCenterVisibleCells",
  onHoverRow,
  onClickRow,
  pinnedStyles,
  table,
  testPrefix,
  testPrefixCallback,
}) => {
  const { state, updateState } = useSharedTable({})

  const handleOnMouseEnter = useCallback(
    id => {
      onHoverRow?.()
      updateState({ currentHoveredRow: id })
    },
    [onHoverRow, updateState]
  )

  const handleOnMouseLeave = useCallback(() => {
    updateState({ currentHoveredRow: null })
  }, [onHoverRow, updateState])

  return table.getRowModel().rows.map(row => {
    const cells = row[getRowHandler]()

    return (
      <Row
        id={row.id}
        key={row.id}
        testPrefix={testPrefix}
        testPrefixCallback={testPrefixCallback}
        row={row}
        table={table}
        onClickRow={onClickRow}
        disableClickRow={disableClickRow}
        onMouseEnter={() => handleOnMouseEnter(row.id)}
        onMouseLeave={handleOnMouseLeave}
        isHovering={row.id === state?.currentHoveredRow}
      >
        {cells.map((cell, index) => {
          const isLast = cells.length === index + 1

          return (
            <DataCell
              cell={cell}
              flexRender={flexRender}
              key={cell.column.columnDef.id}
              pinnedStyles={isLast ? pinnedStyles : {}}
              testPrefix={testPrefix}
            />
          )
        })}
      </Row>
    )
  })
}

export default Rows
