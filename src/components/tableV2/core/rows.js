import React, { useCallback } from "react"

import Row from "./row"
import DataCell from "./dataCell"

import useSharedTable from "../hooks/useSharedTable"
import { useVirtualizer } from "@tanstack/react-virtual"

import { TABLE_HEAD_HEIGHT } from "../constants"

const Rows = ({
  disableClickRow,
  flexRender,
  getRowHandler = "getCenterVisibleCells",
  onHoverRow,
  onClickRow,
  pinnedStyles,
  table,
  testPrefix,
  testPrefixCallback,
  scrollParentRef,
}) => {
  const { state, updateState } = useSharedTable({})
  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => 65,
    overscan: 15,
  })

  const virtualRows = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize() + TABLE_HEAD_HEIGHT

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0

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
  return (
    <>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {virtualizer.getVirtualItems().map(({ index }) => {
        console.log({ index })
        const row = rows[index]
        const cells = row[getRowHandler]()

        return (
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
            {cells.map((cell, index) => {
              const isLast = cells.length === index + 1

              return (
                <DataCell
                  cell={cell}
                  flexRender={flexRender}
                  key={cell.column.columnDef.id}
                  pinnedStyles={isLast ? pinnedStyles : {}}
                  testPrefix={testPrefix}
                />
              )
            })}
          </Row>
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
