import React, { memo, useMemo, useCallback } from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor } from "@/theme"
import { useTableState } from "../provider"

const CellGroup = ({ cell, row, header, testPrefix, coloredSortedColumn }) => {
  const { column } = cell

  const tableMeta = useMemo(
    () =>
      typeof column.columnDef.tableMeta === "function"
        ? column.columnDef.tableMeta({}, column, row.index)
        : column.columnDef.tableMeta,
    [column.columnDef.tableMeta, column, row.index]
  )

  const meta = useMemo(
    () =>
      typeof column.columnDef.meta === "function"
        ? column.columnDef.meta({}, column, row.index)
        : column.columnDef.meta,
    [column.columnDef.meta, column, row.index]
  )

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
      padding={[1.5, 2]}
      {...cellStyles}
    >
      <Flex flex width="100%" alignItems={cell.column.columnDef.align || "start"}>
        <cell.column.columnDef.cell {...cell.getContext()} />
      </Flex>
    </Flex>
  )
}

const rerenderSelector = state => ({
  sizing: state.columnSizing,
  expanded: state.expanded,
  columnVisibility: state.columnVisibility,
  selectedRows: state.selectedRows,
  allColumns: state.allColumns?.length,
})

const StyledRow = styled(Flex)`
  &:hover .row-content {
    background: ${getColor("tableRowBgHover")};
  }
`

export default memo(
  ({
    disableClickRow,
    onClickRow,
    row,
    table,
    testPrefix,
    testPrefixCallback,
    zIndex,
    onHoverCell,
    renderSubComponent,
    GroupRow,
    ...rest
  }) => {
    const { columnVisibility } = useTableState(rerenderSelector)

    const leftHeaders = useMemo(() => table.getLeftLeafHeaders(), [table, columnVisibility])
    const centerHeaders = useMemo(() => table.getCenterLeafHeaders(), [table, columnVisibility])
    const rightHeaders = useMemo(() => table.getRightLeafHeaders(), [table, columnVisibility])

    const isClickable = useMemo(() => {
      if (typeof onClickRow !== "function") return false

      return disableClickRow
        ? !disableClickRow({ data: row.original, table: table, fullRow: row })
        : true
    }, [row, onClickRow])

    return (
      <StyledRow
        data-testid={`netdata-table-row${testPrefix}${
          testPrefixCallback ? "-" + testPrefixCallback(row.original) : ""
        }`}
        data-id={row.original?.id || row.id}
        onClick={useCallback(
          e => {
            e.stopPropagation()

            if (row.getCanExpand()) {
              row.getToggleExpandedHandler()(e)
            } else if (isClickable) {
              onClickRow({ data: row.original, table: table, fullRow: row }, e)
            }
            setTimeout(() => e?.target?.scrollIntoView?.({ behavior: "auto", block: "nearest" }))
          },
          [isClickable, row, onClickRow]
        )}
        cursor={isClickable ? "pointer" : "default"}
        onMouseEnter={() => onHoverCell?.({ row: row.index })}
        onMouseLeave={() => onHoverCell?.({ row: null })}
        flex
        column
        background="tableRowBg"
        _hover={{
          background: "tableRowBgHover",
        }}
        border={{ side: "bottom" }}
      >
        {!!GroupRow && !!row.original.isGroup ? (
          <GroupRow row={row} {...row.original} />
        ) : (
          <Flex flex>
            {!!row.getLeftVisibleCells().length && (
              <Flex
                position="sticky"
                left={0}
                border={{ side: "right" }}
                zIndex={zIndex || 10}
                basis={`${table.getLeftTotalSize()}px`}
                flex={false}
                background="tableRowBg"
                _hover={{
                  background: "tableRowBgHover",
                }}
                className="row-content"
              >
                {row.getLeftVisibleCells().map((cell, index) => (
                  <CellGroup
                    cell={cell}
                    row={row}
                    key={cell.id}
                    testPrefix={testPrefix}
                    header={leftHeaders[index]}
                    {...rest}
                  />
                ))}
              </Flex>
            )}
            <Flex
              width={`${table.getCenterTotalSize()}px`}
              flex="grow"
              background="tableRowBg"
              _hover={{
                background: "tableRowBgHover",
              }}
              className="row-content"
            >
              <Flex flex>
                {row.getCenterVisibleCells().map((cell, index) => (
                  <CellGroup
                    cell={cell}
                    row={row}
                    key={cell.id}
                    testPrefix={testPrefix}
                    header={centerHeaders[index]}
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
                zIndex={zIndex || 10}
                basis={`${table.getRightTotalSize()}px`}
                flex={false}
                background="tableRowBg"
                _hover={{
                  background: "tableRowBgHover",
                }}
                rowReverse
                className="row-content"
              >
                {row.getRightVisibleCells().map((cell, index) => (
                  <CellGroup
                    cell={cell}
                    row={row}
                    key={cell.id}
                    testPrefix={testPrefix}
                    header={rightHeaders[index]}
                    {...rest}
                  />
                ))}
              </Flex>
            )}
          </Flex>
        )}
        {renderSubComponent && row.getIsExpanded() && !row.getIsGrouped() && (
          <Flex
            flex
            data-testid={`netdata-table-sub-row${testPrefix}${
              testPrefixCallback ? "-" + testPrefixCallback(row.original) : ""
            }`}
            onClick={e => e.stopPropagation()}
          >
            {renderSubComponent({ data: row.original, table, fullRow: row })}
          </Flex>
        )}
      </StyledRow>
    )
  }
)
