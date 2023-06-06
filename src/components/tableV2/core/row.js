import React, { useRef, useLayoutEffect } from "react"
import { flexRender } from "@tanstack/react-table"
import { useTableContext } from "../features/provider"
import Table from "./base-table"

export default ({
  coloredSortedColumn,
  disableClickRow,
  enableColumnPinning,
  getRowHandler,
  hoveredRow,
  onClickRow,
  onHover,
  pinnedStyles,
  row,
  side,
  table,
  testPrefix,
  testPrefixCallback,
  virtualRow,
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
        row.getCanExpand()
          ? () => row.toggleExpanded()
          : onClickRow
          ? () => onClickRow({ data: row.original, table: table, fullRow: row })
          : undefined
      }
      disableClickRow={() => disableClickRow?.({ data: row.original, table: table, fullRow: row })}
      ref={ref}
      {...(rowHeight ? { height: `${rowHeight}px` } : {})}
    >
      {cells.map((cell, index) => (
        <Table.Cell
          data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
          key={cell.column.columnDef.id}
          index={virtualRow.index}
          isRowExpandable={row.getCanExpand()}
          isRowHovering={row.id === hoveredRow}
          meta={
            typeof cell.column.columnDef.meta === "function"
              ? cell.column.columnDef.meta(row)
              : cell.column.columnDef.meta
          }
          onMouseEnter={() => onHover({ row: row.id, column: cell.column.id })}
          onMouseLeave={() => onHover()}
          pinnedStyles={index === cells.length - 1 ? pinnedStyles : {}}
          tableMeta={
            typeof cell.column.columnDef.tableMeta === "function"
              ? cell.column.columnDef.tableMeta(row, cell, index)
              : cell.column.columnDef.tableMeta
          }
          width={cell.column.getSize()}
          {...(cell.column.getCanSort() &&
            coloredSortedColumn &&
            !!cell.column.getIsSorted() && {
              background: "columnHighlight",
              backgroundOpacity: virtualRow.index % 2 === 0 ? "0.2" : "0.4",
            })}
          {...(enableColumnPinning ? { cellHeight: `${rowHeight}px` } : {})}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Table.Cell>
      ))}
    </Table.Row>
  )
}
