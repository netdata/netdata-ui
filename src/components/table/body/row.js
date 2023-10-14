import React, { memo, useMemo, useCallback } from "react"
import Flex from "@/components/templates/flex"
import { TextNano } from "@/components/typography"
import { Icon } from "@/components/icon"
import { useTableState } from "../provider"

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
      padding={[1, 2]}
      {...cellStyles}
    >
      <Flex flex width="100%" alignItems={cell.column.columnDef.align || "start"}>
        <cell.column.columnDef.cell {...cell.getContext()} />
        {cell.getIsGrouped() && row.getCanExpand() && (
          <Flex
            cursor="pointer"
            role="button"
            padding={[0.5]}
            gap={0.5}
            onClick={e => {
              e.stopPropagation()
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

const rerenderSelector = state => ({
  sizing: state.columnSizing,
  expanded: state.expanded,
  columnVisibility: state.columnVisibility,
  selectedRows: state.selectedRows,
})

export default memo(
  ({
    disableClickRow,
    onClickRow,
    row,
    table,
    testPrefix,
    testPrefixCallback,
    index,
    zIndex,
    onHoverCell,
    ...rest
  }) => {
    useTableState(rerenderSelector)

    const isClickable = useMemo(() => {
      if (typeof onClickRow !== "function") return false
      return disableClickRow
        ? !disableClickRow({ data: row.original, table: table, fullRow: row })
        : true
    }, [row, onClickRow])

    return (
      <Flex
        data-testid={`netdata-table-row${testPrefix}${
          testPrefixCallback ? "-" + testPrefixCallback(row.original) : ""
        }`}
        onClick={useCallback(
          isClickable
            ? () => onClickRow({ data: row.original, table: table, fullRow: row })
            : undefined,
          [isClickable, row, onClickRow]
        )}
        cursor={isClickable ? "pointer" : "default"}
        onMouseEnter={() => onHoverCell?.({ row: row.index })}
        onMouseLeave={() => onHoverCell?.({ row: null })}
        flex
      >
        {!!row.getLeftVisibleCells().length && (
          <Flex
            position="sticky"
            left={0}
            border={{ side: "right" }}
            zIndex={zIndex || 1}
            basis={`${table.getLeftTotalSize()}px`}
            flex="grow"
            background={index % 2 === 0 ? "tableRowBg2" : "tableRowBg"}
            _hover={{
              background: index % 2 === 0 ? "tableRowBg2Hover" : "tableRowBgHover",
            }}
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
          background={index % 2 === 0 ? "tableRowBg2" : "tableRowBg"}
          _hover={{
            background: index % 2 === 0 ? "tableRowBg2Hover" : "tableRowBgHover",
          }}
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
            zIndex={zIndex || 1}
            basis={`${table.getRightTotalSize()}px`}
            flex="grow"
            background={index % 2 === 0 ? "tableRowBg2" : "tableRowBg"}
            _hover={{
              background: index % 2 === 0 ? "tableRowBg2Hover" : "tableRowBgHover",
            }}
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
)
