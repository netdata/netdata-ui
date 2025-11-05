import React from "react"
import styled from "styled-components"
import { flexRender } from "@tanstack/react-table"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { useTableState } from "../../provider"
import ResizeHandler from "./resizeHandler"
import Sorting, { SortIconContainer } from "./sorting"
import Info from "./info"
import Filter from "./filter"

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

const BodyHeaderCell = ({
  header,
  table,
  testPrefix,
  coloredSortedColumn,
  index,
  children,
  isSubheader,
  hasSubheaders,
}) => {
  useTableState(rerenderSelector)

  const { column } = header
  const tableMeta =
    typeof column.columnDef.tableMeta === "function"
      ? column.columnDef.tableMeta({}, column, index)
      : column.columnDef.tableMeta

  const meta =
    typeof column.columnDef.meta === "function"
      ? column.columnDef.meta({}, column, index)
      : column.columnDef.meta

  const headStyles = {
    ...(tableMeta?.styles || {}),
    ...(meta?.styles || {}),
    ...(tableMeta?.headStyles || {}),
    ...(meta?.headStyles || {}),
  }

  return (
    <Flex
      flex={
        !column.columnDef.fullWidth && (column.columnDef.notFlex || column.getCanResize())
          ? false
          : header.colSpan
      }
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
          cursor={column.getCanSort() ? "pointer" : "default"}
          onClick={column.getCanSort() ? column.getToggleSortingHandler() : undefined}
          padding={[0, 0, 0, !hasSubheaders || isSubheader ? 0 : 2]}
          overflow="hidden"
          width="100%"
        >
          {column.isPlaceholder ? null : (
            <Label
              as={column.columnDef.labelAs}
              {...column.columnDef.labelProps}
              sorting={column.getIsSorted()}
              sortable={column.getCanSort()}
            >
              {flexRender(column.columnDef.header, header.getContext())}
            </Label>
          )}
          <Sorting sortable={column.getCanSort()} sorting={column.getIsSorted()} />
          <Info meta={meta} />
        </LabelContainer>
        <Filter column={column} testPrefix={testPrefix} index={index} />
      </Flex>
      <ResizeHandler header={header} table={table} />
      {children}
    </Flex>
  )
}

export default BodyHeaderCell
