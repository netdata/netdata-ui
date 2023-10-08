import React from "react"
import styled from "styled-components"
import { flexRender } from "@tanstack/react-table"
import Flex from "src/components/templates/flex"
import ResizeHandler from "./resizeHandler"
import Sorting, { SortIconContainer } from "./sorting"
import Info from "./info"
import Filter from "./filter"

const LabelContainer = styled(Flex)`
  &:hover ${SortIconContainer} {
    visibility: visible;
  }
`

const BodyHeaderCell = ({ header, table, testPrefix, coloredSortedColumn, index }) => {
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
      basis={`${column.getSize()}px`}
      padding={[1]}
      {...(coloredSortedColumn && !!column.getIsSorted() && { background: "columnHighlight" })}
      position="relative"
      {...headStyles}
      column
    >
      <LabelContainer
        alignItems="center"
        cursor={column.getCanSort() ? "pointer" : "default"}
        onClick={column.getCanSort() ? column.getToggleSortingHandler() : undefined}
      >
        <Sorting sortable={column.getCanSort()} sorting={column.getIsSorted()} />
        {column.isPlaceholder ? null : flexRender(column.columnDef.header, header.getContext())}
      </LabelContainer>
      <Filter column={column} testPrefix={testPrefix} index={index} />
      <Info meta={meta} />
      <ResizeHandler header={header} table={table} />
    </Flex>
  )
}

export default BodyHeaderCell
