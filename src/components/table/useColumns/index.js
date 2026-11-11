import { useMemo } from "react"
import Flex from "@/components/templates/flex"
import useRowSelection from "./useRowSelection"
import useRowActions from "./useRowActions"

export default (
  dataColumns,
  {
    rowActions,
    enableSelection,
    columnVisibility,
    singleRowSelection,
    enableResizing,
    enableSorting,
    testPrefix,
    tableMeta,
  }
) => {
  const rowActionsColumn = useRowActions(rowActions, { testPrefix, tableMeta })
  const selectionColumn = useRowSelection(enableSelection, {
    testPrefix,
    tableMeta,
    singleRowSelection,
  })

  return useMemo(() => {
    if (!dataColumns || dataColumns.length < 1) return []

    const actionHost =
      rowActionsColumn &&
      dataColumns
        .flatMap(column => column.columns || [column])
        .find(column => column.hasActions && columnVisibility?.[column.id] !== false)
    const Actions = rowActionsColumn?.cell
    const withActions = (column, minimum) => {
      if (column !== actionHost) return column
      const Cell = column.cell
      return {
        ...column,
        minSize: Math.max(column.minSize ?? minimum, rowActionsColumn.minSize),
        cell: props => (
          <Flex width="100%" alignItems="center">
            <Flex flex width={{ min: "0" }} overflow="hidden" alignItems={column.align || "center"}>
              {Cell ? <Cell {...props} /> : props.getValue()}
            </Flex>
            <Actions {...props} inline />
          </Flex>
        ),
      }
    }

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
              ...withActions(subCol, 60),
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
        ...(enableResizing ? { size: 120, maxSize: 5000, minSize: 10 } : {}),
        enableHiding: true,
        enableResizing,
        footer: props => props.column.id,
        tableMeta,
        ...withActions(col, 10),
        accessorKey: col.accessorKey || col.id,
      }
    })

    if (selectionColumn)
      dataColumns.unshift(
        isGrouped
          ? {
              id: "selectionColumn",
              isPlaceholder: true,
              size: selectionColumn.size,
              columns: [selectionColumn],
            }
          : selectionColumn
      )

    if (rowActionsColumn && !actionHost)
      dataColumns.push(
        isGrouped
          ? {
              id: "rowActionsColumn",
              isPlaceholder: true,
              size: rowActionsColumn.size,
              columns: [rowActionsColumn],
            }
          : rowActionsColumn
      )

    return dataColumns
  }, [
    dataColumns,
    rowActionsColumn,
    selectionColumn,
    columnVisibility,
    enableResizing,
    enableSorting,
    tableMeta,
  ])
}
