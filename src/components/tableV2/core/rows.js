import React from "react"

import Row from "./row"
import DataCell from "./dataCell"

const makeRows = ({
  testPrefixCallback,
  testPrefix,
  onClickRow,
  table,
  disableClickRow,
  flexRender,
  getRowHandler = "getCenterVisibleCells",
}) => {
  return table.getRowModel().rows.map(row => (
    <Row
      key={row.id}
      testPrefix={testPrefix}
      testPrefixCallback={testPrefixCallback}
      row={row}
      table={table}
      onClickRow={onClickRow}
      disableClickRow={disableClickRow}
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

export default makeRows
