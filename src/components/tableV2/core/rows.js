import React, { useState, useEffect } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { flexRender } from "@tanstack/react-table"
import Table from "./base-table"
import { CELL_HEIGHT } from "../constants"

const Rows = ({
  disableClickRow,
  getRowHandler = "getCenterVisibleCells",
  onHoverRow,
  hoveredRow,
  onClickRow,
  pinnedStyles,
  table,
  testPrefix,
  testPrefixCallback,
  scrollParentRef,
  overscan,
  hasNextPage,
  loading,
  loadMore,
}) => {
  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => CELL_HEIGHT,
    overscan: overscan || 5,
  })

  const virtualRows = virtualizer.getVirtualItems()

  useEffect(() => {
    if (!loadMore) return

    const lastItem = virtualRows[virtualRows.length - 1]

    if (!lastItem) return

    if (lastItem.index >= rows.length - 1 && hasNextPage && !loading) loadMore()
  }, [virtualRows])

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0

  const totalHeight = virtualizer.getTotalSize()
  const paddingBottom =
    virtualRows.length > 0 ? totalHeight - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0

  return (
    <>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {virtualizer.getVirtualItems().map(virtualRow => {
        const row = rows[virtualRow.index]
        const cells = row[getRowHandler]()

        return (
          <Table.Row
            key={virtualRow.key}
            data-testid={`netdata-table-row${testPrefix}${
              testPrefixCallback ? "-" + testPrefixCallback(row.original) : ""
            }`}
            onClick={() => onClickRow?.({ data: row.original, table: table, fullRow: row })}
            disableClickRow={() =>
              disableClickRow?.({ data: row.original, table: table, fullRow: row })
            }
            onMouseEnter={() => onHoverRow(row.id)}
            onMouseLeave={() => onHoverRow(null)}
            isHovering={row.id === hoveredRow}
            background={virtualRow.index % 2 == 0 ? "mainBackground" : "tableRowBg"}
          >
            {cells.map((cell, index) => (
              <Table.Cell
                key={cell.column.columnDef.id}
                data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
                maxWidth={cell.column.columnDef.maxSize}
                minWidth={cell.column.columnDef.minSize}
                pinnedStyles={index === cells.length - 1 ? pinnedStyles : {}}
                width={cell.column.getSize()}
                {...cell.column.columnDef.meta}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        )
      })}

      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </>
  )
}

export default Rows
