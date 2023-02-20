import React, { useRef } from "react"

import BulkAction from "./bulkAction"
import ColumnsMenu from "./columnsMenu" //todo refactor this as right now is used only for the dropdown for column visibility

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
  const actionRef = useRef()
  const disabled = typeof isDisabled === "function" ? isDisabled() : isDisabled
  const visible = typeof isVisible === "function" ? isVisible() : isVisible

  const allColumns = table.getAllLeafColumns()
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
        dataGa={dataGa}
        isOpen={isOpen}
        onClose={onClose}
        parentRef={actionRef}
        pinnedColumns={pinnedColumns}
      />
    </>
  )
}

export default ColumnVisibilityAction
