import React, { useEffect, useMemo } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useTableContext } from "../features/provider"
import Row from "./row"

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
  enableColumnPinning,
  side,
  onVirtualChange,
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
    onChange: onVirtualChange,
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

        return (
          <Row
            key={virtualRow.key}
            table={table}
            pinnedStyles={pinnedStyles}
            row={row}
            virtualRow={virtualRow}
            onClickRow={onClickRow}
            disableClickRow={disableClickRow}
            testPrefix={testPrefix}
            testPrefixCallback={testPrefixCallback}
            getRowHandler={getRowHandler}
            onHover={onHover}
            coloredSortedColumn={coloredSortedColumn}
            hoveredRow={hoveredRow}
            enableColumnPinning={enableColumnPinning}
            side={side}
          />
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
