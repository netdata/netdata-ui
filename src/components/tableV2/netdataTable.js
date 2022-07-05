//TODO refactor bulk action and row action to single funtion to decrease repeatabillity
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

import ComparisonFilter from "./comparisonFilter"

import { comparison } from "./filterFns"

export const supportedBulkActions = {
  delete: {
    icon: "trashcan",
    confirmation: true,
    tooltipText: "Delete",
    confirmationTitle: "Delete Row",
    confirmationMessage: "You are about to delete a row, are you sure you want to continue?",
    confirmLabel: "Yes",
    declineLabel: "No",
    actionButtonDirection: "reverse",
  },
  download: { icon: "download", confirmation: false, tooltipText: "Download" },
  toggleAlarm: { icon: "alarm_off", confirmation: false, tooltipText: "Turn of Alarms" },
  userSettings: { icon: "user", confirmation: false, tooltipText: "User Settings" },
}

export const supportedRowActions = {
  delete: {
    icon: "trashcan",
    confirmation: true,
    tooltipText: "Delete",
    confirmationTitle: "Delete Row",
    confirmationMessage: "You are about to delete a row, are you sure?",
    confirmLabel: "Yes",
    declineLabel: "No",
    actionButtonDirection: "reverse",
  },
  info: { icon: "information", confirmation: false, tooltipText: "Information" },
  toggleAlarm: { icon: "alarm_off", confirmation: false, tooltipText: "Turn of Alarms" },
  userSettings: { icon: "user", confirmation: false, tooltipText: "User Settings" },
}

