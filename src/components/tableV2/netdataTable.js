//TODO ADD CONFIRMATION DIALOG COMPONENT
import React, { useMemo, useState, useEffect } from "react"

import Table, { Pagination } from "./base-table"

import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "./react-table.js"

import { Icon } from "src/components/icon"
import Box from "src/components/templates/box"
import Flex from "src/components/templates/flex"

import SearchInput from "src/components/search"
import { Checkbox } from "src/components/checkbox"

import Action from "./action"

const supportedBulkActions = {
  delete: { icon: "trashcan", confirmation: false, tooltipText: "Delete" },
  download: { icon: "download", confirmation: false, tooltipText: "Download" },
  toggleAlarm: { icon: "alarm_off", confirmation: false, tooltipText: "Turn of Alarms" },
}

const supportedRowActions = {
  delete: { icon: "trashcan", confirmation: false, tooltipText: "Delete" },
  info: { icon: "information", confirmation: false, tooltipText: "Information" },
  toggleAlarm: { icon: "alarm_off", confirmation: false, tooltipText: "Turn of Alarms" },
}

const table = createTable()

const NetdataTable = ({
  dataColumns,
  data,
  onRowSelected,
  onGlobalSearchChange,
  enableSelection,
  globalFilterFn,
  tableRef,
  enableSorting,
  rowActions = {},
  bulkActions = {},
  enablePagination,
  paginationOptions = {
    pageIndex: 0,
    pageSize: 0,
  },
}) => {
  const [originalSelectedRows, setOriginalSelectedRow] = useState([])
  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState({
    pageIndex: paginationOptions.pageIndex,
    pageSize: paginationOptions.pageSize,
  })

  const availableRowActions = Object.keys(rowActions).reduce((acc, currentActionKey) => {
    const isActionSupported = supportedRowActions[currentActionKey]
    if (!isActionSupported) return []
    const { icon, confirmation, tooltipText } = supportedRowActions[currentActionKey]
    const currentAction = rowActions[currentActionKey]
    acc.push({ confirmation, tooltipText, icon, id: currentActionKey, ...currentAction })
    return acc
  }, [])

  const availableBulkActions = Object.keys(bulkActions).reduce((acc, currentActionKey) => {
    const isBulkActionSupported = supportedBulkActions[currentActionKey]
    if (!isBulkActionSupported) return []
    const { icon, confirmation, tooltipText } = supportedBulkActions[currentActionKey]
    const currentAction = bulkActions[currentActionKey]
    acc.push({ confirmation, tooltipText, icon, id: currentActionKey, ...currentAction })
    return acc
  }, [])

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
        },
        index
      ) => {
        if (!id) throw new Error(`Please provide id  at ${index}`)

        return table.createDataColumn(id, {
          ...(cell && { cell: typeof cell === "function" ? props => cell(props) : cell }),
          ...(header && { header: typeof header === "function" ? () => header() : header }),
          ...(filterFn ? { filterFn } : {}),
          footer: props => props.column.id,
          enableColumnFilter: enableFilter,
          enableGlobalFilter,
          isPlaceholder,
        })
      }
    )
  }, [dataColumns])

  const makeSelectionColumn = enableSelection ? [renderCheckBox()] : []
  const makeActionsColumn =
    availableRowActions.length > 0 ? [renderActions({ actions: availableRowActions })] : []

  const handleGlobalSearch = value => {
    onGlobalSearchChange?.(value)
    setGlobalFilter(String(value))
  }

  const instance = useTableInstance(table, {
    columns: [...makeSelectionColumn, ...makeDataColumns, ...makeActionsColumn],
    data: data,
    state: {
      rowSelection,
      globalFilter,
      sorting,
      ...(enablePagination ? { pagination } : {}),
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
  })

  useEffect(() => {
    const { rows } = instance.getSelectedRowModel()
    if (rows) {
      const selectedRows = rows.reduce((acc, { original }) => {
        acc.push(original)
        return acc
      }, [])
      setOriginalSelectedRow(selectedRows)
      onRowSelected?.(selectedRows)
    }
  }, [rowSelection, instance])

  const headers = instance.getFlatHeaders()

  return (
    <Table
      selectedRows={originalSelectedRows}
      bulkActions={availableBulkActions}
      Pagination={enablePagination && renderPagination({ instance })}
      handleSearch={onGlobalSearchChange ? handleGlobalSearch : null}
      ref={tableRef}
    >
      <Table.Head>
        <Table.HeadRow>{renderHeadCell({ headers, enableSorting })}</Table.HeadRow>
      </Table.Head>
      <Table.Body>
        {instance.getRowModel().rows.map(row => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map(cell => (
              <Table.Cell key={cell.id}>{cell.renderCell()}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const renderHeadCell = ({ headers, enableSorting }) => {
  const HeadCell = headers.map(({ id, colSpan, renderHeader, isPlaceholder, column }) => (
    <Table.HeadCell colSpan={colSpan} key={id}>
      {isPlaceholder ? null : renderHeader()}
      {column.getCanFilter() ? (
        <div>
          <Filter column={column} />
        </div>
      ) : null}
    </Table.HeadCell>
  ))

  const SortingHeadCell = headers.map(({ id, colSpan, renderHeader, isPlaceholder, column }) => (
    <Table.SortingHeadCell
      sortDirection={column.getIsSorted()}
      onSortClicked={column.getToggleSortingHandler()}
      colSpan={colSpan}
      key={id}
      filter={column.getCanFilter() && <Filter column={column} />}
    >
      {isPlaceholder ? null : renderHeader()}
    </Table.SortingHeadCell>
  ))

  return enableSorting ? SortingHeadCell : HeadCell
}

const renderPagination = ({ instance }) => {
  const { nextPage, previousPage, getCanPreviousPage, getCanNextPage, getPageCount } = instance
  const pageSize = instance.getState().pagination.pageSize
  const pageIndex = instance.getState().pagination.pageIndex

  return (
    <Pagination
      pageCount={getPageCount()}
      hasNext={getCanNextPage()}
      hasPrevious={getCanPreviousPage()}
      onNextPage={nextPage}
      onPreviousPage={previousPage}
      pageSize={pageSize}
      pageIndex={pageIndex + 1}
    />
  )
}

const renderActions = ({ actions }) => {
  return table.createDataColumn("actions", {
    header: () => {
      return "Actions"
    },
    cell: ({ row }) => {
      return (
        <Flex data-testid="action-cell" height="100%" gap={2}>
          {actions.map(({ id, icon, handleAction, tooltipText }) => (
            <Action
              key={id}
              icon={icon}
              handleAction={() => handleAction(row.original)}
              tooltipText={tooltipText}
              row={row}
            />
          ))}
        </Flex>
      )
    },
    enableColumnFilter: false,
  })
}

const renderCheckBox = () => {
  return table.createDataColumn("checkbox", {
    header: ({ instance }) => {
      return (
        <ColumnCheckbox
          checked={instance.getIsAllRowsSelected()}
          indeterminate={instance.getIsSomeRowsSelected()}
          onChange={instance.getToggleAllRowsSelectedHandler()}
        />
      )
    },
    cell: ({ row }) => {
      return (
        <ColumnCheckbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      )
    },
    enableColumnFilter: false,
  })
}

const Filter = ({ column }) => {
  const columnFilterValue = column.getFilterValue()
  return (
    <Box
      as={SearchInput}
      width={{ max: 50 }}
      value={columnFilterValue ?? ""}
      placeholder={"...Search"}
      iconRight={<Icon name="magnify" />}
      onChange={e => column.setFilterValue(e.target.value)}
    ></Box>
  )
}

const ColumnCheckbox = ({ checked, indeterminate, onChange }) => {
  return <Checkbox checked={checked} indeterminate={indeterminate} onChange={onChange} />
}

export default NetdataTable
