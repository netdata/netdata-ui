//TODO refactor bulk action and row action to single function to decrease repeatability
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import Flex from "src/components/templates/flex"

import { comparison, select, includesString } from "./helpers/filterFns"

import makeRowSelection from "./features/rowSelection"
import makePagination from "./features/pagination"
import makeRowActions from "./features/rowActions"
import makeBulkActions from "./features/bulkActions"
import ColumnPinning from "./features/columnPinning"
import GlobalControls from "./features/globalControls"

import MainTable from "./features/mainTable"

import { SharedTableProvider } from "./context/sharedTable"

import useInfiniteScroll from "./hooks/useInfiniteScroll"

const noop = () => {}

const NetdataTable = ({
  bulkActions = {},
  columnPinningOptions = {},
  columnVisibility: initialColumnVisibility,
  data,
  dataColumns,
  dataGa,
  disableClickRow,
  enableColumnPinning = false,
  enableColumnVisibility = false,
  enablePagination,
  enableResize = false,
  enableSelection,
  enableSorting,
  globalFilter: initialGlobalFilter = "",
  globalFilterFn = includesString,
  loadMoreOptions = {},
  onClickRow,
  onColumnVisibilityChange = noop,
  onGlobalSearchChange,
  onHoverRow,
  onRowSelected,
  onSortingChange = noop,
  paginationOptions = {
    pageIndex: 0,
    pageSize: 100,
  },
  rowActions = {},
  sortBy = [],
  tableRef,
  testPrefix = "",
  testPrefixCallback,
  virtualizeOptions = {},
}) => {
  const [isColumnDropdownVisible, setIsColumnDropdownVisible] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility)
  const [columnPinning, setColumnPinning] = React.useState(columnPinningOptions)

  const [originalSelectedRows, setOriginalSelectedRow] = useState([])
  const [sorting, setSorting] = useState(sortBy)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState(initialGlobalFilter)
  const [pagination, setPagination] = useState({
    pageIndex: paginationOptions.pageIndex,
    pageSize: paginationOptions.pageSize,
  })
  const [tableData, setTableData] = useState(data)

  const scrollParentRef = useRef()

  const updateTableData = useCallback(newData => {
    setTableData(oldData => [...oldData, ...newData])
  }, [])

  useInfiniteScroll({ target: scrollParentRef, updateTableData, ...loadMoreOptions })

  const handleColumnVisibilityChange = useCallback(getVisibility => {
    onColumnVisibilityChange(getVisibility)
    setColumnVisibility(getVisibility)
  }, [])

  const handleGlobalSearch = useCallback(value => {
    onGlobalSearchChange?.(value)
    setGlobalFilter(String(value))
  }, [])

  const handleSortingChange = useCallback(getSorting => {
    onSortingChange(getSorting)
    setSorting(getSorting)
  }, [])

  const makeActionsColumn = useMemo(() => makeRowActions({ rowActions, testPrefix }), [rowActions])

  const renderBulkActions = () => [
    makeBulkActions({
      bulkActions,
      columnPinning,
      columnVisibilityOptions: {
        handleAction: () => setIsColumnDropdownVisible(true),
        isOpen: isColumnDropdownVisible,
        onClose: () => setIsColumnDropdownVisible(false),
        visible: enableColumnVisibility,
      },
      enableColumnPinning,
      selectedRows: originalSelectedRows,
      table,
      testPrefix,
    }),
  ]

  const makeSelectionColumn = enableSelection ? [makeRowSelection({ testPrefix })] : []

  const makeDataColumns = useMemo(() => {
    if (!dataColumns || dataColumns.length < 1) return []
    return dataColumns.map(
      (
        {
          header,
          id,
          cell,
          enableFilter = false,
          isPlaceholder,
          filterFn,
          enableGlobalFilter = true,
          enableSorting = true,
          meta,
          size = 150,
          maxSize = 5000,
          minSize = 150,
          sortingFn,
          accessorKey,
          enableHiding = true,
          enableResize = true,
        },
        index
      ) => {
        if (!id) throw new Error(`Please provide id at ${index}`)

        return {
          id,
          cell,
          enableResize,
          accessorKey: accessorKey ? accessorKey : id,
          header,
          ...(filterFn ? { filterFn } : {}),
          footer: props => props.column.id,
          enableColumnFilter: enableFilter,
          enableSorting,
          enableGlobalFilter,
          isPlaceholder,
          meta,
          enableHiding,
          size,
          ...(maxSize ? { maxSize } : {}),
          minSize,
          ...(sortingFn ? { sortingFn } : {}),
        }
      }
    )
  }, [dataColumns])

  const table = useReactTable({
    columns: [...makeSelectionColumn, ...makeDataColumns, ...makeActionsColumn],
    data: tableData,
    manualPagination: !enablePagination,
    columnResizeMode: enableResize ? "onEnd" : "",
    filterFns: {
      comparison,
      select,
    },
    state: {
      columnVisibility,
      rowSelection,
      globalFilter,
      sorting,
      pagination,
      columnPinning,
    },
    ...(globalFilterFn ? { globalFilterFn } : {}),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: handleGlobalSearch,
    onSortingChange: handleSortingChange,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onColumnPinningChange: setColumnPinning,
  })

  useEffect(() => {
    const { rows } = table.getSelectedRowModel()
    if (rows) {
      const selectedRows = rows.reduce((acc, { original }) => {
        if (original?.disabled === true) return acc
        acc.push(original)
        return acc
      }, [])
      setOriginalSelectedRow(selectedRows)
      onRowSelected?.(selectedRows)
    }
  }, [rowSelection, table])

  useEffect(() => {
    setTableData(data)
  }, [data])

  return (
    <SharedTableProvider>
      <Flex height="100%" overflow="hidden" width="100%" column>
        <GlobalControls
          bulkActions={renderBulkActions}
          dataGa={dataGa}
          handleSearch={onGlobalSearchChange ? handleGlobalSearch : null}
          searchValue={globalFilter}
        />
        <Flex
          ref={scrollParentRef}
          overflow={{ vertical: "auto", horizontal: "auto" }}
          width="100%"
          height="100%"
        >
          {enableColumnPinning && (
            <ColumnPinning
              enableResize={enableResize}
              disableClickRow={disableClickRow}
              onClickRow={onClickRow}
              testPrefixCallback={testPrefixCallback}
              enableSorting={enableSorting}
              table={table}
              headers={table.getLeftFlatHeaders()}
              testPrefix={testPrefix}
              dataGa={dataGa}
              flexRender={flexRender}
              onHoverRow={onHoverRow}
              scrollParentRef={scrollParentRef}
              virtualizeOptions={virtualizeOptions}
            />
          )}
          <MainTable
            scrollParentRef={scrollParentRef}
            enableResize={enableResize}
            disableClickRow={disableClickRow}
            onClickRow={onClickRow}
            testPrefixCallback={testPrefixCallback}
            enableSorting={enableSorting}
            enableColumnPinning={enableColumnPinning}
            table={table}
            dataGa={dataGa}
            tableRef={tableRef}
            testPrefix={testPrefix}
            flexRender={flexRender}
            onHoverRow={onHoverRow}
            virtualizeOptions={virtualizeOptions}
          />
        </Flex>
        {enablePagination && makePagination({ table })}
      </Flex>
    </SharedTableProvider>
  )
}

export default NetdataTable
