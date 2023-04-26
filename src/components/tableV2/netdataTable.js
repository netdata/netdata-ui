import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"
import { Icon, IconComponents } from "src/components/icon"
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

const NetdataTable = forwardRef(
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
      onClickRow,
      onColumnVisibilityChange,
      onGlobalSearchChange,
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

    const onShorting = useCallback(getSorting => {
      onSortingChange(getSorting)
      setSorting(getSorting)
    }, [])

    const [pagination, setPagination] = useState(() => ({
      pageIndex: paginationOptions.pageIndex,
      pageSize: paginationOptions.pageSize,
    }))

    const handleColumnVisibilityChange = useCallback(getVisibility => {
      onColumnVisibilityChange(getVisibility)
      setColumnVisibility(getVisibility)
    }, [])

    const [globalFilter, setGlobalFilter] = useState(initialGlobalFilter)

    useEffect(() => {
      if (!initialGlobalFilter || globalFilter === initialGlobalFilter) return

      setGlobalFilter(initialGlobalFilter)
    }, [sortBy])

    const onGlobalFilterChange = useCallback(value => {
      onGlobalSearchChange?.(value)
      setGlobalFilter(String(value))
    }, [])

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
      getSubRows: row => row.children,
      onPaginationChange: setPagination,
      onColumnVisibilityChange: handleColumnVisibilityChange,
      onColumnPinningChange: setColumnPinning,
      enableSubRowSelection,
    })

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

    const { hasNextPage, loading, warning } = virtualizeOptions || {}

    return (
      <TableProvider onHoverCell={onHoverCell}>
        <Flex height="100%" overflow="hidden" column ref={ref}>
          {onGlobalSearchChange || hasBulkActions ? (
            <GlobalControls
              title={title}
              bulkActions={hasBulkActions ? actions : null}
              dataGa={dataGa}
              handleSearch={onGlobalSearchChange ? onGlobalFilterChange : null}
              searchValue={globalFilter}
              tableMeta={tableMeta}
            />
          ) : null}
          <Flex row ref={scrollParentRef} overflow="auto">
            {enableColumnPinning && (
              <ColumnPinning
                enableResize={enableResize}
                onClickRow={onClickRow}
                enableSorting={enableSorting}
                table={table}
                headers={table.getLeftHeaderGroups()}
                testPrefix={testPrefix}
                dataGa={dataGa}
                scrollParentRef={scrollParentRef}
                virtualizeOptions={virtualizeOptions}
                meta={tableMeta}
              />
            )}
            <FullTable
              headers={columnPinning ? table.getCenterHeaderGroups() : table.getHeaderGroups()}
              width="100%"
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
              {...rest}
            />
          </Flex>
          {!hasNextPage && !loading && !!warning && (
            <Flex alignItems="center" justifyContent="center" gap={2} padding={[4]} width="100%">
              <Icon name="warning_triangle_hollow" color="warning" />{" "}
              <Text color="warningText">{warning}</Text>
            </Flex>
          )}

          {hasNextPage && loading && (
            <Flex alignItems="center" justifyContent="center" gap={2} padding={[4]} width="100%">
              <IconComponents.LoaderIcon /> <Text>Loading more...</Text>
            </Flex>
          )}
          {enablePagination && <Pagination table={table} />}
        </Flex>
      </TableProvider>
    )
  }
)

NetdataTable.defaultProps = {
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

export default NetdataTable
