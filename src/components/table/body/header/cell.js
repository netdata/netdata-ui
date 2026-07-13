import React from "react"
import styled from "styled-components"
import { flexRender } from "@tanstack/react-table"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { useTableState } from "../../provider"
import ResizeHandler from "./resizeHandler"
import getColumnFlex from "../columnFlex"
import Sorting, { SortIconContainer } from "./sorting"
import Info from "./info"
import Filter from "./filter"
import useSortableHeader from "./sortableHeader"
import DragHandle, { tableHeaderDragHandleSelector } from "./dragHandle"

const Label = styled(Text)`
  width: 100%;

  * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const LabelContainer = styled(Flex)`
  &:hover ${SortIconContainer} {
    opacity: 1;
  }
`

const rerenderSelector = state => ({
  sorting: state.sorting,
  sizing: state.columnSizing,
  selecting: state.selectedRows,
})

export const getHeaderTooltipContent = columnDef => {
  const headerString =
    typeof columnDef.headerString === "function" ? columnDef.headerString() : columnDef.headerString

  if (headerString != null) return String(headerString)
  if (typeof columnDef.header === "string") return columnDef.header
  if (columnDef.header != null) return ""
  return undefined
}

const getAccessibleHeaderLabel = (content, canSort, sorting) => {
  if (!content) return undefined
  if (!canSort) return content
  if (sorting === "asc") return `${content}, sorted ascending`
  if (sorting === "desc") return `${content}, sorted descending`
  return `${content}, sortable, not sorted`
}

const BodyHeaderCell = ({
  header,
  table,
  testPrefix,
  coloredSortedColumn,
  index,
  children,
  isSubheader,
  hasSubheaders,
  enableColumnReordering,
}) => {
  useTableState(rerenderSelector)

  const { column } = header
  const { sortableRef, sortableStyle, dragHandleProps, isDragging } = useSortableHeader(
    column.id,
    enableColumnReordering
  )

  const tableMeta =
    typeof column.columnDef.tableMeta === "function"
      ? column.columnDef.tableMeta({}, column, index)
      : column.columnDef.tableMeta

  const meta =
    typeof column.columnDef.meta === "function"
      ? column.columnDef.meta({}, column, index)
      : column.columnDef.meta

  const headerTooltipContent = getHeaderTooltipContent(column.columnDef)
  const canSort = column.getCanSort()
  const sorting = column.getIsSorted()
  const toggleSorting = canSort ? column.getToggleSortingHandler() : undefined
  const {
    "aria-label": labelAriaLabel,
    onKeyDown: labelOnKeyDown,
    role: labelRole,
    tabIndex: labelTabIndex,
    ...labelProps
  } = column.columnDef.labelProps || {}

  const handleSortingClick = event => {
    if (
      event.defaultPrevented ||
      (event.target instanceof Element && event.target.closest(tableHeaderDragHandleSelector))
    )
      return
    toggleSorting?.(event)
  }

  const handleSortingKeyDown = event => {
    labelOnKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return
    event.preventDefault()
    toggleSorting?.(event)
  }

  const headStyles = {
    ...(tableMeta?.styles || {}),
    ...(meta?.styles || {}),
    ...(tableMeta?.headStyles || {}),
    ...(meta?.headStyles || {}),
  }

  return (
    <Flex
      ref={sortableRef}
      style={enableColumnReordering ? sortableStyle : undefined}
      flex={getColumnFlex(column, header, table.getState().columnSizing?.[column.id] != null)}
      width={`${header.subHeaders.length ? header.subHeaders.reduce((s, h) => s + h.column.getSize(), 0) : column.getSize()}px`}
      height={{ min: "45px" }}
      position="relative"
      {...(column.getCanSort() &&
        coloredSortedColumn &&
        !!column.getIsSorted() && {
          background: "columnHighlight",
          backgroundOpacity: "0.2",
        })}
      padding={!hasSubheaders || isSubheader ? [1, 2] : [0]}
      {...headStyles}
      column
    >
      <Flex
        flex
        column
        width="100%"
        alignItems={column.columnDef.align || "start"}
        justifyContent="center"
        gap={1}
      >
        <LabelContainer
          data-testid="netdata-table-header-cell-label-container"
          alignItems="center"
          cursor={canSort ? "pointer" : "default"}
          onClick={canSort ? handleSortingClick : undefined}
          padding={[0, 0, 0, !hasSubheaders || isSubheader ? 0 : 2]}
          overflow="hidden"
          width="100%"
        >
          <DragHandle dragHandleProps={dragHandleProps} visible={isDragging} />
          {column.isPlaceholder ? null : (
            <Label
              as={column.columnDef.labelAs}
              {...labelProps}
              role={labelRole ?? (canSort ? "button" : undefined)}
              tabIndex={labelTabIndex ?? (headerTooltipContent || canSort ? 0 : undefined)}
              aria-label={
                labelAriaLabel ?? getAccessibleHeaderLabel(headerTooltipContent, canSort, sorting)
              }
              onKeyDown={canSort ? handleSortingKeyDown : labelOnKeyDown}
              data-table-header-tooltip={headerTooltipContent}
              sorting={sorting}
              sortable={canSort}
              strong
            >
              {flexRender(column.columnDef.header, header.getContext())}
            </Label>
          )}
          <Sorting sortable={canSort} sorting={sorting} />
          <Info meta={meta} />
        </LabelContainer>
        <Filter column={column} testPrefix={testPrefix} index={index} />
      </Flex>
      <ResizeHandler header={header} table={table} testPrefix={testPrefix} />
      {children}
    </Flex>
  )
}

export default BodyHeaderCell
