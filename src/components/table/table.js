import React, { useCallback, useEffect, useMemo } from "react"
import { useTable } from "react-table"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"
import { Icon } from "src/components/icon"
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
  'data-testid': dataTestId,
  sortableBy = [],
  selectedItemsClb,
  toggleSelectedItemClb,
  itemIsDisabled = defaultItemIsDisabled,
  autoResetSelectedRows = false,
  autoResetSortBy = false,
  autoResetGroupBy = false,
  autoResetFilters = false,
  autoResetExpanded = false,
  withPagination = false,
  controlledState = {},
  renderGroupHead,
  initialState = {},
  className,
  paginationContainerStyles = {},
  callbackRef,
  groupByFn = defaultGroupByFn,
  disableGlobalFilter = false,
  globalFilter,
  filterTypes,
  dataResultsCallback,
  renderRowSubComponent,
  onRowClick,
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
    state: { selectedRowIds, groupBy, pageIndex },
    toggleAllRowsExpanded,
    isAllRowsExpanded,
    visibleColumns,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageCount,
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
    if (isAllRowsExpanded || renderRowSubComponent) {
      return
    }
    // todo check if this is really necessary?
    toggleAllRowsExpanded()
  }, [isAllRowsExpanded, toggleAllRowsExpanded])

  const orderedRows = useMemo(() => {
    if (groupBy.length > 0 && groupsOrderSettings && groupsOrderSettings.groupsOrder[groupBy[0]]) {
      return sortGroupsByPriority(rows, groupsOrderSettings)
    }
    return rows
  }, [groupBy, groupsOrderSettings, rows])

  const tableRows = useMemo(() => (withPagination ? page : orderedRows), [
    withPagination,
    page,
    orderedRows,
  ])

  const showPagination = withPagination && pageCount > 1
  const goToPreviousPage = useCallback(() => previousPage(), [previousPage])
  const goToNextPage = useCallback(() => nextPage(), [nextPage])

  useEffect(() => {
    if (dataResultsCallback) {
      const renderedData = unwrapGroupedRows(orderedRows).filter(
        ({ isVirtualGroupHeader }) => !isVirtualGroupHeader
      )
      dataResultsCallback(renderedData)
    }
  }, [orderedRows, dataResultsCallback])

  const TableComponent = () => (
    <LayoutContextProvider value={layoutType}>
      <TableContainer
        data-testid={dataTestId}
        layoutType={layoutType}
        {...getTableProps()}
        className={className}
        callbackRef={callbackRef}
        hasStickyHeader={customProps.hasStickyHeader}
        stickyTop={customProps.stickyTop}
      >
        <TableHead headerGroups={headerGroups} sortableBy={sortableBy} customProps={customProps} />
        <TableBody layoutType={layoutType} {...getTableBodyProps()}>
          {tableRows.map(row => {
            prepareRow(row)

            return (
              <React.Fragment key={row.id}>
                <TableRow
                  canToggleExpand={!!renderRowSubComponent}
                  customProps={customProps}
                  row={row}
                  prepareRow={prepareRow}
                  onRowClick={onRowClick}
                  selectedRowIds={selectedRowIds}
                  renderGroupHead={renderGroupHead}
                />
                {row.isExpanded && renderRowSubComponent ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>{renderRowSubComponent({ row })}</td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
        </TableBody>
      </TableContainer>
    </LayoutContextProvider>
  )

  if (!showPagination) return <TableComponent />

  return (
    <Flex
      column
      justifyContent="between"
      alignItems="center"
      gap={1}
      {...paginationContainerStyles}
    >
      <TableComponent />
      <Flex justifyContent="between" alignItems="center" gap={6} data-testid="table-pagination">
        <Icon
          name="chevron_left"
          color="text"
          cursor="pointer"
          disabled={!canPreviousPage}
          onClick={goToPreviousPage}
        />
        <Text color="textDescription">{pageIndex + 1}</Text>
        <Icon
          name="chevron_left"
          color="text"
          cursor="pointer"
          disabled={!canNextPage}
          onClick={goToNextPage}
          rotate={2}
        />
      </Flex>
    </Flex>
  )
}
