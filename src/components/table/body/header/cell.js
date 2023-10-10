import React from "react"
import styled from "styled-components"
import { flexRender } from "@tanstack/react-table"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"
import useIntersection from "src/hooks/use-intersection"
import ResizeHandler from "./resizeHandler"
import Sorting, { SortIconContainer } from "./sorting"
import Info from "./info"
import Filter from "./filter"

const Label = styled(Text)`
  transition: transform 200ms ease;
  ${({ sorting }) => sorting && "transform: translateX(10px);"}
`

const LabelContainer = styled(Flex)`
  &:hover ${SortIconContainer} {
    opacity: 1;
  }
  &:hover ${Label} {
    transform: translateX(10px);
  }
`

const BodyHeaderCell = ({ header, table, testPrefix, coloredSortedColumn, index }) => {
  const [setRef, , visible] = useIntersection({
    rootMargin: "100% 0% 100% 0%",
    threshold: 0,
  })

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
      ref={setRef}
      flex={
        !column.columnDef.fullWidth && (column.columnDef.notFlex || column.getCanResize())
          ? false
          : header.colSpan
      }
      width={`${column.getSize()}px`}
      padding={[1]}
      {...(coloredSortedColumn && !!column.getIsSorted() && { background: "columnHighlight" })}
      position="relative"
      {...headStyles}
      column
      overflow="hidden"
    >
      {visible && (
        <>
          <LabelContainer
            alignItems="center"
            cursor={column.getCanSort() ? "pointer" : "default"}
            onClick={column.getCanSort() ? column.getToggleSortingHandler() : undefined}
            padding={[0, 2, 0, 0]}
          >
            <Sorting sortable={column.getCanSort()} sorting={column.getIsSorted()} />
            {column.isPlaceholder ? null : (
              <Label truncate sorting={column.getIsSorted()}>
                {flexRender(column.columnDef.header, header.getContext())}
              </Label>
            )}
          </LabelContainer>
          <Filter column={column} testPrefix={testPrefix} index={index} />
          <Info meta={meta} />
          {!column.columnDef.fullWidth && <ResizeHandler header={header} table={table} />}
        </>
      )}
    </Flex>
  )
}

export default BodyHeaderCell
