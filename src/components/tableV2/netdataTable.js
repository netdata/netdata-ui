//TODO refactor bulk action and row action to single funtion to decrease repeatabillity
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

const noop = () => {}

const NetdataTable = ({
  dataColumns,
  data,
  onRowSelected,
  onGlobalSearchChange,
  enableSelection,
  globalFilterFn = includesString,
  tableRef,
  enableSorting,
  rowActions = {},
  bulkActions = {},
  onClickRow,
  onHoverRow,
  onSortingChange = noop,
  disableClickRow,
  enablePagination,
  paginationOptions = {
    pageIndex: 0,
    pageSize: 100,
  },
  columnVisibility: initialColumnVisibility,
  testPrefix = "",
  sortBy = [],
  testPrefixCallback,
  dataGa,
  enableColumnVisibility = false,
  enableColumnPinning = false,
  columnPinningOptions = {},
  enableResize = false,
}) => {
  const [isColumnDropdownVisible, setIsColumnDropdownVisible] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility)
  const [columnPinning, setColumnPinning] = React.useState(columnPinningOptions)

  const [originalSelectedRows, setOriginalSelectedRow] = useState([])
  const [sorting, setSorting] = useState(sortBy)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState({
    pageIndex: paginationOptions.pageIndex,
    pageSize: paginationOptions.pageSize,
  })

  const scrollParentRef = useRef()

  const handleGlobalSearch = useCallback(value => {
    onGlobalSearchChange?.(value)
    setGlobalFilter(String(value))
  }, [])

  const makeActionsColumn = useMemo(() => makeRowActions({ rowActions, testPrefix }), [rowActions])

  const renderBulkActions = () => {
    const bulkActionsArray = [
      makeBulkActions({
        columnVisibilityOptions: {
          isOpen: isColumnDropdownVisible,
          onClose: () => setIsColumnDropdownVisible(false),
          handleAction: () => setIsColumnDropdownVisible(true),
          visible: enableColumnVisibility,
        },
        bulkActions,
        testPrefix,
        table,
        selectedRows: originalSelectedRows,
      }),
    ]

    return bulkActionsArray
  }

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
        if (!id) throw new Error(`Please provide id  at ${index}`)

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
    data: data,
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
    onSortingChange: getSorting => {
      onSortingChange(getSorting)
      setSorting(getSorting)
    },
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
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

  return (
    <SharedTableProvider>
      <Flex height="100%" overflow="hidden" width="100%" column>
        <GlobalControls
          handleSearch={onGlobalSearchChange ? handleGlobalSearch : null}
          dataGa={dataGa}
          bulkActions={renderBulkActions}
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
          />
        </Flex>
        {enablePagination && makePagination({ table })}
      </Flex>
    </SharedTableProvider>
  )
}

export default NetdataTable
