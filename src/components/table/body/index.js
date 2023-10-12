import React, { useCallback, useRef, useEffect } from "react"
import { useVirtualizer, defaultRangeExtractor } from "@tanstack/react-virtual"
import Flex from "@/components/templates/flex"
import Row from "./row"
import Header from "./header"

const Body = ({
  dataGa,
  table,
  testPrefix,
  testPrefixCallback,
  coloredSortedColumn,
  meta,
  overscan,
  getHasNextPage,
  getHasPrevPage,
  getItemKey,
  getIsLoading,
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

    if (lastItem.index === rows.length && getHasNextPage() && !getIsLoading()) {
      loadMore("backward")
    }
  }, [virtualRows, getIsLoading()])

  useEffect(() => {
    if (!loadMore) return

    const first = virtualRows[1]

    if (!first) return

    if (first.index === 1 && getHasPrevPage() && !getIsLoading()) {
      loadMore("forward")
    }
  }, [virtualRows, getHasPrevPage(), getIsLoading()])

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
              key={`${virtualRow.key}-${virtualRow.index}`}
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
            </Flex>
          )
        })}
      </div>
    </div>
  )
}

export default Body
