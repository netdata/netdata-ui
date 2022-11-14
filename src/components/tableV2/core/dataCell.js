import React, { memo } from "react"

import Table from "./base-table"
import { SIZE_SUB_UNIT } from "src/theme/default/constants.js"

const DataCell = ({ cell, testPrefix, flexRender }) => {
  return (
    <Table.Cell
      width={cell.column.getSize() / SIZE_SUB_UNIT}
      minWidth={cell.column.columnDef.minSize}
      maxWidth={cell.column.columnDef.maxSize}
      data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
      key={cell.id}
      {...cell.column.columnDef.meta}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Table.Cell>
  )
}

export default memo(DataCell)
