import React, { useEffect, useMemo, ReactNode } from "react"
import { useTable, Row } from "react-table"
import { TableContainer, TableBody } from "./components/table-container"
import { TableRow } from "./components/table-row"
import { TableHead } from "./components/table-head"
import { LayoutContextProvider } from "./layout-context"
import {
  defaultGroupByFn,
  GroupsOrderSettings,
  sortGroupsByPriority,
  unwrapGroupedRows,
  getValidRows,
} from "./utils"
import { tableHooks, blockTableHooks } from "./table-hooks"

// Docs aren't clear about that, but the actual difference is,
// that "id" is string for individual column filtering,
// and array of column IDs for global filtering (our case)
type FilterFunction<T> = (rows: T[], id: string | string[], filterValue: any) => T[]

type ColumnSort = { id: string; desc: Boolean }

interface TableInstanceState {
  sortBy?: ColumnSort[]
  hiddenColumns?: string[]
  groupBy?: string[]
  columnOrder?: string[]
  globalFilter?: any
}

export interface TableProps<T, RT = any> {
  groupsOrderSettings?: GroupsOrderSettings
  layoutType?: "table" | "block"
  selectedItemsClb?: (items: T[]) => T[] | void
  toggleSelectedItemClb?: (item: T, selected: boolean) => T | void
  itemIsDisabled?: (item: T) => boolean
  columns: RT
  data: T[]
  sortableBy?: string[]
  className?: string
  autoResetSelectedRows?: boolean
  autoResetSortBy?: boolean
  autoResetGroupBy?: boolean
  autoResetFilters?: boolean
  autoResetExpanded?: boolean
  // initializer for table instance state, according to react-table signature
  initialState?: TableInstanceState
  controlledState?: TableInstanceState
  renderGroupHead?: (props: {
    row: any
    layoutType: "block" | "table"
    prepareRow: Function
    selectedRowIds: any
    customProps?: Object
  }) => ReactNode
  callbackRef?: (node: any) => void
  groupByFn?: Function
  disableGlobalFilter?: boolean
  globalFilter?: string | FilterFunction<T> // string can refer to one of filterTypes
  // https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js
  filterTypes?: { [filterID: string]: FilterFunction<T> }
  dataResultsCallback?: (rows: T[]) => void
}

export type Item = {
  [key: string]: any
}

export function Table<T extends Item>({
  groupsOrderSettings,
  layoutType = "table",
  columns,
  data,
  sortableBy = [],
  selectedItemsClb,
  toggleSelectedItemClb,
  itemIsDisabled = () => false,
  autoResetSelectedRows = false,
  autoResetSortBy = false,
  autoResetGroupBy = false,
  autoResetFilters = false,
  autoResetExpanded = false,
  controlledState = {},
  renderGroupHead,
  initialState = {},
  className,
  callbackRef,
  groupByFn = defaultGroupByFn,
  disableGlobalFilter = false,
  globalFilter,
  filterTypes,
  dataResultsCallback,
  ...customProps
}: TableProps<T>) {
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
    isAllRowsSelected,
    state: { selectedRowIds, groupBy },
    toggleAllRowsExpanded,
    isAllRowsExpanded,
  } = useTable(
    {
      columns,
      data,
      initialState,
      autoResetSelectedRows,
      autoResetSortBy,
      autoResetGroupBy,
      autoResetFilters,
      autoResetExpanded,
      disableGlobalFilter,
      globalFilter,
      filterTypes,
      groupByFn,
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
      toggleSelectedItemClb,
      itemIsDisabled,
    },
    ...reactTableHooks
  )

  useEffect(() => {
    if ((selectedFlatRows.length === 0 || isAllRowsSelected) && selectedItemsClb) {
      const isGrouped = groupBy.length > 0
      const validRows = getValidRows({ selectedFlatRows, isGrouped, itemIsDisabled })
      selectedItemsClb(validRows)
    }
  }, [selectedFlatRows, isAllRowsSelected, selectedItemsClb, groupBy, itemIsDisabled])

  useEffect(() => {
    if (isAllRowsExpanded) return
    toggleAllRowsExpanded()
  }, [isAllRowsExpanded, toggleAllRowsExpanded])

  const orderedRows = useMemo(() => {
    if (groupBy.length > 0 && groupsOrderSettings && groupsOrderSettings.groupsOrder[groupBy[0]]) {
      return sortGroupsByPriority(rows, groupsOrderSettings)
    }
    return rows
  }, [groupBy, groupsOrderSettings, rows])

  useEffect(() => {
    if (dataResultsCallback) {
      const renderedData = unwrapGroupedRows(orderedRows).filter(
        ({ isVirtualGroupHeader }) => !isVirtualGroupHeader
      )
      dataResultsCallback(renderedData)
    }
  }, [orderedRows, dataResultsCallback])

  return (
    <LayoutContextProvider value={layoutType}>
      <TableContainer
        layoutType={layoutType}
        {...getTableProps()}
        className={className}
        callbackRef={callbackRef}
      >
        <TableHead headerGroups={headerGroups} sortableBy={sortableBy} customProps={customProps} />
        <TableBody layoutType={layoutType} {...getTableBodyProps()}>
          {orderedRows.map(row => {
            prepareRow(row)

            return (
              <TableRow
                key={row.id}
                customProps={customProps}
                row={row}
                prepareRow={prepareRow}
                selectedRowIds={selectedRowIds}
                renderGroupHead={renderGroupHead}
              />
            )
          })}
        </TableBody>
      </TableContainer>
    </LayoutContextProvider>
  )
}
