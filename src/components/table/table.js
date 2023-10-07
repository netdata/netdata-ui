import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
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
import useColumns from "./features/useColumns"
import useBulkActions from "./features/useBulkActions"
import ColumnPinning from "./features/columnPinning"
import GlobalControls from "./features/globalControls"
import TableProvider from "./features/provider"
import Pagination from "./components/pagination"
import FullTable from "./core/fullTable"

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
      columnPinning: defaultColumnPinning,
      columnVisibility: defaultColumnVisibility,
      expanded: defaultExpanded,
      rowSelection: defaultRowSelection,
      data,
      dataColumns,
      dataGa,
      enableColumnPinning,
      enableColumnVisibility,
      enablePagination,
      enableResize,
      enableSelection,
      enableSubRowSelection,
      enableSorting,
      globalFilter: initialGlobalFilter,
      globalFilterFn = includesString,
      grouping: initialGrouping = "",
      groupByColumns,
      onClickRow,
      onColumnVisibilityChange,
      onGlobalSearchChange,
      onGroupByChange,
      onHoverCell,
      onRowSelected,
      onSortingChange,
      onExpandedChange,
      paginationOptions,
      rowActions,
      sortBy,
      testPrefix,
      meta: tableMeta,
      title,
      virtualizeOptions,
      tableRef,
      ...rest
    },
    ref
  ) => {
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility)

    useEffect(() => {
      if (columnVisibility === defaultColumnVisibility) return

      setColumnVisibility(defaultColumnVisibility)
    }, [defaultColumnVisibility])

    const [columnPinning, setColumnPinning] = useState(() => defaultColumnPinning || {})

    useEffect(() => {
      if (!defaultColumnPinning || columnVisibility === defaultColumnPinning) return

      setColumnPinning(defaultColumnPinning)
    }, [defaultColumnPinning])

    const [rowSelection, setRowSelection] = useState(defaultRowSelection)

    useEffect(() => {
      if (rowSelection === defaultRowSelection) return

      setRowSelection(defaultRowSelection)
    }, [defaultRowSelection])

    const [sorting, setSorting] = useState(() => sortBy || [])

    useEffect(() => {
      if (!sortBy || sorting === sortBy) return

      setSorting(sortBy)
    }, [sortBy])

    const onShorting = useCallback(
      getSorting => {
        onSortingChange(getSorting)
        setSorting(getSorting)
      },
      [onSortingChange]
    )

    const [pagination, setPagination] = useState(() => ({
      pageIndex: paginationOptions.pageIndex,
      pageSize: paginationOptions.pageSize,
    }))

    const handleColumnVisibilityChange = useCallback(getVisibility => {
      onColumnVisibilityChange(getVisibility)
      setColumnVisibility(getVisibility)
    }, [])

    const [globalFilter, setGlobalFilter] = useState(initialGlobalFilter)
    const [grouping, setGrouping] = useState(initialGrouping)

    const groupByOptions = useMemo(
      () =>
        groupByColumns
          ? {
              default: { label: "None", value: "" },
              ...Object.keys(groupByColumns).reduce((acc, colId) => {
                const column = dataColumns.find(({ id }) => id === colId)

                return {
                  ...acc,
                  [colId]: { label: column?.name || column.id, value: colId },
                }
              }, {}),
            }
          : null,
      [groupByColumns]
    )

    useEffect(() => {
      if (!initialGlobalFilter || globalFilter === initialGlobalFilter) return

      setGlobalFilter(initialGlobalFilter)
    }, [sortBy])

    const onGlobalFilterChange = useCallback(value => {
      onGlobalSearchChange?.(value)
      setGlobalFilter(String(value))
    }, [])

    const onGlobalGroupByChange = useCallback(
      value => {
        onGroupByChange?.(value)
        setGrouping(value)
      },
      [onGroupByChange]
    )

    const columns = useColumns(dataColumns, { testPrefix, enableSelection, rowActions, tableMeta })

    const [expanded, setExpanded] = useState(defaultExpanded)

    const onExpand = useCallback(getExpanding => {
      onExpandedChange(getExpanding)
      setExpanded(getExpanding)
    }, [])

    const table = useReactTable({
      columns,
      data,
      manualPagination: !enablePagination,
      columnResizeMode: enableResize ? "onEnd" : "",
      filterFns,
      state: {
        columnVisibility,
        rowSelection,
        globalFilter,
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
      onExpandedChange: onExpand,
      ...(globalFilterFn ? { globalFilterFn } : {}),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      onGlobalFilterChange,
      onSortingChange: onShorting,
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getSubRows: row => row.children,
      onPaginationChange: setPagination,
      onColumnVisibilityChange: handleColumnVisibilityChange,
      onColumnPinningChange: setColumnPinning,
      enableSubRowSelection,
      columnGroupingMode: "reorder",
    })

    if (tableRef) tableRef.current = table

    const [selectedRows, setActualSelectedRows] = useState([])

    useEffect(() => {
      const { flatRows } = table.getSelectedRowModel()
      if (flatRows) {
        const selectedRows = flatRows.reduce((acc, { original }) => {
          if (original?.disabled) return acc

          acc.push(original)
          return acc
        }, [])
        setActualSelectedRows(selectedRows)
        onRowSelected?.(selectedRows)
      }
    }, [rowSelection, table])

    const hasBulkActions = enableColumnPinning || enableColumnVisibility || !!bulkActions
    const scrollParentRef = useRef()

    const actions = useBulkActions({
      bulkActions,
      columnPinning,
      dataGa,
      enableColumnVisibility,
      enableColumnPinning,
      selectedRows,
      table,
      testPrefix,
    })

    const columnPinningProps = useCallback(
      side => ({
        side,
        enableResize,
        onClickRow,
        enableSorting,
        table,
        headers: side === "left" ? table.getLeftHeaderGroups() : table.getRightHeaderGroups(),
        testPrefix,
        dataGa,
        scrollParentRef,
        virtualizeOptions,
        meta: tableMeta,
      }),
      [
        enableResize,
        onClickRow,
        enableSorting,
        table,
        testPrefix,
        dataGa,
        scrollParentRef,
        virtualizeOptions,
        tableMeta,
      ]
    )

    const { hasNextPage, loading, warning } = virtualizeOptions || {}

    return (
      <TableProvider onHoverCell={onHoverCell}>
        <Flex height={{ max: "100%" }} overflow="hidden" column ref={ref}>
          {onGlobalSearchChange || hasBulkActions ? (
            <GlobalControls
              bulkActions={hasBulkActions ? actions : null}
              dataGa={dataGa}
              groupByOptions={groupByOptions}
              groupValue={grouping}
              onGroupBy={onGlobalGroupByChange}
              onSearch={onGlobalSearchChange ? onGlobalFilterChange : null}
              searchValue={globalFilter}
              tableMeta={tableMeta}
              title={title}
            />
          ) : null}
          <Flex row ref={scrollParentRef} overflow="auto" flex>
            {enableColumnPinning && columnPinning.left && (
              <ColumnPinning {...columnPinningProps("left")} meta={tableMeta} {...rest} />
            )}
            <FullTable
              headers={columnPinning ? table.getCenterHeaderGroups() : table.getHeaderGroups()}
              getRowHandler={enableColumnPinning ? "getCenterVisibleCells" : "getVisibleCells"}
              scrollParentRef={scrollParentRef}
              enableResize={enableResize}
              onClickRow={onClickRow}
              enableSorting={enableSorting}
              enableColumnPinning={enableColumnPinning}
              table={table}
              dataGa={dataGa}
              testPrefix={testPrefix}
              virtualizeOptions={virtualizeOptions}
              meta={tableMeta}
              side="center"
              {...rest}
            />
            {enableColumnPinning && columnPinning.right && (
              <ColumnPinning {...columnPinningProps("right")} meta={tableMeta} {...rest} />
            )}
          </Flex>
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
  enableResize: false,
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
}

export default Table
