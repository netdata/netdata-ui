import React, {
  memo,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  useState,
} from "react"
import { useVirtualizer, defaultRangeExtractor } from "@tanstack/react-virtual"
import identity from "lodash/identity"
import Flex from "@/components/templates/flex"
import { useTableState } from "../provider"
import Row from "./row"
import Header from "./header"
import RowPlaceholdersRenderer from "./rowPLaceholdersRenderer"
import { normalizeWindowRange } from "../largeData"
import { createRowMountController } from "./rowMountController"
import { measureTableElement } from "./measureElement"
import OverflowTooltip from "../components/overflowTooltip"

const deferredRowScrollResetDelayMs = 50

const noop = () => {}

const getVirtualWindowRange = (virtualItems, count) => {
  let startIndex
  let endIndex

  virtualItems.forEach(item => {
    if (item.index === 0) return
    const index = item.index - 1
    startIndex = startIndex === undefined ? index : Math.min(startIndex, index)
    endIndex = endIndex === undefined ? index + 1 : Math.max(endIndex, index + 1)
  })

  return normalizeWindowRange({ startIndex, endIndex }, count)
}

const DeferredRow = ({ children, controller, RowPlaceholder, index, placeholderSize }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => controller.schedule(() => setReady(true)), [controller])

  if (ready) return children
  return (
    <div aria-hidden style={{ height: `${placeholderSize}px`, overflow: "hidden", width: "100%" }}>
      {RowPlaceholder ? <RowPlaceholder index={index} /> : null}
    </div>
  )
}

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
    onIsScrollingChange = noop,
    deferRowMount = false,
    DeferredRowPlaceholder,
    enableColumnReordering,
    RowPlaceholder,
    RowWrapper,
    placeholdersLength,
    largeDataSource,
    windowStartIndex = 0,
    onWindowChange,
    overflowTooltip,
    ...rest
  }) => {
    useTableState(rerenderSelector)
    const ref = useRef()
    const publishedWindowRef = useRef()
    const pendingWindowRef = useRef()
    const rowMountController = useMemo(() => createRowMountController(), [])

    useEffect(() => () => rowMountController.dispose(), [rowMountController])

    const { rows } = table.getRowModel()

    const dataRowCount = largeDataSource?.getRowCount() ?? rows.length
    const rowHeight =
      (!!meta.styles?.height && parseInt(meta.styles.height)) ||
      (!!meta.cellStyles?.height && parseInt(meta.cellStyles.height)) ||
      35
    const estimateSize = useCallback(
      index => (index > 0 && largeDataSource?.getEstimatedRowHeight?.(index - 1)) || rowHeight,
      [largeDataSource, rowHeight]
    )
    const resolveItemKey = useCallback(
      index =>
        index === 0 ? "header" : (largeDataSource?.getRowId(index - 1) ?? getItemKey(index - 1)),
      [getItemKey, largeDataSource]
    )
    const measureElement = useCallback(
      (element, entry, instance) => measureTableElement(element, entry, instance),
      []
    )

    const rowVirtualizer = useVirtualizer({
      count: dataRowCount ? dataRowCount + 1 : 1,
      getScrollElement: () => ref.current,
      enableSmoothScroll: false,
      estimateSize,
      overscan: overscan || 15,
      onChange: onVirtualChange,
      initialOffset,
      getItemKey: resolveItemKey,
      measureElement,
      ...(deferRowMount ? { isScrollingResetDelay: deferredRowScrollResetDelayMs } : {}),
      rangeExtractor: useCallback(range => {
        if (range.count && range.startIndex >= 0) {
          const next = new Set([0, ...defaultRangeExtractor(range)])
          return [...next].sort((a, b) => a - b)
        }

        return defaultRangeExtractor(range)
      }, []),
    })

    if (virtualRef) virtualRef.current = rowVirtualizer

    useEffect(() => {
      rowMountController.setScrolling(rowVirtualizer.isScrolling)
      onIsScrollingChange(rowVirtualizer.isScrolling)
    }, [onIsScrollingChange, rowMountController, rowVirtualizer.isScrolling])

    const virtualRows = rowVirtualizer.getVirtualItems()
    const nextWindowRange = useMemo(
      () => (largeDataSource ? getVirtualWindowRange(virtualRows, dataRowCount) : null),
      [largeDataSource, virtualRows, dataRowCount]
    )

    useLayoutEffect(() => {
      if (!nextWindowRange) return

      if (deferRowMount && rowVirtualizer.isScrolling) {
        pendingWindowRef.current = nextWindowRange
        return
      }

      const windowRange = pendingWindowRef.current || nextWindowRange
      pendingWindowRef.current = undefined

      const publishedWindow = publishedWindowRef.current
      if (
        publishedWindow?.startIndex === windowRange.startIndex &&
        publishedWindow?.endIndex === windowRange.endIndex
      ) {
        return
      }

      publishedWindowRef.current = windowRange
      onWindowChange(windowRange)
    }, [
      deferRowMount,
      nextWindowRange?.startIndex,
      nextWindowRange?.endIndex,
      onWindowChange,
      rowVirtualizer.isScrolling,
    ])

    const firstVirtualDataIndex = virtualRows[1]?.index ?? 1
    const lastVirtualDataIndex = virtualRows[virtualRows.length - 1]?.index ?? 0

    const placeholders = useMemo(() => {
      if (!RowPlaceholder) return { before: [], after: [] }

      const firstDataIndex = 1
      const lastDataIndex = dataRowCount

      const beforeEnd = firstVirtualDataIndex
      const beforeStart =
        placeholdersLength != null
          ? Math.max(firstDataIndex, beforeEnd - placeholdersLength)
          : firstDataIndex

      const afterStart = lastVirtualDataIndex + 1
      const afterEnd =
        placeholdersLength != null
          ? Math.min(lastDataIndex + 1, afterStart + placeholdersLength)
          : lastDataIndex + 1

      return {
        before: Array.from({ length: beforeEnd - beforeStart }, (_, i) => beforeStart + i),
        after: Array.from({ length: afterEnd - afterStart }, (_, i) => afterStart + i),
      }
    }, [
      RowPlaceholder,
      firstVirtualDataIndex,
      lastVirtualDataIndex,
      dataRowCount,
      placeholdersLength,
    ])

    const getPlaceholderOffset = useCallback(
      index => {
        if (!largeDataSource) return rowVirtualizer.measurementsCache[index]?.start || 0
        return rowVirtualizer.getOffsetForIndex(index, "start")?.[0] || 0
      },
      [largeDataSource, rowVirtualizer]
    )

    useEffect(() => {
      if (!loadMore) return

      const lastItem = virtualRows[virtualRows.length - 1]

      if (!lastItem) return

      if (lastItem.index >= dataRowCount && getHasNextPage() && !loading) {
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
            const row =
              virtualRow.index === 0
                ? null
                : rows[virtualRow.index - 1 - (largeDataSource ? windowStartIndex : 0)]
            const logicalIndex = largeDataSource ? virtualRow.index - 1 : undefined
            const rowContent = row ? (
              <Row
                dataGa={dataGa}
                table={table}
                testPrefix={testPrefix}
                testPrefixCallback={testPrefixCallback}
                coloredSortedColumn={coloredSortedColumn}
                meta={meta}
                row={row}
                index={virtualRow.index}
                logicalIndex={logicalIndex}
                {...rest}
              />
            ) : null
            const wrappedRow =
              row && RowWrapper ? (
                <RowWrapper row={row} virtualIndex={virtualRow.index} logicalIndex={logicalIndex}>
                  {rowContent}
                </RowWrapper>
              ) : row ? (
                rowContent
              ) : RowPlaceholder ? (
                <RowPlaceholder index={virtualRow.index - 1} />
              ) : null

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
                ) : deferRowMount && row ? (
                  <DeferredRow
                    controller={rowMountController}
                    RowPlaceholder={DeferredRowPlaceholder || RowPlaceholder}
                    index={virtualRow.index - 1}
                    placeholderSize={virtualRow.size ?? estimateSize(virtualRow.index)}
                  >
                    {wrappedRow}
                  </DeferredRow>
                ) : (
                  wrappedRow
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
        {overflowTooltip ? <OverflowTooltip containerRef={ref} options={overflowTooltip} /> : null}
      </Flex>
    )
  }
)

export default Body
