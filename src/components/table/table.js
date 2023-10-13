import React, { memo, forwardRef, useCallback, useLayoutEffect, useMemo, useRef } from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import isEqual from "lodash/isEqual"
import identity from "lodash/identity"
import Flex from "@/components/templates/flex"
import Layer from "@/components/templates/layer"
import { Text } from "@/components/typography"
import { Icon } from "@/components/icon"
import { comparison, includesString, select } from "./helpers/filterFns"
import useColumns from "./useColumns"
import TableProvider, { useTableDispatch } from "./provider"
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

const Table = memo(
  forwardRef(
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

      const [columnPinning, onColumnPinningChange] = usePinning(
        defaultColumnPinning,
        pinningChangeCb
      )

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
      const prevStateRef = useRef(table.getState())
      table.isEqual = (selector = identity) => {
        if (!prevStateRef.current) {
          prevStateRef.current = table.getState()
          return false
        }

        const areStatesEqual = isEqual(selector(prevStateRef.current), selector(table.getState()))
        prevStateRef.current = table.getState()
        return areStatesEqual
      }

      const dispatch = useTableDispatch()
      useLayoutEffect(() => {
        dispatch({ ...table.getState(), rowsById: table.getRowModel().rowsById, table })
      }, [table.getState()])

      if (tableRef) tableRef.current = table

      const { getHasNextPage, loading, warning } = virtualizeOptions

      return (
        <Flex height={{ max: "100%" }} overflow="hidden" column ref={ref} className={className}>
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
          {!getHasNextPage?.() && !loading && !!warning && (
            <Flex alignItems="center" justifyContent="center" gap={2} padding={[4]} width="100%">
              <Icon name="warning_triangle_hollow" color="warning" />{" "}
              <Text color="warningText">{warning}</Text>
            </Flex>
          )}
          {loading && (
            <Layer
              backdrop={false}
              position="bottom"
              margin={[0, 0, 10]}
              padding={[0, 0, 10]}
              zIndex={20}
            >
              <Flex background={["neutral", "black"]} padding={[1, 2]} gap={2}>
                <Text strong>Loading more...</Text>
              </Flex>
            </Layer>
          )}
          {enablePagination && <Pagination table={table} />}
        </Flex>
      )
    }
  )
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

const withProvider = Component =>
  forwardRef((props, ref) => {
    return (
      <TableProvider>
        <Component {...props} ref={ref} />
      </TableProvider>
    )
  })

export default withProvider(Table)
