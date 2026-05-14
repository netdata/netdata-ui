import React, { memo, useCallback, useRef, useEffect, useMemo } from "react"
import { useVirtualizer, defaultRangeExtractor } from "@tanstack/react-virtual"
import identity from "lodash/identity"
import Flex from "@/components/templates/flex"
import { useTableState } from "../provider"
import Row from "./row"
import Header from "./header"
import RowPlaceholdersRenderer from "./rowPLaceholdersRenderer"

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
    RowPlaceholder,
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
    // index 0 is reserved for the sticky header (see count = rows + 1 and rangeExtractor above)
    const firstVirtualDataIndex = virtualRows[1]?.index ?? 1
    const lastVirtualDataIndex = virtualRows[virtualRows.length - 1]?.index ?? 0

    const placeholders = useMemo(() => {
      if (!RowPlaceholder) return { before: [], after: [] }

      const N = overscan || 15
      const firstDataIndex = 1
      const lastDataIndex = rows.length

      // "before" = up to N data rows immediately before the virtual window (outside overscan)
      const beforeEnd = firstVirtualDataIndex
      const beforeStart = Math.max(firstDataIndex, beforeEnd - N)

      // "after" = up to N data rows immediately after the virtual window (outside overscan)
      const afterStart = lastVirtualDataIndex + 1
      const afterEnd = Math.min(lastDataIndex + 1, afterStart + N)

      return {
        before: Array.from({ length: beforeEnd - beforeStart }, (_, i) => beforeStart + i),
        after: Array.from({ length: afterEnd - afterStart }, (_, i) => afterStart + i),
      }
    }, [RowPlaceholder, firstVirtualDataIndex, lastVirtualDataIndex, rows.length, overscan])

    const getPlaceholderOffset = useCallback(
      index => {
        // measurementsCache is populated for all count items on every render
        // (getTotalSize calls getMeasurements which fills the full cache).
        // Entries use real sizes for measured rows and estimateSize for the rest.
        const cached = rowVirtualizer.measurementsCache[index]
        return cached ? cached.start : 0
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
          <RowPlaceholdersRenderer
            RowPlaceholder={RowPlaceholder}
            items={placeholders.before}
            getPlaceholderOffset={getPlaceholderOffset}
          />
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
          <RowPlaceholdersRenderer
            RowPlaceholder={RowPlaceholder}
            items={placeholders.after}
            getPlaceholderOffset={getPlaceholderOffset}
          />
        </div>
      </Flex>
    )
  }
)

export default Body
