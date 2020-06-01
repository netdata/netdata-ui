import React, { useEffect, useMemo, useCallback } from "react"
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

interface VTableProps<T, RT = any> extends TableProps<T, RT> {
  virtualizedSettings: {
    width: number
    height: number
    itemSize: number | GetItemSize
    variableSize?: boolean
    overscanCount?: number
    verticalGutter?: number
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
  },
  callbackRef,
  ...customProps
}: VTableProps<T>) {
  // preserve column order to override default grouping behaviour
  const columnOrder = useMemo(() => controlledState.columnOrder || columns.map(({ id }) => id), [
    columns,
    controlledState.columnOrder,
  ])

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

  // TODO - this is hard-memoized to bailout from remounts of all produced rows,
  // if the callback function is re-created. However, some cases of this happening
  // could be valid/required, let's observe how it develops
  const renderVirtualizedRow = useCallback(
    ({ index, style }) => {
      const row = orderedRows[index]
      prepareRow(row)
      return (
        <TableRow
          key={row.id}
          style={generateRowStyle({ index, style, verticalGutter, rows: orderedRows })}
          customProps={customProps}
          row={row}
          prepareRow={prepareRow}
          selectedRowIds={selectedRowIds}
          renderGroupHead={renderGroupHead}
        />
      )
    },
    // eslint-disable-next-line
    []
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
      >
        {renderVirtualizedRow}
      </StickyVirtualList>
    </LayoutContextProvider>
  )
}
