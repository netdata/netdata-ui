import React, { memo, useCallback, useRef, useEffect } from "react"
import { useVirtualizer, defaultRangeExtractor } from "@tanstack/react-virtual"
import Flex from "src/components/templates/flex"
import Row from "./row"
import Header from "./header"

const Body = memo(
  ({
    dataGa,
    table,
    testPrefix,
    testPrefixCallback,
    coloredSortedColumn,
    meta,
    overscan,
    hasNextPage,
    hasPrevPage,
    getItemKey,
    loading,
    loadMore,
    onVirtualChange,
    virtualRef,
    initialOffset = 0,
    ...rest
  }) => {
    const ref = useRef()

    const { rows } = table.getRowModel()

    const rowVirtualizer = useVirtualizer({
      count: rows.length ? rows.length + 1 : 0,
      getScrollElement: () => ref.current,
      enableSmoothScroll: false,
      estimateSize: () =>
        (!!meta.styles?.height && parseInt(meta.styles.height)) ||
        (!!meta.cellStyles?.height && parseInt(meta.cellStyles.height)) ||
        35,
      overscan: overscan || 15,
      onChange: onVirtualChange,
      initialOffset,
      getItemKey,
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

    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          minHeight: "100%",
          overflow: "auto",
        }}
        data-testid={`netdata-table${testPrefix}`}
      >
        <div
          style={{
            minHeight: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
            display: "flex",
            flex: "1 0 auto",
          }}
        >
          {virtualRows.map((virtualRow, index) => {
            return (
              <Flex
                key={virtualRow.key}
                sx={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                top={0}
                left={0}
                zIndex={virtualRows.length - index}
                position={virtualRow.index === 0 ? "sticky" : "absolute"}
                flex
                data-index={virtualRow.index}
                width={{ min: "100%" }}
                alignSelf="start"
                ref={rowVirtualizer.measureElement}
              >
                {virtualRow.index === 0 ? (
                  <Header
                    dataGa={dataGa}
                    table={table}
                    testPrefix={testPrefix}
                    coloredSortedColumn={coloredSortedColumn}
                    index={virtualRow.index}
                    rootRef={ref}
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
                    rootRef={ref}
                    {...rest}
                  />
                )}
              </Flex>
            )
          })}
        </div>
      </div>
    )
  }
)

export default Body
