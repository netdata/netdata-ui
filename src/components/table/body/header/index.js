import React, { memo, useState, useMemo, useCallback } from "react"
import styled from "styled-components"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import Flex from "@/components/templates/flex"
import { useTableState } from "../../provider"
import Cell from "./cell"
import DragOverlay from "./dragOverlay"

const rerenderSelector = state => {
  const columns = state.allColumns || []

  return {
    sizing: state.columnSizing,
    pinning: state.columnPinning,
    expanded: state.expanded,
    columnVisibility: state.columnVisibility,
    selectedRows: state.selectedRows,
    grouping: state.grouping,
    columnsCount: columns.length,
    columnsFilters: columns.map(({ columnDef }) => columnDef?.meta?.filter?.options),
  }
}

const HeaderGroup = ({
  id,
  headers,
  testPrefix,
  rowReverse,
  enableColumnReordering,
  surface,
  endAtPinnedEdge,
  ...rest
}) => {
  const columnIds = useMemo(() => headers.map(h => h.column.id), [headers])
  const edgeHeader = endAtPinnedEdge ? headers.at(-1) : undefined

  const content = (
    <Flex
      id={id}
      data-testid={`netdata-table-headRow${testPrefix}`}
      flex
      background={surface}
      rowReverse={rowReverse}
    >
      {headers.map((header, index) => (
        <Cell
          key={header.id}
          index={index}
          {...rest}
          header={header}
          testPrefix={testPrefix}
          hasSubheaders={!!header.subHeaders.length}
          hideResizeDivider={header === edgeHeader}
          enableColumnReordering={
            enableColumnReordering && header.column.columnDef.enableReordering !== false
          }
        >
          {!!header.subHeaders.length && (
            <HeaderGroup
              headers={header.subHeaders}
              id={header.id}
              key={header.id}
              {...rest}
              enableColumnReordering={enableColumnReordering}
              surface={surface}
              endAtPinnedEdge={header === edgeHeader}
              isSubheader
            />
          )}
        </Cell>
      ))}
    </Flex>
  )

  if (!enableColumnReordering) {
    return content
  }

  return (
    <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
      {content}
    </SortableContext>
  )
}

const HeaderGroups = ({ groups, size, side, flex = "grow", enableColumnReordering, ...rest }) => {
  if (!groups[0].headers.length) return null

  return (
    <Flex
      position={side ? "sticky" : "relative"}
      {...(side === "right" ? { right: 0 } : side === "left" ? { left: 0 } : {})}
      data-table-pinned={side}
      zIndex={side ? 11 : undefined}
      width={`${size}px`}
      flex={flex}
      column
    >
      <HeaderGroup
        headers={groups[0].headers}
        id={groups[0].id}
        key={groups[0].id}
        {...rest}
        enableColumnReordering={enableColumnReordering}
      />
    </Flex>
  )
}

const HeaderRow = styled(Flex)`
  &:hover .drag-handle {
    opacity: 1;
  }
`

const BodyHeader = ({
  table,
  testPrefix,
  enableColumnReordering,
  surface = "tableHeaderBackground",
  ...rest
}) => {
  useTableState(rerenderSelector)

  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  )

  const activeColumn = useMemo(() => {
    if (!activeId) return null
    return table.getColumn(activeId)
  }, [activeId, table])

  const handleDragStart = useCallback(event => {
    setActiveId(event.active.id)
  }, [])

  const handleDragEnd = useCallback(
    event => {
      const { active, over } = event
      setActiveId(null)

      if (!active || !over || active.id === over.id) return

      const currentOrder = table.getState().columnOrder
      const allColumns = table.getAllLeafColumns()

      let columnOrder = currentOrder.length > 0 ? currentOrder : allColumns.map(c => c.id)

      const oldIndex = columnOrder.indexOf(active.id)
      const newIndex = columnOrder.indexOf(over.id)

      if (oldIndex === -1 || newIndex === -1) return

      const activeColumn = table.getColumn(active.id)
      const overColumn = table.getColumn(over.id)
      if (activeColumn?.getIsPinned() !== overColumn?.getIsPinned()) return

      const newOrder = arrayMove(columnOrder, oldIndex, newIndex)
      table.setColumnOrder(newOrder)
    },
    [table]
  )

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const hasRightColumns = !!table.getRightVisibleLeafColumns().length
  const hasCenterColumns = !!table.getCenterVisibleLeafColumns().length
  const headerContent = (
    <HeaderRow
      data-testid={`netdata-table-head${testPrefix}`}
      background={surface}
      flex
      border={{
        size: "1px",
        type: "solid",
        side: "bottom",
        color: "tableBorder",
      }}
    >
      <HeaderGroups
        groups={table.getLeftHeaderGroups()}
        side="left"
        endAtPinnedEdge={hasCenterColumns || hasRightColumns}
        size={table.getLeftTotalSize()}
        testPrefix={testPrefix}
        {...rest}
        surface={surface}
        flex={false}
        table={table}
        enableColumnReordering={enableColumnReordering}
      />
      <HeaderGroups
        groups={table.getCenterHeaderGroups()}
        endAtPinnedEdge={hasRightColumns}
        size={table.getCenterTotalSize()}
        testPrefix={testPrefix}
        {...rest}
        surface={surface}
        table={table}
        enableColumnReordering={enableColumnReordering}
      />
      <HeaderGroups
        groups={table.getRightHeaderGroups()}
        side="right"
        size={table.getRightTotalSize()}
        testPrefix={testPrefix}
        {...rest}
        surface={surface}
        flex={false}
        table={table}
        enableColumnReordering={enableColumnReordering}
        rowReverse
      />
    </HeaderRow>
  )

  if (!enableColumnReordering) {
    return headerContent
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {headerContent}
      <DragOverlay activeColumn={activeColumn} surface={surface} />
    </DndContext>
  )
}

export default memo(BodyHeader)
