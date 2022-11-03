//TODO refactor bulk action and row action to single funtion to decrease repeatabillity
import React, { useEffect, useMemo, useState } from "react"

import Table from "./components/base-table"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { comparison, select, includesString } from "./helpers/filterFns"

import makeHeadCell from "./core/headCell"

import makeRowSelection from "./features/rowSelection"
import makePagination from "./features/pagination"
import makeRowActions from "./features/rowActions"
import makeBulkActions from "./features/bulkActions"

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
  disableClickRow,
  enablePagination,
  paginationOptions = {
    pageIndex: 0,
    pageSize: 100,
  },
  columnVisibility: intialColumnVisibility,
  testPrefix = "",
  sortBy = [],
  testPrefixCallback,
  dataGa,
  enableColumnVisibility = false,
}) => {
  const [isColumnDropdownVisible, setIsColumnDropdownVisible] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState(intialColumnVisibility)

  const [originalSelectedRows, setOriginalSelectedRow] = useState([])
  const [sorting, setSorting] = useState(sortBy)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState({
    pageIndex: paginationOptions.pageIndex,
    pageSize: paginationOptions.pageSize,
  })

  const handleGlobalSearch = value => {
    onGlobalSearchChange?.(value)
    setGlobalFilter(String(value))
  }

  const makeActionsColumn = makeRowActions({ rowActions, testPrefix })

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
          size = 30,
          maxSize = 1000,
          minSize = 10,
          sortingFn,
          accessorKey,
          enableHiding = true,
        },
        index
      ) => {
        if (!id) throw new Error(`Please provide id  at ${index}`)

        return {
          id,
          cell,
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
    },
    ...(globalFilterFn ? { globalFilterFn } : {}),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: handleGlobalSearch,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
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

  const headers = table.getFlatHeaders()

  return (
    <Table
      selectedRows={originalSelectedRows}
      bulkActions={() => renderBulkActions()}
      Pagination={enablePagination && makePagination({ table })}
      handleSearch={onGlobalSearchChange ? handleGlobalSearch : null}
      ref={tableRef}
      data-testid={`netdata-table${testPrefix}`}
      testPrefix={testPrefix}
      dataGa={dataGa}
    >
      <Table.Head data-testid={`netdata-table-head${testPrefix}`}>
        <Table.HeadRow data-testid={`netdata-table-headRow${testPrefix}`}>
          {makeHeadCell({ headers, enableSorting, testPrefix })}
        </Table.HeadRow>
      </Table.Head>
      <Table.Body data-testid={`netdata-table-body${testPrefix}`}>
        {table.getRowModel().rows.map(row => (
          <Table.Row
            data-testid={`netdata-table-row${testPrefix}${
              testPrefixCallback ? "-" + testPrefixCallback?.(row.original) : ""
            }`}
            onClick={
              onClickRow && (() => onClickRow({ data: row.original, table: table, fullRow: row }))
            }
            key={row.id}
            disableClickRow={() =>
              disableClickRow && disableClickRow({ data: row.original, table: table, fullRow: row })
            }
          >
            {row.getVisibleCells().map(cell => {
              return (
                <Table.Cell
                  width={cell.column.getSize()}
                  minWidth={cell.column.columnDef.minSize}
                  maxWidth={cell.column.columnDef.maxSize}
                  data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
                  key={cell.id}
                  {...cell.column.columnDef.meta}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default NetdataTable
