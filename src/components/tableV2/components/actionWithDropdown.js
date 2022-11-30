import React, { useRef } from "react"

import BulkAction from "./bulkAction"
import ColumnsMenu from "./columnsMenu" //todo refactor this as right now is used only for the dropdown for column visibility

const ActionWithDropdown = ({
  id,
  icon,
  columnPinning = {},
  enableColumnPinning,
  handleAction,
  tooltipText,
  alwaysEnabled,
  isDisabled,
  isVisible,
  testPrefix,
  selectedRows,
  table,
  isOpen,
  onClose,
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
        {...rest}
      />
      <ColumnsMenu
        parentRef={actionRef}
        isOpen={isOpen}
        columns={columns}
        pinnedColumns={pinnedColumns}
        onClose={onClose}
      />
    </>
  )
}

export default ActionWithDropdown
