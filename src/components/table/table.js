import React, { useEffect, useMemo } from "react"
import { useTable } from "react-table"
import { TableBody, TableContainer } from "./components/table-container"
import { TableRow } from "./components/table-row"
import { TableHead } from "./components/table-head"
import { LayoutContextProvider } from "./layout-context"
import { defaultGroupByFn, getValidRows, sortGroupsByPriority, unwrapGroupedRows } from "./utils"
import { blockTableHooks, tableHooks } from "./table-hooks"

const defaultItemIsDisabled = () => false

export function Table({
  groupsOrderSettings,
  layoutType = "table",
  columns,
  data,
  sortableBy = [],
  selectedItemsClb,
  toggleSelectedItemClb,
  itemIsDisabled = defaultItemIsDisabled,
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
}) {
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
    if (isAllRowsExpanded) {
      return
    }
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
        hasStickyHeader={customProps.hasStickyHeader}
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
