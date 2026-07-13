import React, { memo, useState, useEffect, useRef } from "react"
import Flex from "@/components/templates/flex"
import { useTableState } from "../../provider"
import { isRowSelectable } from "../../largeDataSelection"
import useActions from "./useActions"
import Action from "./action"
import ColumnVisibility from "./columnVisibility"

const noop = () => {}

const rerenderSelector = state => state.selectedRows

const useSelectedRowsObserver = (table, { onRowSelected = noop, rowSelection }) => {
  useTableState(rerenderSelector)
  const [selectedRows, setActualSelectedRows] = useState([])
  const onRowSelectedRef = useRef(onRowSelected)
  onRowSelectedRef.current = onRowSelected

  useEffect(() => {
    const selected = table.getSelectedOriginalRows
      ? table.getSelectedOriginalRows()
      : table.getSelectedRowModel().flatRows.reduce((acc, { original }) => {
          if (!isRowSelectable(original)) return acc

          acc.push(original)
          return acc
        }, [])

    setActualSelectedRows(selected)
    onRowSelectedRef.current(selected)
  }, [rowSelection, table, table.largeDataSource])

  return selectedRows
}

const HeaderActions = ({
  bulkActions,
  columnPinning,
  dataGa,
  enableColumnVisibility,
  enableColumnPinning,
  table,
  testPrefix,
  onRowSelected,
  rowSelection,
}) => {
  const selectedRows = useSelectedRowsObserver(table, { onRowSelected, rowSelection })

  const actions = useActions(bulkActions)

  if (!actions.length && !enableColumnVisibility) return null

  return (
    <Flex gap={0.5} data-testid="bulk-actions" justifyContent="end">
      {actions.map(action => (
        <Action
          key={action.id}
          {...action}
          columnPinning={columnPinning}
          dataGa={dataGa}
          enableColumnPinning={enableColumnPinning}
          selectedRows={selectedRows}
          table={table}
          testPrefix={testPrefix}
        />
      ))}
      <ColumnVisibility
        isVisible={enableColumnVisibility}
        table={table}
        testPrefix={testPrefix}
        columnPinning={columnPinning}
        dataGa={dataGa}
        enableColumnPinning={enableColumnPinning}
      />
    </Flex>
  )
}

export default memo(HeaderActions)
