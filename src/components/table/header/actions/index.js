import { memo, useState, useEffect, useRef } from "react"
import Flex from "@/components/templates/flex"
import { useTableState } from "../../provider"
import { isRowSelectable } from "../../largeDataSelection"
import useActions from "./useActions"
import Action from "./action"
import ActionTrack from "./track"
import ColumnVisibility from "./columnVisibility"

const noop = () => {}

const rerenderSelector = state => state.selectedRows

const fitsTrack = ({ label, CustomComponent, flavour }) =>
  !label && !CustomComponent && (!flavour || flavour === "borderless")

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
  columnVisibilityFlavour,
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

  const columnsInTrack = enableColumnVisibility && columnVisibilityFlavour !== "hollow"
  const columns = enableColumnVisibility && (
    <ColumnVisibility
      buttonFlavour={columnVisibilityFlavour}
      isVisible
      table={table}
      testPrefix={testPrefix}
      columnPinning={columnPinning}
      dataGa={dataGa}
      enableColumnPinning={enableColumnPinning}
      bulkChip={columnsInTrack}
    />
  )
  const visibleActions = actions.flatMap(({ isVisible, ...action }) => {
    const visible = typeof isVisible === "function" ? isVisible() : isVisible
    return visible === false ? [] : [action]
  })
  const trackedActions = visibleActions.filter(fitsTrack)
  const showTrack =
    columnsInTrack || trackedActions.length > 0 || (actions.length > 0 && selectedRows.length > 0)
  const renderAction = (action, bulkChip) => (
    <Action
      key={action.id}
      {...action}
      columnPinning={columnPinning}
      dataGa={dataGa}
      enableColumnPinning={enableColumnPinning}
      selectedRows={selectedRows}
      table={table}
      testPrefix={testPrefix}
      bulkChip={bulkChip}
    />
  )

  return (
    <Flex gap={0.5} data-testid="bulk-actions" justifyContent="end" alignItems="center">
      {showTrack && (
        <ActionTrack selectedCount={selectedRows.length}>
          {trackedActions.map(action => renderAction(action, true))}
          {columnsInTrack && columns}
        </ActionTrack>
      )}
      {visibleActions
        .filter(action => !fitsTrack(action))
        .map(action => renderAction(action, false))}
      {!columnsInTrack && columns}
    </Flex>
  )
}

export default memo(HeaderActions)
