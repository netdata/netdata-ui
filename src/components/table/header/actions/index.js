import React, { memo, useState, useEffect } from "react"
import Flex from "src/components/templates/flex"
import useActions from "./useActions"
import Action from "./action"
import ColumnVisibility from "./columnVisibility"

const noop = () => {}

const useSelectedRowsObserver = (table, { onRowSelected = noop, rowSelection }) => {
  const [selectedRows, setActualSelectedRows] = useState([])

  useEffect(() => {
    const { flatRows } = table.getSelectedRowModel()
    if (flatRows) {
      const selected = flatRows.reduce((acc, { original }) => {
        if (original?.disabled) return acc

        acc.push(original)
        return acc
      }, [])
      setActualSelectedRows(selected)
      onRowSelected(selected)
    }
  }, [rowSelection, table])

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
    <Flex gap={1} data-testid="bulk-actions" width="100%" justifyContent="end">
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
