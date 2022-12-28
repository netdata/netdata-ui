import { useMemo } from "react"
import useRowSelection from "./useRowSelection"
import useRowActions from "./useRowActions"

export default (dataColumns, { rowActions, enableSelection, testPrefix }) => {
  const rowActionsColumn = useRowActions(rowActions, { testPrefix })
  const selectionColumn = useRowSelection(enableSelection, { testPrefix })

  return useMemo(() => {
    if (!dataColumns || dataColumns.length < 1) return []

    dataColumns = dataColumns.map((col, index) => {
      if (!col.id) throw new Error(`Please provide id at ${index}`)

      return {
        enableColumnFilter: false,
        enableGlobalFilter: true,
        enableSorting: true,
        size: 150,
        maxSize: 5000,
        minSize: 150,
        enableHiding: true,
        enableResize: true,
        footer: props => props.column.id,
        ...col,
        accessorKey: col.accessorKey || col.id,
      }
    })

    if (selectionColumn) dataColumns.unshift(selectionColumn)
    if (rowActionsColumn) dataColumns.push(rowActionsColumn)

    return dataColumns
  }, [dataColumns, rowActionsColumn, selectionColumn])
}
