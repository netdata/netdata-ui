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
import { throttle } from "throttle-debounce"
import Header from "./header"
import HeaderActions from "./header/actions"
import Body from "./body"
import usePinning from "./usePinning"
import useVisibility from "./useVisibility"
import useSizing from "./useSizing"
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

const tableDefaultProps = {
  coloredSortedColumn: true,
  enableColumnPinning: false,
  enableColumnVisibility: false,
  enableResizing: false,
  globalFilterFn: includesString,
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

const Table = memo(
  forwardRef((props, ref) => {
    const {
      bulkActions,
      headerChildren,

      data,
      dataColumns,
      dataGa,
      enableColumnPinning = tableDefaultProps.enableColumnPinning,
      columnPinning: defaultColumnPinning,
      onColumnPinningChange: pinningChangeCb,

      enableColumnVisibility = tableDefaultProps.enableColumnVisibility,
      columnVisibility: defaultColumnVisibility,
      onColumnVisibilityChange: visibilityChangeCb = tableDefaultProps.onColumnVisibilityChange,

      enableColumnSizing,
      columnSizing: defaultColumnSizing,
      onColumnSizingChange: sizingChangeCb,

      enablePagination,
      enableResizing = tableDefaultProps.enableResizing,
      enableSelection,
      enableSubRowSelection,
      rowSelection: defaultRowSelection = tableDefaultProps.rowSelection,
      onRowSelectionChange: rowSelectionChangeCb,

      expanded: defaultExpanded = tableDefaultProps.expanded,
      onExpandedChange: expandedChangeCb = tableDefaultProps.onExpandedChange,

      enableSorting,
      sortBy,
      onSortingChange: sortingChangeCb = tableDefaultProps.onSortingChange,

      globalFilter: defaultGlobalFilter = tableDefaultProps.globalFilter,
      onSearch,
      globalFilterFn = tableDefaultProps.globalFilterFn,
      enableCustomSearch,

      grouping: defaultGrouping,
      onGroupByChange: groupingChangeCb,
      groupByColumns,

      onRowSelected,

      paginationOptions = tableDefaultProps.paginationOptions,
      onPaginationChange: paginationChangeCb,

      rowActions = tableDefaultProps.rowActions,
      testPrefix = tableDefaultProps.testPrefix,
      meta: tableMeta = tableDefaultProps.meta,
      title,
      virtualizeOptions = tableDefaultProps.virtualizeOptions,
      tableRef,
      className,
      width,
      getRowCanExpand,
      ...rest
    } = { ...tableDefaultProps, ...props }

    const [columnVisibility, onColumnVisibilityChange] = useVisibility(
      defaultColumnVisibility,
      visibilityChangeCb
    )

    const [columnSizing, onColumnSizingChange] = useSizing(defaultColumnSizing, sizingChangeCb)

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
        columnSizing,
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
      enableMultiSorting: true,
      isMultiSortEvent: e => e.ctrlKey || e.shiftKey || e.metaKey,
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getRowCanExpand,
      getGroupedRowModel: getGroupedRowModel(),
      getSubRows: useCallback(row => row.children, []),
      onPaginationChange,
      onColumnVisibilityChange,
      onColumnSizingChange,
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

    const dispatchThrottled = useCallback(throttle(10, dispatch), [])

    useLayoutEffect(() => {
      dispatchThrottled({
        ...table.getState(),
        rowsById: table.getRowModel().rowsById,
        table,
        selectedRows: table.getSelectedRowModel().flatRows,
      })
    }, [table.getState()])

    if (tableRef) tableRef.current = table

    const { getHasNextPage, loading, warning } = virtualizeOptions

    return (
      <Flex
        height={{ max: "100%" }}
        overflow="hidden"
        column
        flex="1"
        ref={ref}
        className={className}
        width={width}
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
          enableColumnVisibility={enableColumnVisibility}
          bulkActions={bulkActions}
          enableCustomSearch={enableCustomSearch}
        >
          {headerChildren || null}
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
            <Flex background="tooltip" padding={[1, 2]} gap={2}>
              <Text strong>Loading more...</Text>
            </Flex>
          </Layer>
        )}
        {enablePagination && <Pagination table={table} />}
      </Flex>
    )
  })
)

const withProvider = Component =>
  forwardRef((props, ref) => {
    return (
      <TableProvider>
        <Component {...props} ref={ref} />
      </TableProvider>
    )
  })

export default withProvider(Table)
