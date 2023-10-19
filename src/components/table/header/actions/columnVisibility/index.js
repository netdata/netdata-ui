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

  const allColumns = useMemo(
    () =>
      [...table.getAllLeafColumns()].sort((a, b) =>
        a.id.localeCompare(b.id, undefined, {
          sensitivity: "accent",
          ignorePunctuation: true,
        })
      ),
    [table.getAllLeafColumns()]
  )
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
