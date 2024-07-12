import { useMemo } from "react"
import useRowSelection from "./useRowSelection"
import useRowActions from "./useRowActions"

export default (
  dataColumns,
  { rowActions, enableSelection, enableResizing, enableSorting, testPrefix, tableMeta }
) => {
  const rowActionsColumn = useRowActions(rowActions, { testPrefix, tableMeta })
  const selectionColumn = useRowSelection(enableSelection, { testPrefix, tableMeta })

  return useMemo(() => {
    if (!dataColumns || dataColumns.length < 1) return []

    let isGrouped = false

    dataColumns = dataColumns.map((col, index) => {
      if (Array.isArray(col.columns)) {
        isGrouped = true

        return {
          id: index,
          ...col,
          columns: col.columns.map((subCol, index) => {
            if (!subCol.id) throw new Error(`Please provide id at ${index}`)

            return {
              enableColumnFilter: false,
              enableGlobalFilter: true,
              enableSorting,
              enableMultiSort: enableSorting,
              ...(enableResizing ? { size: 120, maxSize: 5000, minSize: 60 } : {}),
              enableHiding: true,
              enableResizing,
              footer: props => props.column.id,
              tableMeta,
              ...subCol,
              accessorKey: subCol.accessorKey || subCol.id,
            }
          }),
        }
      }

      if (!col.id) throw new Error(`Please provide id at ${index}`)

      return {
        enableColumnFilter: false,
        enableGlobalFilter: true,
        enableSorting,
        enableMultiSort: enableSorting,
        ...(enableResizing ? { size: 120, maxSize: 5000, minSize: 60 } : {}),
        enableHiding: true,
        enableResizing,
        footer: props => props.column.id,
        tableMeta,
        ...col,
        accessorKey: col.accessorKey || col.id,
      }
    })

    if (selectionColumn)
      dataColumns.unshift(
        isGrouped ? { id: "selectionColumn", columns: selectionColumn } : selectionColumn
      )
    if (rowActionsColumn)
      dataColumns.push(
        isGrouped ? { id: "rowActionsColumn", columns: rowActionsColumn } : rowActionsColumn
      )

    return dataColumns
  }, [dataColumns, rowActionsColumn, selectionColumn])
}
