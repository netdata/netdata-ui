import React, { forwardRef, useCallback, useMemo } from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Flex from "src/components/templates/flex"
import Layer from "src/components/templates/layer"
import { Text } from "src/components/typography"
import { Icon } from "src/components/icon"
import { comparison, includesString, select } from "./helpers/filterFns"
import useColumns from "./useColumns"
import TableProvider from "./provider"
import Pagination from "./components/pagination"

import Header from "./header"
import HeaderActions from "./header/actions"

import Body from "./body"

import usePinning from "./usePinning"
import useVisibility from "./useVisibility"
import useExpanding from "./useExpanding"
import usePaginating from "./usePaginating"
import useSearching from "./useSearching"
import useSelecting from "./useSelecting"
import useSorting from "./useSorting"
import useGrouping from "./useGrouping"

const noop = () => {}
const emptyObj = {}

const filterFns = {
  comparison,
  select,
}

const Table = forwardRef(
  (
    {
      bulkActions,

      data,
      dataColumns,
      dataGa,
      enableColumnPinning,
      columnPinning: defaultColumnPinning,
      onColumnPinningChange: pinningChangeCb,

      enableColumnVisibility,
      columnVisibility: defaultColumnVisibility,
      onColumnVisibilityChange: visibilityChangeCb,

      enablePagination,
      enableResizing,
      enableSelection,
      enableSubRowSelection,
      rowSelection: defaultRowSelection,
      onRowSelectionChange: rowSelectionChangeCb,

      expanded: defaultExpanded,
      onExpandedChange: expandedChangeCb,

      enableSorting,
      sortBy,
      onSortingChange: sortingChangeCb,

      globalFilter: defaultGlobalFilter,
      onSearch,
      globalFilterFn = includesString,
      enableCustomSearch,

      grouping: defaultGrouping,
      onGroupByChange: groupingChangeCb,
      groupByColumns,

      onHoverCell,
      onRowSelected,

      paginationOptions,
      onPaginationChange: paginationChangeCb,

      rowActions,
      testPrefix,
      meta: tableMeta,
      title,
      virtualizeOptions,
      tableRef,
      className,
      ...rest
    },
    ref
  ) => {
    const [columnVisibility, onColumnVisibilityChange] = useVisibility(
      defaultColumnVisibility,
      visibilityChangeCb
    )

    const [columnPinning, onColumnPinningChange] = usePinning(defaultColumnPinning, pinningChangeCb)

    const [expanded, onExpandedChange] = useExpanding(defaultExpanded, expandedChangeCb)

    const [rowSelection, onRowSelectionChange] = useSelecting(
      defaultRowSelection,
      rowSelectionChangeCb
    )

    const [sorting, onSortingChange] = useSorting(sortBy, sortingChangeCb)

    const [pagination, onPaginationChange] = usePaginating(paginationOptions, paginationChangeCb)

    const [grouping, onGroupingChange] = useGrouping(defaultGrouping, groupingChangeCb)

    const [globalFilter, onGlobalFilterChange] = useSearching(defaultGlobalFilter, onSearch)

    const columns = useColumns(dataColumns, {
      testPrefix,
      enableSelection,
      enableResizing,
      enableSorting,
      rowActions,
      tableMeta,
    })

    const table = useReactTable({
      columns,
      data,
      manualPagination: !enablePagination,
      columnResizeMode: "onEnd",
      filterFns,
      state: {
        columnVisibility,
        rowSelection,
        globalFilter: enableCustomSearch ? "" : globalFilter,
        sorting,
        pagination,
        columnPinning,
        expanded,
        grouping: useMemo(
          () =>
            Array.isArray(grouping)
              ? [grouping].filter(Boolean)
              : groupByColumns?.[grouping]?.columns || [],
          [grouping]
        ),
        columnOrder: [],
      },
      onExpandedChange,
      ...(!enableCustomSearch && globalFilterFn ? { globalFilterFn } : {}),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange,
      onGlobalFilterChange: enableCustomSearch ? undefined : onGlobalFilterChange,
      onSortingChange,
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getSubRows: useCallback(row => row.children, []),
      onPaginationChange,
      onColumnVisibilityChange,
      onColumnPinningChange,
      enableSubRowSelection,
      columnGroupingMode: "reorder",
    })

    if (tableRef) tableRef.current = table

    const { hasNextPage, loading, warning } = virtualizeOptions

    return (
      <TableProvider onHoverCell={onHoverCell}>
        <Flex
          height={{ max: "100%" }}
          overflow="hidden"
          column
          ref={ref}
          className={className}
          gap={1}
        >
          <Header
            q={globalFilter}
            hasSearch={!!onSearch}
            onSearch={onGlobalFilterChange}
            groupByColumns={groupByColumns}
            onGroupBy={onGroupingChange}
            grouping={grouping}
            tableMeta={tableMeta}
            title={title}
            dataColumns={dataColumns}
          >
            {(enableColumnVisibility || !!bulkActions) && (
              <HeaderActions
                rowSelection={rowSelection}
                bulkActions={bulkActions}
                columnPinning={columnPinning}
                dataGa={dataGa}
                enableColumnVisibility={enableColumnVisibility}
                enableColumnPinning={enableColumnPinning}
                table={table}
                testPrefix={testPrefix}
                onRowSelected={onRowSelected}
              />
            )}
          </Header>
          <Body
            table={table}
            dataGa={dataGa}
            testPrefix={testPrefix}
            meta={tableMeta}
            {...rest}
            {...virtualizeOptions}
          />
          {!hasNextPage && !loading && !!warning && (
            <Flex alignItems="center" justifyContent="center" gap={2} padding={[4]} width="100%">
              <Icon name="warning_triangle_hollow" color="warning" />{" "}
              <Text color="warningText">{warning}</Text>
            </Flex>
          )}
          {hasNextPage && loading && (
            <Layer backdrop={false} position="bottom" margin={[0, 0, 10]} padding={[0, 0, 10]}>
              <Flex background={["neutral", "black"]} padding={[1, 2]} gap={2}>
                <Text>Loading more...</Text>
              </Flex>
            </Layer>
          )}
          {enablePagination && <Pagination table={table} />}
        </Flex>
      </TableProvider>
    )
  }
)

Table.defaultProps = {
  coloredSortedColumn: true,
  enableColumnPinning: false,
  enableColumnVisibility: false,
  enableResizing: false,
  onColumnVisibilityChange: noop,
  onSortingChange: noop,
  onExpandedChange: noop,
  paginationOptions: {
    pageIndex: 0,
    pageSize: 100,
  },
  expanded: emptyObj,
  rowSelection: emptyObj,
  rowActions: emptyObj,
  meta: emptyObj,
  globalFilter: "",
  testPrefix: "",
  virtualizeOptions: {},
}

export default Table
