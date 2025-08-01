import React, { memo, useCallback, useRef, useEffect } from "react"
import { useVirtualizer, defaultRangeExtractor } from "@tanstack/react-virtual"
import identity from "lodash/identity"
import { useTableState } from "../provider"
import Row from "./row"
import Header from "./header"

const noop = () => {}

const rerenderSelector = state => ({
  sorting: state.sorting,
  sizing: state.columnSizing,
  rowsById: state.rowsById,
  expanded: state.expanded,
  grouping: state.grouping,
})

const Body = memo(
  ({
    dataGa,
    table,
    testPrefix,
    testPrefixCallback,
    coloredSortedColumn,
    meta,
    overscan,
    getHasNextPage = noop,
    getHasPrevPage = noop,
    getItemKey = identity,
    loading,
    loadMore = noop,
    onVirtualChange,
    virtualRef,
    initialOffset = 0,
    onScroll,
    ...rest
  }) => {
    useTableState(rerenderSelector)
    const ref = useRef()

    const { rows } = table.getRowModel()

    const rowVirtualizer = useVirtualizer({
      count: rows.length ? rows.length + 1 : 1,
      getScrollElement: () => ref.current,
      enableSmoothScroll: false,
      estimateSize: () =>
        (!!meta.styles?.height && parseInt(meta.styles.height)) ||
        (!!meta.cellStyles?.height && parseInt(meta.cellStyles.height)) ||
        35,
      overscan: overscan || 15,
      onChange: onVirtualChange,
      initialOffset,
      getItemKey: index => (index === 0 ? "header" : getItemKey(index - 1)),
      rangeExtractor: useCallback(range => {
        if (range.count && range.startIndex >= 0) {
          const next = new Set([0, ...defaultRangeExtractor(range)])
          return [...next].sort((a, b) => a - b)
        }

        return defaultRangeExtractor(range)
      }, []),
    })

    if (virtualRef) virtualRef.current = rowVirtualizer

    const virtualRows = rowVirtualizer.getVirtualItems()

    useEffect(() => {
      if (!loadMore) return

      const lastItem = virtualRows[virtualRows.length - 1]

      if (!lastItem) return

      if (lastItem.index >= rows.length && getHasNextPage() && !loading) {
        loadMore("backward")
      }
    }, [virtualRows, loading])

    useEffect(() => {
      if (!loadMore) return

      const first = virtualRows[1]

      if (!first) return

      if (first.index <= 1 && getHasPrevPage() && !loading) {
        loadMore("forward")
      }
    }, [virtualRows, getHasPrevPage(), loading])

    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          height: "100%",
          overflow: "auto",
          flex: "1",
          // maxWidth: `min(${table.getTotalSize()}, 100%)`, // WHY: Removing since it causes issues with fullWidth cells
        }}
        data-testid={`netdata-table${testPrefix}`}
        onScroll={onScroll}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
            display: "flex",
            flex: "1 0 auto",
          }}
        >
          {virtualRows.map(virtualRow => {
            return (
              <div
                key={virtualRow.key}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  top: 0,
                  left: 0,
                  position: virtualRow.key === "header" ? "sticky" : "absolute",
                  zIndex: virtualRow.key === "header" ? 1 : 0,
                  minWidth: "100%",
                  alignSelf: "start",
                  flex: "1 1 auto",
                  display: "flex",
                }}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
              >
                {virtualRow.index === 0 ? (
                  <Header
                    dataGa={dataGa}
                    table={table}
                    testPrefix={testPrefix}
                    coloredSortedColumn={coloredSortedColumn}
                    index={virtualRow.index}
                    {...rest}
                  />
                ) : (
                  <Row
                    dataGa={dataGa}
                    table={table}
                    testPrefix={testPrefix}
                    testPrefixCallback={testPrefixCallback}
                    coloredSortedColumn={coloredSortedColumn}
                    meta={meta}
                    row={rows[virtualRow.index - 1]}
                    index={virtualRow.index}
                    {...rest}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

export default Body
