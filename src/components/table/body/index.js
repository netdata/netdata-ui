import React, { memo, useCallback, useRef, useEffect, useMemo } from "react"
import { useVirtualizer, defaultRangeExtractor } from "@tanstack/react-virtual"
import identity from "lodash/identity"
import Flex from "@/components/templates/flex"
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
    enableColumnReordering,
    renderPlaceholder,
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

    const placeholders = useMemo(() => {
      if (!renderPlaceholder) return { before: [], after: [] }

      const range = rowVirtualizer.calculateRange()
      if (!range) return { before: [], after: [] }

      const { startIndex, endIndex } = range
      if (startIndex === undefined || endIndex === undefined)
        return { before: [], after: [] }

      // Adjust for header: index 0 is the header row, data rows start at 1
      const firstDataIndex = 1
      const lastDataIndex = rows.length

      // "before" = data rows with index < startIndex (excluding header at 0)
      const beforeStart = firstDataIndex
      const beforeEnd = Math.max(beforeStart, startIndex)

      // "after" = data rows with index > endIndex
      const afterStart = Math.min(lastDataIndex, endIndex + 1)
      const afterEnd = lastDataIndex + 1

      return {
        before: Array.from({ length: beforeEnd - beforeStart }, (_, i) => beforeStart + i),
        after: Array.from({ length: afterEnd - afterStart }, (_, i) => afterStart + i),
      }
    }, [renderPlaceholder, virtualRows, rows.length])

    const getPlaceholderOffset = useCallback(
      index => {
        // For rows that have been measured by the virtualizer, use their known offset
        const virtualItem = rowVirtualizer.getVirtualItems().find(v => v.index === index)
        if (virtualItem) return virtualItem.start

        // For unmeasured rows (typically "after" rows), estimate using estimateSize
        const estimateSize = rowVirtualizer.options.estimateSize
        let offset = 0
        for (let i = 0; i < index; i++) {
          const knownSize = rowVirtualizer.getSize(i)
          offset += knownSize > 0 ? knownSize : estimateSize(i)
        }
        return offset
      },
      [rowVirtualizer]
    )

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
      <Flex
        ref={ref}
        height="100%"
        overflow="auto"
        flex="1"
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
          {renderPlaceholder &&
            placeholders.before.map(index => (
              <div
                key={`placeholder-before-${index}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `translateY(${getPlaceholderOffset(index)}px)`,
                  minWidth: "100%",
                }}
              >
                {renderPlaceholder({
                  index: index - 1,
                  isBefore: true,
                  table,
                })}
              </div>
            ))}
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
                    enableColumnReordering={enableColumnReordering}
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
          {renderPlaceholder &&
            placeholders.after.map(index => (
              <div
                key={`placeholder-after-${index}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `translateY(${getPlaceholderOffset(index)}px)`,
                  minWidth: "100%",
                }}
              >
                {renderPlaceholder({
                  index: index - 1,
                  isBefore: false,
                  table,
                })}
              </div>
            ))}
        </div>
      </Flex>
    )
  }
)

export default Body
