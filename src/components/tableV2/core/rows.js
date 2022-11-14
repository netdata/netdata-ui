import React, { useCallback, memo } from "react"

import Row from "./row"
import DataCell from "./dataCell"

import useSharedTable from "../hooks/useSharedTable"

const Rows = ({
  testPrefixCallback,
  testPrefix,
  onClickRow,
  table,
  disableClickRow,
  flexRender,
  getRowHandler = "getCenterVisibleCells",
  onHoverRow,
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

  return table.getRowModel().rows.map(row => (
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
      {row[getRowHandler]().map(cell => {
        return (
          <DataCell
            key={cell.column.columnDef.id}
            cell={cell}
            flexRender={flexRender}
            testPrefix={testPrefix}
          />
        )
      })}
    </Row>
  ))
}

export default Rows
