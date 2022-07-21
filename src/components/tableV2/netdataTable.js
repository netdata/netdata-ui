//TODO refactor bulk action and row action to single funtion to decrease repeatabillity
import React, { useEffect, useMemo, useState } from "react"

import Table, { Pagination } from "./base-table"

import {
  createTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useTableInstance,
} from "./react-table.js"

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
  addEntry: { icon: "plus", alwaysEnabled: true },
  remove: { icon: "removeNode", confirmation: true, confirmLabel: "Yes", declineLabel: "No" },
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
}

const table = createTable().setOptions({ filterFns: { comparison, select } })

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
    pageSize: 100,
  },
  columnVisibility,
  testPrefix = "",
  sortBy = [],
  testPrefixCallback,
  dataGa,
}) => {
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
      alwaysEnabled,
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
          size,
          ...(maxSize ? { maxSize } : {}),
          minSize,
          ...(sortingFn ? { sortingFn } : {}),
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
      bulkActions={() =>
        renderBulkActions({
          bulkActions: availableBulkActions,
          testPrefix,
          instance,
          selectedRows: originalSelectedRows,
        })
      }
      Pagination={enablePagination && renderPagination({ instance })}
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
        {instance.getRowModel().rows.map(row => (
          <Table.Row
            data-testid={`netdata-table-row${testPrefix}${
              testPrefixCallback ? "-" + testPrefixCallback?.(row.original) : ""
            }`}
            onClick={
              onClickRow &&
              (() => onClickRow({ data: row.original, table: instance, fullRow: row }))
            }
            key={row.id}
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
                  {cell.renderCell()}
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
  const HeadCell = headers.map(({ id, colSpan, renderHeader, isPlaceholder, column }) => {
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
          {isPlaceholder ? null : renderHeader()}
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
        {isPlaceholder ? null : renderHeader()}
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

const renderPagination = ({ instance }) => {
  const {
    nextPage,
    previousPage,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    setPageIndex,
    resetPageIndex,
  } = instance
  const pageSize = instance.getState().pagination.pageSize
  const pageIndex = instance.getState().pagination.pageIndex

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
  return table.createDataColumn("actions", {
    header: () => {
      return "Actions"
    },
    cell: ({ row, instance }) => {
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
                handleAction={() => handleAction(row.original, instance)}
                tooltipText={tooltipText}
                testPrefix={testPrefix}
                currentRow={row}
                disabledTooltipText={disabledTooltipText}
              />
            )
          )}
        </Flex>
      )
    },
    enableColumnFilter: false,
    enableSorting: false,
    meta: { stopPropagation: true },
  })
}

const renderBulkActions = ({ bulkActions, instance, testPrefix, selectedRows }) => {
  if (!bulkActions || !bulkActions.length) return <Box aria-hidden as="span" />
  return bulkActions.map(
    ({ id, icon, handleAction, tooltipText, alwaysEnabled, isDisabled, isVisible, ...rest }) => {
      const disabled = typeof isDisabled === "function" ? isDisabled() : isDisabled
      const visible = typeof isVisible === "function" ? isVisible() : isVisible
      return (
        <Action
          testPrefix={`-bulk${testPrefix}`}
          key={id}
          visible={visible}
          id={id}
          icon={icon}
          handleAction={() => handleAction(selectedRows, instance)}
          tooltipText={tooltipText}
          disabled={(!alwaysEnabled && selectedRows?.length < 1) || disabled}
          background="elementBackground"
          iconColor="elementBackground"
          selectedRows={selectedRows}
          {...rest}
        />
      )
    }
  )
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
    size: ROW_SELECTION_SIZE,
    maxSize: ROW_SELECTION_MAX_SIZE,
    minSize: ROW_SELECTION_MIN_SIZE,
    meta: { stopPropagation: true },
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
