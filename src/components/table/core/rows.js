import React, { useEffect } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
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
  onVirtualChange,
  virtualRef,
  initialOffset = 0,
}) => {
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
  }, [virtualRows[0]?.key, loading])

  useEffect(() => {
    if (!loadMore) return

    const first = virtualRows[0]

    if (!first) return

    if (first.index === 0 && hasPrevPage && !loading) {
      loadMore("forward")
    }
  }, [virtualRows[0]?.key, hasPrevPage, loading])

  const totalHeight = virtualizer.getTotalSize()
  const [paddingTop, paddingBottom] =
    virtualRows.length > 0
      ? [virtualRows?.[0]?.start, totalHeight - (virtualRows?.[virtualRows.length - 1]?.end || 0)]
      : [0, 0]

  return (
    <>
      {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }} />}
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
            coloredSortedColumn={coloredSortedColumn}
            ref={virtualizer.measureElement}
          />
        )
      })}

      {paddingBottom > 0 && <div style={{ height: `${paddingBottom}px` }} />}
    </>
  )
}

export default Rows
