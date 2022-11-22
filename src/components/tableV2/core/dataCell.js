import React, { memo } from "react"

import Table from "./base-table"

const DataCell = ({ cell, flexRender, pinnedStyles, testPrefix }) => {
  return (
    <Table.Cell
      data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
      key={cell.id}
      maxWidth={cell.column.columnDef.maxSize}
      minWidth={cell.column.columnDef.minSize}
      pinnedStyles={pinnedStyles}
      width={cell.column.getSize()}
      {...cell.column.columnDef.meta}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Table.Cell>
  )
}

export default memo(DataCell)
