import React, { useEffect, useMemo, useCallback, useState } from "react"
import { useDebounce } from "react-use"
import { useTable, Row } from "react-table"
import { TableRow } from "./components/table-row"
import { StickyVirtualList } from "./components/sticky-virtual-list"
import { LayoutContextProvider } from "./layout-context"
import {
  defaultGroupByFn,
  sortGroupsByPriority,
  unwrapGroupedRows,
  generateRowStyle,
} from "./utils"
import { TableProps } from "./table"
import { tableHooks, blockTableHooks } from "./table-hooks"

type GetItemSize = (index: number, orderedRows: any) => number

const itemKeyFallback = (index: number) => String(index)

interface VTableProps<T, RT = any> extends TableProps<T, RT> {
  virtualizedSettings: {
    width: number
    height: number
    itemSize: number | GetItemSize
    variableSize?: boolean
    overscanCount?: number
    verticalGutter?: number
    itemKey?: (index: number, data: any) => string
    rendererHash?: string
    innerRef?: any
    outerRef?: any
    onItemsRendered?: (renderData: {
      overscanStartIndex: number
      overscanStopIndex: number
      visibleStartIndex: number
      visibleStopIndex: number
    }) => void
    onScroll?: (scrollData: {
      scrollDirection: "forward" | "backward"
      scrollOffset: number
      scrollUpdateWasRequested: boolean
    }) => void
    useIsScrolling?: boolean
    renderCallback?: (orderedRows: any[], overscanValues: { start: number; end: number }) => void
    renderCallbackWaitTime?: number
  }
}

export function VirtualizedTable<T extends object>({
  groupsOrderSettings,
  layoutType = "table",
  columns,
  data,
  sortableBy = [],
  selectedItemsClb,
  autoResetSelectedRows = false,
  autoResetSortBy = false,
  autoResetGroupBy = false,
  autoResetFilters = false,
  controlledState = {},
  renderGroupHead,
  initialState = {},
  className,
  groupByFn = defaultGroupByFn,
  disableGlobalFilter = false,
  globalFilter,
  filterTypes,
  virtualizedSettings: {
    width,
    height,
    variableSize = false,
    overscanCount,
    itemSize,
    verticalGutter = 0,
    itemKey = itemKeyFallback,
    rendererHash,
    innerRef,
    outerRef,
    onItemsRendered,
    onScroll,
    useIsScrolling,
    renderCallback,
    renderCallbackWaitTime = 600,
  },
  callbackRef,
  ...customProps
}: VTableProps<T>) {
  const [overscanValues, setOverscanValues] = useState({ start: 0, end: 0 })
  // preserve column order to override default grouping behaviour
  const columnOrder = useMemo(() => controlledState.columnOrder || columns.map(({ id }) => id), [
    columns,
    controlledState.columnOrder,
  ])

  const protectedRendererHash = useMemo(() => rendererHash || "stableFallback", [rendererHash])

  const reactTableHooks = layoutType === "block" ? blockTableHooks : tableHooks

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds, groupBy },
  } = useTable(
    {
      columns,
      data,
      initialState,
      autoResetSelectedRows,
      autoResetSortBy,
      autoResetGroupBy,
      autoResetFilters,
      disableGlobalFilter,
      globalFilter,
      filterTypes,
      useControlledState: state => {
        return React.useMemo(
          () => ({
            ...state,
            ...controlledState,
            columnOrder,
          }),
          // eslint-disable-next-line
          [state, controlledState]
        )
      },
      groupByFn,
    },
    ...reactTableHooks
  )

  useEffect(() => {
    if (selectedItemsClb) {
      selectedItemsClb(selectedFlatRows.map((r: Row<T>) => r.original))
    }
  }, [selectedFlatRows, selectedItemsClb])

  const orderedRows = useMemo(() => {
    if (groupBy.length > 0 && groupsOrderSettings && groupsOrderSettings.groupsOrder[groupBy[0]]) {
      const result = unwrapGroupedRows(sortGroupsByPriority(rows, groupsOrderSettings))
      return result
    }
    return rows
  }, [groupBy, groupsOrderSettings, rows])

  const getItemSize = useCallback(
    (index: number) => {
      if (typeof itemSize === "number") {
        return itemSize
      }
      return itemSize(index, orderedRows)
    },
    [itemSize, orderedRows]
  )

  // TODO
  // is rendererHash a better tradeoff?
  // Callback could potentially be a React component
  const renderVirtualizedRow = useCallback(
    ({ index, style, data }) => {
      const row = data.orderedRows[index]
      prepareRow(row)
      return (
        <TableRow
          key={row.id}
          style={generateRowStyle({ index, style, verticalGutter, rows: data.orderedRows })}
          customProps={customProps}
          row={row}
          prepareRow={prepareRow}
          selectedRowIds={selectedRowIds}
          renderGroupHead={renderGroupHead}
        />
      )
    },
    // eslint-disable-next-line
    [controlledState, renderGroupHead, verticalGutter, protectedRendererHash]
  )

  const itemsRenderHandler = useCallback(
    (renderData: {
      overscanStartIndex: number
      overscanStopIndex: number
      visibleStartIndex: number
      visibleStopIndex: number
    }) => {
      const { overscanStartIndex, overscanStopIndex } = renderData
      setOverscanValues({ start: overscanStartIndex, end: overscanStopIndex })
      if (onItemsRendered) {
        onItemsRendered(renderData)
      }
    },
    [onItemsRendered]
  )

  useDebounce(
    () => {
      if (renderCallback) {
        renderCallback(orderedRows, overscanValues)
      }
    },
    renderCallbackWaitTime,
    [overscanValues]
  )

  return (
    <LayoutContextProvider value={layoutType}>
      <StickyVirtualList
        height={height}
        itemCount={orderedRows.length}
        itemSize={getItemSize}
        width={width}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        sortableBy={sortableBy}
        className={className}
        customProps={customProps}
        layoutType={layoutType}
        variableSize={variableSize}
        overscanCount={overscanCount}
        callbackRef={callbackRef}
        itemKey={itemKey}
        orderedRows={orderedRows}
        innerRef={innerRef}
        outerRef={outerRef}
        onItemsRendered={itemsRenderHandler}
        onScroll={onScroll}
        useIsScrolling={useIsScrolling}
      >
        {renderVirtualizedRow}
      </StickyVirtualList>
    </LayoutContextProvider>
  )
}
