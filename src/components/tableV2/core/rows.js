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
  hasPrevPage,
  getItemKey,
  loading,
  loadMore,
  coloredSortedColumn,
  meta,
  enableColumnPinning,
  side,
  onVirtualChange,
  virtualRef,
  initialOffset = 0,
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
    initialOffset,
    getItemKey,
  })

  if (virtualRef) virtualRef.current = virtualizer

  const virtualRows = virtualizer.getVirtualItems()

  useEffect(() => {
    if (!loadMore) return

    const lastItem = virtualRows[virtualRows.length - 1]

    if (!lastItem) return

    if (lastItem.index === rows.length - 1 && hasNextPage && !loading) loadMore("backward")
  }, [virtualRows, loading])

  useEffect(() => {
    if (!loadMore) return

    const first = virtualRows[0]

    if (!first) return

    if (first.index === 0 && hasPrevPage && !loading) {
      loadMore("forward")
    }
  }, [virtualRows, hasPrevPage, loading, rows])

  const totalHeight = virtualizer.getTotalSize()
  const [paddingTop, paddingBottom] = useMemo(
    () =>
      virtualRows.length > 0
        ? [virtualRows?.[0]?.start, totalHeight - (virtualRows?.[virtualRows.length - 1]?.end || 0)]
        : [0, 0],
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
            key={`${virtualRow.key}-${virtualRow.index}`}
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
