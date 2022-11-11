import React, { memo } from "react"

import Table from "./base-table"

const Row = ({
  children,
  testPrefix,
  testPrefixCallback,
  row,
  table,
  onClickRow,
  disableClickRow,
  id,
  onHoverRow,
  isHovering,
}) => {
  return (
    <Table.Row
      data-testid={`netdata-table-row${testPrefix}${
        testPrefixCallback ? "-" + testPrefixCallback?.(row.original) : ""
      }`}
      onClick={onClickRow && (() => onClickRow({ data: row.original, table: table, fullRow: row }))}
      disableClickRow={() =>
        disableClickRow && disableClickRow({ data: row.original, table: table, fullRow: row })
      }
      onMouseEnter={() => {
        onHoverRow && onHoverRow?.(table, id)
      }}
      onMouseLeave={() => {
        onHoverRow?.(table, null)
      }}
      isHovering={isHovering}
    >
      {children}
    </Table.Row>
  )
}

export default Row