const table = createTable().setOptions({ filterFns: { comparison } })

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
  onClickRow,
  enablePagination,
  paginationOptions = {
    pageIndex: 0,
    pageSize: 0,
  },
  columnVisibility,
  testPrefix = "",
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
    const {
      icon,
      confirmation,
      tooltipText,
      confirmationTitle,
      confirmationMessage,
      confirmLabel,
      declineLabel,
      handleDecline,
      actionButtonDirection,
    } = supportedRowActions[currentActionKey]
    const currentAction = rowActions[currentActionKey]
    acc.push({
      confirmation,
      tooltipText,
      icon,
      id: currentActionKey,
      confirmationTitle,
      confirmationMessage,
      confirmLabel,
      declineLabel,
      handleDecline,
      actionButtonDirection,
      ...currentAction,
    })
    return acc
  }, [])

  const availableBulkActions = Object.keys(bulkActions).reduce((acc, currentActionKey) => {
    const isBulkActionSupported = supportedBulkActions[currentActionKey]
    if (!isBulkActionSupported) return []
    const {
      icon,
      confirmation,
      tooltipText,
      confirmationTitle,
      confirmationMessage,
      confirmLabel,
      declineLabel,
      handleDecline,
      actionButtonDirection,
    } = supportedBulkActions[currentActionKey]
    const currentAction = bulkActions[currentActionKey]
    acc.push({
      confirmation,
      tooltipText,
      icon,
      id: currentActionKey,
      confirmationTitle,
      confirmationMessage,
      confirmLabel,
      declineLabel,
      handleDecline,
      actionButtonDirection,
      ...currentAction,
    })
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
          enableSorting = true,
          meta,
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
          enableSorting,
          enableGlobalFilter,
          isPlaceholder,
          meta,
        })
      }
    )
  }, [dataColumns])

  const makeSelectionColumn = enableSelection ? [renderRowSelection({ testPrefix })] : []
  const makeActionsColumn =
    availableRowActions.length > 0
      ? [renderActions({ actions: availableRowActions, testPrefix })]
      : []

  const handleGlobalSearch = value => {
    onGlobalSearchChange?.(value)
    setGlobalFilter(String(value))
  }

  const instance = useTableInstance(table, {
    columns: [...makeSelectionColumn, ...makeDataColumns, ...makeActionsColumn],
    data: data,
    state: {
      columnVisibility,
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
        if (original?.disabled === true) return acc
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
      data-testid={`netdata-table${testPrefix}`}
      testPrefix={testPrefix}
    >
      <Table.Head data-testid={`netdata-table-head${testPrefix}`}>
        <Table.HeadRow data-testid={`netdata-table-headRow${testPrefix}`}>
          {renderHeadCell({ headers, enableSorting, testPrefix })}
        </Table.HeadRow>
      </Table.Head>
      <Table.Body data-testid={`netdata-table-body${testPrefix}`}>
        {instance.getRowModel().rows.map(row => (
          <Table.Row
            data-testid={`netdata-table-row${testPrefix}`}
            onClick={() => onClickRow?.(row.original, row)}
            key={row.id}
          >
            {row.getVisibleCells().map(cell => (
              <Table.Cell data-testid={`netdata-table-cell${testPrefix}`} key={cell.id}>
                {cell.renderCell()}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const renderHeadCell = ({ headers, enableSorting, testPrefix }) => {
  const HeadCell = headers.map(({ id, colSpan, renderHeader, isPlaceholder, column }) => {
    const { getCanSort, columnDef } = column
    const { meta } = columnDef

    const availableFilters = { comparison: ComparisonFilter, default: SearchFilter }
    const selectedFilter = meta && meta.filter ? meta.filter : "default"
    const Filter = availableFilters[selectedFilter]

    if (getCanSort() && enableSorting) {
      return (
        <Table.SortingHeadCell
          data-testid={`netdata-table-head-cell${testPrefix}`}
          sortDirection={column.getIsSorted()}
          onSortClicked={column.getToggleSortingHandler()}
          colSpan={colSpan}
          key={id}
          filter={column.getCanFilter() && <Filter column={column} testPrefix={testPrefix} />}
        >
          {isPlaceholder ? null : renderHeader()}
        </Table.SortingHeadCell>
      )
    }

    return (
      <Table.HeadCell
        data-testid={`netdata-table-head-cell${testPrefix}`}
        colSpan={colSpan}
        key={id}
      >
        {isPlaceholder ? null : renderHeader()}
        {column.getCanFilter() ? (
          <div>
            <Filter column={column} testPrefix={testPrefix} />
          </div>
        ) : null}
      </Table.HeadCell>
    )
  })

  return HeadCell
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

const renderActions = ({ actions, testPrefix }) => {
  return table.createDataColumn("actions", {
    header: () => {
      return "Actions"
    },
    cell: ({ row }) => {
      const isDisabled = row.original?.disabled ?? false
      return (
        <Flex data-testid="action-cell" height="100%" gap={2}>
          {actions.map(
            ({
              id,
              icon,
              handleAction,
              tooltipText,
              confirmation,
              confirmationTitle,
              confirmationMessage,
              confirmLabel,
              declineLabel,
              handleDecline,
              actionButtonDirection,
            }) => (
              <Action
                disabled={isDisabled}
                actionButtonDirection={actionButtonDirection}
                handleDecline={handleDecline}
                declineLabel={declineLabel}
                confirmLabel={confirmLabel}
                confirmationMessage={confirmationMessage}
                confirmationTitle={confirmationTitle}
                confirmation={confirmation}
                key={id}
                id={id}
                icon={icon}
                handleAction={() => handleAction(row.original)}
                tooltipText={tooltipText}
                testPrefix={testPrefix}
                currentRow={row}
              />
            )
          )}
        </Flex>
      )
    },
    enableColumnFilter: false,
    enableSorting: false,
  })
}

const renderRowSelection = ({ testPrefix }) => {
  return table.createDataColumn("checkbox", {
    header: ({ instance }) => {
      return (
        <ColumnCheckbox
          data-testid={`netdata-table-header-checkbox${testPrefix}`}
          checked={instance.getIsAllPageRowsSelected()}
          indeterminate={instance.getIsSomePageRowsSelected()}
          onChange={instance.getToggleAllPageRowsSelectedHandler()}
        />
      )
    },
    cell: ({ row }) => {
      const isDisabled = row.original?.disabled ?? false
      return (
        <ColumnCheckbox
          data-testid={`netdata-table-cell-checkbox${testPrefix}`}
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
          disabled={isDisabled}
        />
      )
    },
    enableColumnFilter: false,
    enableSorting: false,
  })
}

const SearchFilter = ({ column, testPrefix }) => {
  const columnFilterValue = column.getFilterValue()
  const { id = "" } = column
  return (
    <Box
      data-testid={`netdata-table-filter-${id}${testPrefix}`}
      as={SearchInput}
      width={{ max: 50 }}
      value={columnFilterValue ?? ""}
      placeholder={"...Search"}
      iconRight={<Icon name="magnify" />}
      onChange={e => column.setFilterValue(e.target.value)}
    />
  )
}

const ColumnCheckbox = ({ checked, indeterminate, onChange, disabled, ...rest }) => {
  return (
    <Checkbox
      disabled={disabled}
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
      {...rest}
    />
  )
}

export default NetdataTable
