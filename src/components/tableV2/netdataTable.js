//TODO refactor bulk action and row action to single funtion to decrease repeatabillity
import React, { useEffect, useMemo, useRef, useState } from "react"

import Table, { Pagination } from "./base-table"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import Box from "src/components/templates/box"
import Flex from "src/components/templates/flex"

import SearchInput from "src/components/search"
import { Checkbox } from "src/components/checkbox"

import Action from "./action"

import ComparisonFilter from "./comparisonFilter"

import { comparison, select } from "./filterFns"

import SelectFilter from "./selectFilter"
import Tooltip from "src/components/drops/tooltip"
import { Icon } from "src/components/icon"

import BulkAction from "./bulkAction"
import ActionWithDropdown from "./actionWithDropdown"

const ROW_SELECTION_MAX_SIZE = 10
const ROW_SELECTION_MIN_SIZE = 10
const ROW_SELECTION_SIZE = 10

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
  addEntry: { icon: "plus", alwaysEnabled: true, flavour: "default" },
  remove: { icon: "removeNode", confirmation: true, confirmLabel: "Yes", declineLabel: "No" },
  columnVisibillity: { icon: "gear", alwaysEnabled: true },
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
    disabledTooltipText: "Delete is disabled",
  },
  replace: {
    icon: "refresh",
    confirmation: true,
    tooltipText: "Replace",
    confirmationTitle: "Replace Row",
    confirmationMessage: "You are about to replace a row, are you sure you want to continue?",
    confirmLabel: "Yes",
    declineLabel: "No",
    actionButtonDirection: "reverse",
  },
  info: { icon: "information", confirmation: false, tooltipText: "Information" },
  toggleAlarm: { icon: "alarm_off", confirmation: false, tooltipText: "Turn of Alarms" },
  userSettings: { icon: "user", confirmation: false, tooltipText: "User Settings" },
  remove: {
    icon: "removeNode",
    confirmation: true,
    actionButtonDirection: "reverse",
    confirmLabel: "Yes",
    declineLabel: "No",
  },
  goto: {
    icon: "nav_arrow_goto",
    confirmation: false,
    tooltipText: "Go to",
  },
}

