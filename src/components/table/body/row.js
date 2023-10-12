import React from "react"
import { flexRender } from "@tanstack/react-table"
import Flex from "@/components/templates/flex"
import { TextNano } from "@/components/typography"
import { Icon } from "@/components/icon"
import { useTableContext } from "../provider"

const makeSelectIsRowHovered = id => s => s.hoveredRow === id

const CellGroup = ({ cell, row, header, testPrefix, coloredSortedColumn }) => {
  const { column } = cell

  const tableMeta =
    typeof column.columnDef.tableMeta === "function"
      ? column.columnDef.tableMeta({}, column, row.index)
      : column.columnDef.tableMeta

  const meta =
    typeof column.columnDef.meta === "function"
      ? column.columnDef.meta({}, column, row.index)
      : column.columnDef.meta

  const cellStyles = {
    ...(tableMeta?.styles || {}),
    ...(meta?.styles || {}),
    ...(tableMeta?.cellStyles || {}),
    ...(meta?.cellStyles || {}),
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
      data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
      overflow="hidden"
      {...(cell.column.getCanSort() &&
        coloredSortedColumn &&
        !!cell.column.getIsSorted() && {
          background: "columnHighlight",
          backgroundOpacity: row.index % 2 === 0 ? "0.2" : "0.4",
        })}
      padding={[1]}
      {...cellStyles}
    >
      <Flex flex width="100%" alignItems={cell.column.columnDef.align || "start"}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
        {cell.getIsGrouped() && row.getCanExpand() && (
          <Flex
            cursor="pointer"
            role="button"
            padding={[0.5]}
            gap={0.5}
            onClick={e => {
              row.getToggleExpandedHandler()(e)
              setTimeout(() => e.target.scrollIntoView({ behavior: "smooth", block: "nearest" }))
            }}
            position="absolute"
            right={0}
            bottom="-2px"
          >
            <TextNano fontSize="10px" color="textLite">
              Expand
            </TextNano>
            <Icon
              name="chevron_down"
              width="12px"
              height="12px"
              color="textLite"
              rotate={row.getIsExpanded() ? 2 : null}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

const selectOnHover = s => s.onHover

export default ({
  disableClickRow,
  onClickRow,
  row,
  table,
  testPrefix,
  testPrefixCallback,
  index,
  ...rest
}) => {
  const onHover = useTableContext(selectOnHover)
  const isHovered = useTableContext(makeSelectIsRowHovered(row.index))

  return (
    <Flex
      data-testid={`netdata-table-row${testPrefix}${
        testPrefixCallback ? "-" + testPrefixCallback(row.original) : ""
      }`}
      onClick={
        row.getCanExpand() && !row.depth
          ? undefined
          : onClickRow
          ? () => onClickRow({ data: row.original, table: table, fullRow: row })
          : undefined
      }
      onMouseEnter={() => onHover({ hoveredRow: row.index })}
      onMouseLeave={() => onHover({ hoveredRow: null, hoveredColumn: null })}
      disableClickRow={() => disableClickRow?.({ data: row.original, table: table, fullRow: row })}
      flex
    >
      {!!row.getLeftVisibleCells().length && (
        <Flex
          position="sticky"
          left={0}
          border={{ side: "right" }}
          zIndex={11}
          basis={`${table.getLeftTotalSize()}px`}
          flex="grow"
          background={
            isHovered
              ? index % 2 === 0
                ? "tableRowBg2Hover"
                : "tableRowBgHover"
              : index % 2 === 0
              ? "tableRowBg2"
              : "tableRowBg"
          }
        >
          {row.getLeftVisibleCells().map((cell, index) => (
            <CellGroup
              cell={cell}
              row={row}
              key={cell.id}
              testPrefix={testPrefix}
              header={table.getLeftLeafHeaders()[index]}
              {...rest}
            />
          ))}
        </Flex>
      )}
      <Flex
        width={`${table.getCenterTotalSize()}px`}
        flex="grow"
        background={
          isHovered
            ? index % 2 === 0
              ? "tableRowBg2Hover"
              : "tableRowBgHover"
            : index % 2 === 0
            ? "tableRowBg2"
            : "tableRowBg"
        }
      >
        <Flex flex>
          {row.getCenterVisibleCells().map((cell, index) => (
            <CellGroup
              cell={cell}
              row={row}
              key={cell.id}
              testPrefix={testPrefix}
              header={table.getCenterLeafHeaders()[index]}
              {...rest}
            />
          ))}
        </Flex>
      </Flex>
      {!!row.getRightVisibleCells().length && (
        <Flex
          position="sticky"
          right={0}
          border={{ side: "left" }}
          zIndex={11}
          basis={`${table.getRightTotalSize()}px`}
          flex="grow"
          background={
            isHovered
              ? index % 2 === 0
                ? "tableRowBg2Hover"
                : "tableRowBgHover"
              : index % 2 === 0
              ? "tableRowBg2"
              : "tableRowBg"
          }
        >
          {row.getRightVisibleCells().map((cell, index) => (
            <CellGroup
              cell={cell}
              row={row}
              key={cell.id}
              testPrefix={testPrefix}
              header={table.getRightLeafHeaders()[index]}
              {...rest}
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
