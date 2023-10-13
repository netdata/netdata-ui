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
  transition: transform 200ms ease;
  ${({ sorting }) => sorting && "transform: translateX(12px);"}
  ${({ sortable }) =>
    sortable &&
    `
    &:hover {
      transform: translateX(12px);
    }
  `}
`

const LabelContainer = styled(Flex)`
  &:hover ${SortIconContainer} {
    opacity: 1;
  }
`

const rerenderSelector = state => ({ sorting: state.sorting, sizing: state.columnSizing })

const BodyHeaderCell = ({ header, table, testPrefix, coloredSortedColumn, index }) => {
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
      width={`${column.getSize()}px`}
      position="relative"
      {...(column.getCanSort() &&
        coloredSortedColumn &&
        !!column.getIsSorted() && {
          background: "columnHighlight",
          backgroundOpacity: "0.2",
        })}
      padding={[1, 2]}
      {...headStyles}
      column
    >
      <Flex
        flex
        column
        width="100%"
        alignItems={column.columnDef.align || "start"}
        overflow="hidden"
      >
        <LabelContainer
          alignItems="center"
          cursor={column.getCanSort() ? "pointer" : "default"}
          onClick={column.getCanSort() ? column.getToggleSortingHandler() : undefined}
          padding={[0, 2, 0, 0]}
        >
          <Sorting sortable={column.getCanSort()} sorting={column.getIsSorted()} />
          {column.isPlaceholder ? null : (
            <Label sorting={column.getIsSorted()} sortable={column.getCanSort()}>
              {flexRender(column.columnDef.header, header.getContext())}
            </Label>
          )}
        </LabelContainer>
        <Filter column={column} testPrefix={testPrefix} index={index} />
      </Flex>
      <Info meta={meta} />
      {!column.columnDef.fullWidth && <ResizeHandler header={header} table={table} />}
    </Flex>
  )
}

export default BodyHeaderCell