const includesString = (row, columnId, filterValue) => {
  const search = filterValue.toLowerCase()

  return String(row.getValue(columnId))?.toLowerCase().includes(search)
}

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

  const makeColumnVisibilityAction = useMemo(
    () => ({
      id: "columnVisibility",
      handleAction: () => setIsColumnDropdownVisible(true),
      visible: enableColumnVisibility,
      icon: "gear",
      alwaysEnabled: true,
    }),
    [enableColumnVisibility]
  )

  const makeBulkActions = () => {
    const columnVisibillityAction = renderActionWithDropdown({
      actions: [makeColumnVisibilityAction],
      table,
      testPrefix,
      isOpen: isColumnDropdownVisible,
      onClose: () => setIsColumnDropdownVisible(false),
      selectedRows: originalSelectedRows,
    })

    const bulkActions = [
      availableBulkActions
        ? renderBulkActions({
            bulkActions: availableBulkActions,
            testPrefix,
            table,
            selectedRows: originalSelectedRows,
          })
        : [],
      ...columnVisibillityAction,
    ]

    return bulkActions
  }

  const [originalSelectedRows, setOriginalSelectedRow] = useState([])
  const [sorting, setSorting] = useState(sortBy)
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
      disabledTooltipText,
      flavour,
      iconColor,
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
      disabledTooltipText,
      flavour,
      iconColor,
      ...currentAction,
    })
    return acc
  }, [])

  const availableBulkActions = Object.keys(bulkActions).reduce((acc, currentActionKey) => {
    const isBulkActionSupported = supportedBulkActions[currentActionKey]
    if (!isBulkActionSupported) return acc
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
      alwaysEnabled,
      iconColor,
      flavour,
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
      alwaysEnabled,
      iconColor,
      flavour,
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

  const makeSelectionColumn = enableSelection ? [renderRowSelection({ testPrefix })] : []
  const makeActionsColumn =
    availableRowActions.length > 0
      ? [renderActions({ actions: availableRowActions, testPrefix })]
      : []

  const handleGlobalSearch = value => {
    onGlobalSearchChange?.(value)
    setGlobalFilter(String(value))
  }

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
      bulkActions={() => makeBulkActions()}
      Pagination={enablePagination && renderPagination({ table })}
      handleSearch={onGlobalSearchChange ? handleGlobalSearch : null}
      ref={tableRef}
      data-testid={`netdata-table${testPrefix}`}
      testPrefix={testPrefix}
      dataGa={dataGa}
    >
      <Table.Head data-testid={`netdata-table-head${testPrefix}`}>
        <Table.HeadRow data-testid={`netdata-table-headRow${testPrefix}`}>
          {renderHeadCell({ headers, enableSorting, testPrefix })}
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

const renderHeadCell = ({ headers, enableSorting, testPrefix }) => {
  const HeadCell = headers.map(({ id, colSpan, getContext, isPlaceholder, column }) => {
    const { getCanSort, columnDef } = column
    const { meta } = columnDef

    const availableFilters = {
      comparison: ComparisonFilter,
      select: SelectFilter,
      default: SearchFilter,
    }
    const selectedFilter = meta && meta?.filter?.component ? meta?.filter?.component : "default"
    const filterOptions = meta && meta?.filter ? meta?.filter : {}
    const tooltipText = meta && meta?.tooltip ? meta?.tooltip : ""
    const Filter = availableFilters[selectedFilter]

    if (getCanSort() && enableSorting) {
      return (
        <Table.SortingHeadCell
          width={column.getSize()}
          minWidth={column.columnDef.minSize}
          maxWidth={column.columnDef.maxSize}
          data-testid={`netdata-table-head-cell${testPrefix}`}
          sortby-testid={`netdata-table-head-cell-sortyBy-${id}${testPrefix}`}
          sortDirection={column.getIsSorted()}
          onSortClicked={column.getToggleSortingHandler()}
          colSpan={colSpan}
          key={id}
          filter={
            column.getCanFilter() && (
              <Filter column={column} testPrefix={testPrefix} {...filterOptions} />
            )
          }
        >
          <Box position="absolute" right={0}>
            {tooltipText && (
              <Tooltip align="bottom" content={tooltipText}>
                <Icon color="nodeBadgeColor" size="small" name="information"></Icon>
              </Tooltip>
            )}
          </Box>
          {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}{" "}
        </Table.SortingHeadCell>
      )
    }

    return (
      <Table.HeadCell
        width={column.getSize()}
        minWidth={column.columnDef.minSize}
        maxWidth={column.columnDef.maxSize}
        data-testid={`netdata-table-head-cell${testPrefix}`}
        colSpan={colSpan}
        key={id}
      >
        {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
        {column.getCanFilter() ? (
          <div>
            <Filter column={column} testPrefix={testPrefix} {...filterOptions} />
          </div>
        ) : null}
      </Table.HeadCell>
    )
  })

  return HeadCell
}

const renderPagination = ({ table }) => {
  const {
    nextPage,
    previousPage,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    setPageIndex,
    resetPageIndex,
  } = table
  const pageSize = table.getState().pagination.pageSize
  const pageIndex = table.getState().pagination.pageIndex

  return (
    <Pagination
      setPageIndex={setPageIndex}
      resetPageIndex={resetPageIndex}
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
  return {
    id: "actions",
    enableHiding: false,

    header: () => {
      return "Actions"
    },
    cell: ({ row, table }) => {
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
              isDisabled,
              isVisible = true,
              disabledTooltipText,
              dataGa,
              CustomUIAction,
            }) => (
              <Action
                disabled={
                  isDisabled && typeof isDisabled === "function"
                    ? isDisabled(row.original)
                    : isDisabled
                }
                visible={
                  isVisible && typeof isVisible === "function" ? isVisible(row.original) : isVisible
                }
                dataGa={typeof dataGa === "function" ? dataGa(row.original) : dataGa}
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
                handleAction={() => handleAction(row.original, table)}
                tooltipText={tooltipText}
                testPrefix={testPrefix}
                currentRow={row}
                disabledTooltipText={disabledTooltipText}
                CustomUIAction={CustomUIAction}
              />
            )
          )}
        </Flex>
      )
    },
    enableColumnFilter: false,
    enableSorting: false,
    meta: { stopPropagation: true },
  }
}

const renderBulkActions = ({ bulkActions, table, testPrefix, selectedRows }) => {
  if (!bulkActions || !bulkActions.length) return <Box aria-hidden as="span" key="empty-box" />
  return bulkActions.map(
    ({ id, icon, handleAction, tooltipText, alwaysEnabled, isDisabled, isVisible, ...rest }) => {
      return (
        <BulkAction
          key={id}
          id={id}
          icon={icon}
          handleAction={handleAction}
          tooltipText={tooltipText}
          alwaysEnabled={alwaysEnabled}
          isDisabled={isDisabled}
          isVisible={isVisible}
          table={table}
          testPrefix={testPrefix}
          selectedRows={selectedRows}
          {...rest}
        />
      )
    }
  )
}

const renderRowSelection = ({ testPrefix }) => {
  return {
    id: "checkbox",
    enableHiding: false,
    header: ({ table }) => {
      return (
        <ColumnCheckbox
          data-testid={`netdata-table-header-checkbox${testPrefix}`}
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
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
    size: ROW_SELECTION_SIZE,
    maxSize: ROW_SELECTION_MAX_SIZE,
    minSize: ROW_SELECTION_MIN_SIZE,
    meta: { stopPropagation: true },
  }
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

const renderActionWithDropdown = ({
  actions,
  table,
  testPrefix,
  selectedRows,
  isOpen,
  onClose,
}) => {
  if (!actions || !actions.length) return <Box aria-hidden as="span" />
  return actions.map(
    ({ id, icon, handleAction, tooltipText, alwaysEnabled, isDisabled, isVisible, ...rest }) => {
      return (
        <ActionWithDropdown
          key={id}
          isVisible={isVisible}
          alwaysEnabled={alwaysEnabled}
          isDisabled={isDisabled}
          tooltipText={tooltipText}
          icon={icon}
          handleAction={handleAction}
          table={table}
          testPrefix={testPrefix}
          selectedRows={selectedRows}
          isOpen={isOpen}
          onClose={onClose}
          {...rest}
        />
      )
    }
  )
}

export default NetdataTable
