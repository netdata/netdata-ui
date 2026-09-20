import React, { useRef, useMemo } from "react"
import useToggle from "@/hooks/useToggle"
import Tooltip from "@/components/drops/tooltip"
import { Button } from "@/components/button"
import BulkAction from "../action"
import ColumnsMenu from "./columnsMenu"
import { supportedBulkActions } from "../useActions"
import { useTableState } from "../../../provider"

const rerenderSelector = state => state.columnVisibility

const excludedById = {
  selectionColumn: true,
  rowActionsColumn: true,
}

const ColumnVisibilityAction = ({
  alwaysEnabled,
  buttonFlavour,
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
  const triggerDisabled = (!alwaysEnabled && selectedRows?.length < 1) || disabled

  const columnGroups = useMemo(() => {
    const groups = []

    table.getHeaderGroups().forEach(headerGroup => {
      headerGroup.headers.forEach(header => {
        if (excludedById[header.column.id]) return

        if (header.column.columns && header.column.columns.length > 0) {
          const groupColumns = header.column.columns.filter(col => col.getCanHide())
          if (groupColumns.length > 0) {
            groups.push({
              id: header.column.id,
              name:
                header.column.columnDef.name ||
                (typeof header.column.columnDef.headerString === "function"
                  ? header.column.columnDef.headerString()
                  : header.column.columnDef.headerString) ||
                header.column.id,
              columns: groupColumns,
            })
          }
        }
      })
    })

    return groups
  }, [table.getAllLeafColumns()])

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
      {buttonFlavour === "hollow" ? (
        visible !== false && (
          <Tooltip content={tooltipText}>
            <Button
              ref={actionRef}
              aria-label={tooltipText}
              aria-expanded={!!isOpen}
              data-ga={dataGa}
              data-testid={`netdata-table-action-${id}-bulk${testPrefix}-bulk`}
              disabled={triggerDisabled}
              flavour="hollow"
              icon={icon}
              onClick={event => {
                event.stopPropagation()
                handleAction(selectedRows, table)
              }}
              small
              type="button"
            />
          </Tooltip>
        )
      ) : (
        <BulkAction
          ref={actionRef}
          aria-label={tooltipText}
          aria-expanded={!!isOpen}
          testPrefix={`-bulk${testPrefix}`}
          visible={visible}
          id={id}
          icon={icon}
          handleAction={() => handleAction(selectedRows, table)}
          tooltipText={tooltipText}
          disabled={triggerDisabled}
          background="elementBackground"
          selectedRows={selectedRows}
          dataGa={dataGa}
          {...rest}
        />
      )}
      <ColumnsMenu
        columns={columns}
        columnGroups={columnGroups}
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
