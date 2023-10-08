import React, { forwardRef } from "react"
import { flexRender } from "@tanstack/react-table"
import { useTableContext } from "../provider"
import Table from "./base-table"

export default forwardRef(
  (
    {
      coloredSortedColumn,
      disableClickRow,
      getRowHandler,
      onClickRow,
      pinnedStyles,
      row,
      table,
      testPrefix,
      testPrefixCallback,
      virtualRow,
    },
    ref
  ) => {
    const cells = row[getRowHandler]()
    const { onHover, hoveredRow } = useTableContext()

    return (
      <Table.Row
        key={virtualRow.key}
        data-testid={`netdata-table-row${testPrefix}${
          testPrefixCallback ? "-" + testPrefixCallback(row.original) : ""
        }`}
        onClick={
          row.getCanExpand() && !row.depth
            ? undefined
            : onClickRow
            ? () => onClickRow({ data: row.original, table: table, fullRow: row })
            : undefined
        }
        disableClickRow={() =>
          disableClickRow?.({ data: row.original, table: table, fullRow: row })
        }
        ref={ref}
        data-index={virtualRow.index}
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
            row={row}
            cell={cell}
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
            flex={cell.column.columnDef.fullWidth ? 1 : undefined}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Table.Cell>
        ))}
      </Table.Row>
    )
  }
)
