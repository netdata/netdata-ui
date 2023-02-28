import React, { useEffect, useMemo } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { flexRender } from "@tanstack/react-table"
import { useTableContext } from "../features/provider"
import Table from "./base-table"

const Rows = ({
  disableClickRow,
  getRowHandler = "getCenterVisibleCells",
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
  coloredSortedColumn,
  meta,
}) => {
  const { onHover, hoveredRow } = useTableContext()

  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () =>
      (!!meta.styles?.height && parseInt(meta.styles.height)) ||
      (!!meta.cellStyles?.height && parseInt(meta.cellStyles.height)) ||
      35,
    overscan: overscan || 10,
  })

  const virtualRows = virtualizer.getVirtualItems()

  useEffect(() => {
    if (!loadMore) return

    const lastItem = virtualRows[virtualRows.length - 1]

    if (!lastItem) return

    if (lastItem.index === rows.length - 1 && hasNextPage && !loading) loadMore()
  }, [virtualRows, loading])

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0

  const totalHeight = virtualizer.getTotalSize()
  const paddingBottom = useMemo(
    () =>
      virtualRows.length > 0 ? totalHeight - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0,
    [virtualRows.length]
  )

  return (
    <>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {virtualRows.map(virtualRow => {
        const row = rows[virtualRow.index]
        const cells = row[getRowHandler]()

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
            disableClickRow={() =>
              disableClickRow?.({ data: row.original, table: table, fullRow: row })
            }
          >
            {cells.map((cell, index) => (
              <Table.Cell
                key={cell.column.columnDef.id}
                data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
                maxWidth={cell.column.columnDef.maxSize}
                minWidth={cell.column.columnDef.minSize}
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
