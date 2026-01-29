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
import { Handler } from "./resizeHandler"
import DragOverlay from "./dragOverlay"

const rerenderSelector = state => {
  const columns = state.allColumns || []

  return {
    sizing: state.columnSizing,
    expanded: state.expanded,
    columnVisibility: state.columnVisibility,
    selectedRows: state.selectedRows,
    grouping: state.grouping,
    columnsCount: columns.length,
    columnsFilters: columns.map(({ columnDef }) => columnDef?.meta?.filter?.options),
  }
}

const HeaderGroup = ({ id, headers, testPrefix, rowReverse, enableColumnReordering, ...rest }) => {
  const columnIds = useMemo(() => headers.map(h => h.column.id), [headers])

  const content = (
    <Flex
      id={id}
      data-testid={`netdata-table-headRow${testPrefix}`}
      flex
      background="tableRowBg"
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
      {...(side === "right"
        ? {
            right: 0,
            border: { side: "left" },
          }
        : { left: 0, border: { side: "right" } })}
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
  ${Handler} {
    display: none;
  }

  &:hover ${Handler} {
    display: block;
  }

  &:hover .drag-handle {
    opacity: 1;
  }
`

const BodyHeader = memo(({ table, testPrefix, enableColumnReordering, ...rest }) => {
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

  const headerContent = (
    <HeaderRow
      data-testid={`netdata-table-head${testPrefix}`}
      flex
      border={{
        size: "1px",
        type: "solid",
        side: "bottom",
        color: "border",
      }}
    >
      <HeaderGroups
        groups={table.getLeftHeaderGroups()}
        side="left"
        size={table.getLeftTotalSize()}
        testPrefix={testPrefix}
        {...rest}
        flex={false}
        table={table}
        enableColumnReordering={enableColumnReordering}
      />
      <HeaderGroups
        groups={table.getCenterHeaderGroups()}
        size={table.getCenterTotalSize()}
        testPrefix={testPrefix}
        {...rest}
        table={table}
        enableColumnReordering={enableColumnReordering}
      />
      <HeaderGroups
        groups={table.getRightHeaderGroups()}
        side="right"
        size={table.getRightTotalSize()}
        testPrefix={testPrefix}
        {...rest}
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
      <DragOverlay activeColumn={activeColumn} />
    </DndContext>
  )
})

export default BodyHeader
