import React, { useRef, useMemo } from "react"
import useToggle from "@/hooks/useToggle"
import BulkAction from "../action"
import ColumnsMenu from "./columnsMenu"
import { supportedBulkActions } from "../useActions"
import { useTableState } from "../../../provider"

const rerenderSelector = state => state.columnVisibility

const ColumnVisibilityAction = ({
  alwaysEnabled,
  columnPinning = {},
  dataGa,
  enableColumnPinning,
  handleAction,
  id,
  icon,
  isDisabled,
  isOpen,
  isVisible,
  onClose,
  selectedRows,
  table,
  testPrefix,
  tooltipText,
  ...rest
}) => {
  useTableState(rerenderSelector)
  const actionRef = useRef()
  const disabled = typeof isDisabled === "function" ? isDisabled() : isDisabled
  const visible = typeof isVisible === "function" ? isVisible() : isVisible

  const columnGroups = useMemo(() => {
    const groups = []
    const columnMap = new Map()
    
    table.getHeaderGroups().forEach(headerGroup => {
      headerGroup.headers.forEach(header => {
        if (header.column.columns && header.column.columns.length > 0) {
          const groupColumns = header.column.columns.filter(col => col.getCanHide())
          if (groupColumns.length > 0) {
            groups.push({
              id: header.column.id,
              name: header.column.columnDef.name ||
                (typeof header.column.columnDef.headerString === "function"
                  ? header.column.columnDef.headerString()
                  : header.column.columnDef.headerString) ||
                header.column.id,
              columns: groupColumns
            })
          }
          header.column.columns.forEach(subColumn => {
            columnMap.set(subColumn.id, subColumn)
          })
        } else {
          columnMap.set(header.column.id, header.column)
        }
      })
    })
    
    return { groups, flatColumns: Array.from(columnMap.values()) }
  }, [table])

  const allColumns = useMemo(() => 
    columnGroups.flatColumns.sort((a, b) =>
      a.id.localeCompare(b.id, undefined, {
        sensitivity: "accent",
        ignorePunctuation: true,
      })
    ), [columnGroups.flatColumns])

  const allPinnedColumns = enableColumnPinning
    ? [...(columnPinning?.left || []), ...(columnPinning?.right || [])]
    : []
  
  const { columns, pinnedColumns } = enableColumnPinning
    ? allColumns.reduce(
        (accumulator, column) => {
          if (!column.getCanHide()) return accumulator

          let key = "columns"
          if (allPinnedColumns.includes(column.id)) {
            key = "pinnedColumns"
          }

          return {
            ...accumulator,
            [key]: [...accumulator[key], column],
          }
        },
        { columns: [], pinnedColumns: [] }
      )
    : { columns: allColumns, pinnedColumns: [] }
  return (
    <>
      <BulkAction
        ref={actionRef}
        testPrefix={`-bulk${testPrefix}`}
        visible={visible}
        id={id}
        icon={icon}
        handleAction={() => handleAction(selectedRows, table)}
        tooltipText={tooltipText}
        disabled={(!alwaysEnabled && selectedRows?.length < 1) || disabled}
        background="elementBackground"
        selectedRows={selectedRows}
        dataGa={dataGa}
        {...rest}
      />
      <ColumnsMenu
        columns={columns}
        columnGroups={columnGroups.groups}
        dataGa={dataGa}
        isOpen={isOpen}
        onClose={onClose}
        parentRef={actionRef}
        pinnedColumns={pinnedColumns}
      />
    </>
  )
}

const ColumnVisibility = ({ isVisible, ...rest }) => {
  const [isOpen, toggle, , close] = useToggle(false)

  return (
    <ColumnVisibilityAction
      key="columnVisibility"
      {...supportedBulkActions.columnVisibility}
      handleAction={toggle}
      isOpen={isOpen}
      isVisible={isVisible}
      id="columnVisibility"
      onClose={close}
      {...rest}
    />
  )
}

export default ColumnVisibility
