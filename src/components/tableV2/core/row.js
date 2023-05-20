import React, { useRef, useLayoutEffect } from "react"
import { flexRender } from "@tanstack/react-table"
import { useTableContext } from "../features/provider"
import Table from "./base-table"

export default ({
  table,
  pinnedStyles,
  row,
  virtualRow,
  onClickRow,
  disableClickRow,
  testPrefix,
  testPrefixCallback,
  getRowHandler,
  onHover,
  coloredSortedColumn,
  hoveredRow,
  enableColumnPinning,
  side,
}) => {
  const ref = useRef()
  const cells = row[getRowHandler]()
  const { rowsHeight, setRowHeight } = useTableContext()
  const rowHeight = rowsHeight[virtualRow.index]

  useLayoutEffect(() => {
    if (enableColumnPinning || ["left", "right"].includes(side)) {
      const height = ref.current?.clientHeight || 0
      setRowHeight({ index: virtualRow.index, height })
    }
  }, [])

  return (
    <Table.Row
      key={virtualRow.key}
      data-testid={`netdata-table-row${testPrefix}${
        testPrefixCallback ? "-" + testPrefixCallback(row.original) : ""
      }`}
      onClick={
        onClickRow
          ? () => onClickRow({ data: row.original, table: table, fullRow: row })
          : undefined
      }
      disableClickRow={() => disableClickRow?.({ data: row.original, table: table, fullRow: row })}
      ref={ref}
      {...(rowHeight ? { height: `${rowHeight}px` } : {})}
    >
      {cells.map((cell, index) => (
        <Table.Cell
          key={cell.column.columnDef.id}
          data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
          pinnedStyles={index === cells.length - 1 ? pinnedStyles : {}}
          width={cell.column.getSize()}
          onMouseEnter={() => onHover({ row: row.id, column: cell.column.id })}
          onMouseLeave={() => onHover()}
          tableMeta={
            typeof cell.column.columnDef.tableMeta === "function"
              ? cell.column.columnDef.tableMeta(row, cell, index)
              : cell.column.columnDef.tableMeta
          }
          meta={
            typeof cell.column.columnDef.meta === "function"
              ? cell.column.columnDef.meta(row)
              : cell.column.columnDef.meta
          }
          {...(cell.column.getCanSort() &&
            coloredSortedColumn &&
            !!cell.column.getIsSorted() && {
              background: "columnHighlight",
              backgroundOpacity: virtualRow.index % 2 == 0 ? "0.2" : "0.4",
            })}
          index={virtualRow.index}
          isRowHovering={row.id === hoveredRow}
          {...(enableColumnPinning ? { cellHeight: `${rowHeight}px` } : {})}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Table.Cell>
      ))}
    </Table.Row>
  )
}
