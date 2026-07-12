import React, { memo, useMemo, useCallback } from "react"
import styled, { useTheme } from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor, getRgbColor } from "@/theme"
import { useTableState } from "../provider"
import getColumnFlex from "./columnFlex"

const CellGroup = ({
  cell,
  row,
  table,
  header,
  testPrefix,
  coloredSortedColumn,
  directCellContent,
}) => {
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
  const content = <cell.column.columnDef.cell {...cell.getContext()} row={row} />

  return (
    <Flex
      flex={getColumnFlex(column, header, table.getState().columnSizing?.[column.id] != null)}
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
      alignItems={directCellContent ? cell.column.columnDef.align || "start" : undefined}
      {...cellStyles}
    >
      {directCellContent ? (
        content
      ) : (
        <Flex flex width="100%" alignItems={cell.column.columnDef.align || "start"}>
          {content}
        </Flex>
      )}
    </Flex>
  )
}

const alignment = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  baseline: "baseline",
  stretch: "stretch",
}

const getFlexStyle = value => {
  if (value === true) return "1 1 auto"
  if (value === false) return "0 0 auto"
  if (value === "grow") return "1 0 auto"
  if (value === "shrink") return "0 1 auto"
  if (typeof value === "number") return `${value} 0 auto`
  return value
}

const getInlineCellStyles = (styles, theme) => {
  const result = { ...styles }

  if (styles.alignItems) result.alignItems = alignment[styles.alignItems] || styles.alignItems
  if (styles.justifyContent) {
    result.justifyContent = alignment[styles.justifyContent] || styles.justifyContent
  }
  if (styles.flex !== undefined) result.flex = getFlexStyle(styles.flex)
  if (typeof styles.width === "number") {
    result.width = `${styles.width * theme.constants.SIZE_SUB_UNIT}px`
  }
  if (typeof styles.height === "number") {
    result.height = `${styles.height * theme.constants.SIZE_SUB_UNIT}px`
  }
  if (Array.isArray(styles.padding)) {
    result.padding = styles.padding
      .map(value => `${value * theme.constants.SIZE_SUB_UNIT}px`)
      .join(" ")
  }
  if (styles.background) {
    result.backgroundColor = styles.backgroundOpacity
      ? getRgbColor(styles.background, styles.backgroundOpacity)({ theme })
      : getColor(styles.background)({ theme })
    delete result.background
    delete result.backgroundOpacity
  }

  return result
}

const DirectCellGroup = ({ cell, row, table, header, testPrefix, coloredSortedColumn, theme }) => {
  const { column } = cell
  const tableMeta =
    typeof column.columnDef.tableMeta === "function"
      ? column.columnDef.tableMeta({}, column, row.index)
      : column.columnDef.tableMeta
  const meta =
    typeof column.columnDef.meta === "function"
      ? column.columnDef.meta({}, column, row.index)
      : column.columnDef.meta
  const cellStyles = getInlineCellStyles(
    {
      ...(tableMeta?.styles || {}),
      ...(meta?.styles || {}),
      ...(tableMeta?.cellStyles || {}),
      ...(meta?.cellStyles || {}),
    },
    theme
  )
  const sorted = column.getCanSort() && coloredSortedColumn && column.getIsSorted()

  return (
    <div
      data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
      style={{
        display: "flex",
        boxSizing: "border-box",
        flex: getFlexStyle(
          getColumnFlex(column, header, table.getState().columnSizing?.[column.id] != null)
        ),
        width: `${column.getSize()}px`,
        position: "relative",
        overflow: "hidden",
        padding: `${theme.constants.SIZE_SUB_UNIT * 1.5}px ${theme.constants.SIZE_SUB_UNIT * 2}px`,
        alignItems: alignment[column.columnDef.align] || "flex-start",
        backgroundColor: sorted
          ? getRgbColor("columnHighlight", row.index % 2 === 0 ? 0.2 : 0.4)({ theme })
          : undefined,
        ...cellStyles,
      }}
    >
      <cell.column.columnDef.cell {...cell.getContext()} row={row} />
    </div>
  )
}

const rerenderSelector = state => ({
  sizing: state.columnSizing,
  expanded: state.expanded,
  columnVisibility: state.columnVisibility,
  selectedRows: state.selectedRows,
  allColumns: state.allColumns?.length,
  visibleColumns: state.visibleColumns,
})

const StyledRow = styled(Flex)`
  &:hover .row-content {
    background: ${getColor("mainBackgroundHover")};
  }
`

const DirectStyledRow = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  background-color: ${getColor("mainBackground")};
  border-bottom: 1px solid ${getColor("border")};

  &:hover,
  &:hover .row-content {
    background: ${getColor("mainBackgroundHover")};
  }
`

const TableRow = ({
  disableClickRow,
  onClickRow,
  row: tableRow,
  logicalIndex,
  table,
  testPrefix,
  testPrefixCallback,
  zIndex,
  onHoverCell,
  renderSubComponent,
  GroupRow,
  directCellContent,
  ...rest
}) => {
  useTableState(rerenderSelector)
  const theme = useTheme()
  const row = useMemo(
    () =>
      logicalIndex == null || logicalIndex === tableRow.index
        ? tableRow
        : { ...tableRow, index: logicalIndex },
    [logicalIndex, tableRow]
  )

  const isClickable = useMemo(() => {
    if (typeof onClickRow !== "function") return false

    return disableClickRow
      ? !disableClickRow({ data: row.original, table: table, fullRow: row })
      : true
  }, [row, onClickRow])

  const onClick = useCallback(
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
  )

  const rowContent =
    !!GroupRow && !!row.original.isGroup ? (
      <GroupRow row={row} {...row.original} />
    ) : directCellContent ? (
      <div style={{ display: "flex", flex: "1 1 auto" }}>
        {!!row.getLeftVisibleCells().length && (
          <div
            className="row-content"
            style={{
              display: "flex",
              position: "sticky",
              left: 0,
              borderRight: `1px solid ${getColor("border")({ theme })}`,
              zIndex: zIndex || 10,
              flex: `0 0 ${table.getLeftTotalSize()}px`,
              backgroundColor: getColor("mainBackground")({ theme }),
            }}
          >
            {row.getLeftVisibleCells().map((cell, index) => (
              <DirectCellGroup
                cell={cell}
                row={row}
                table={table}
                key={cell.id}
                testPrefix={testPrefix}
                header={table.getLeftLeafHeaders()[index]}
                coloredSortedColumn={rest.coloredSortedColumn}
                theme={theme}
              />
            ))}
          </div>
        )}
        <div
          className="row-content"
          style={{
            display: "flex",
            width: `${table.getCenterTotalSize()}px`,
            flex: "1 0 auto",
            backgroundColor: getColor("mainBackground")({ theme }),
          }}
        >
          {row.getCenterVisibleCells().map((cell, index) => (
            <DirectCellGroup
              cell={cell}
              row={row}
              table={table}
              key={cell.id}
              testPrefix={testPrefix}
              header={table.getCenterLeafHeaders()[index]}
              coloredSortedColumn={rest.coloredSortedColumn}
              theme={theme}
            />
          ))}
        </div>
        {!!row.getRightVisibleCells().length && (
          <div
            className="row-content"
            style={{
              display: "flex",
              position: "sticky",
              right: 0,
              borderLeft: `1px solid ${getColor("border")({ theme })}`,
              zIndex: zIndex || 10,
              flex: `0 0 ${table.getRightTotalSize()}px`,
              flexDirection: "row-reverse",
              backgroundColor: getColor("mainBackground")({ theme }),
            }}
          >
            {row.getRightVisibleCells().map((cell, index) => (
              <DirectCellGroup
                cell={cell}
                row={row}
                table={table}
                key={cell.id}
                testPrefix={testPrefix}
                header={table.getRightLeafHeaders()[index]}
                coloredSortedColumn={rest.coloredSortedColumn}
                theme={theme}
              />
            ))}
          </div>
        )}
      </div>
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
            background="mainBackground"
            _hover={{
              background: "mainBackgroundHover",
            }}
            className="row-content"
          >
            {row.getLeftVisibleCells().map((cell, index) => (
              <CellGroup
                cell={cell}
                row={row}
                table={table}
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
          background="mainBackground"
          _hover={{
            background: "mainBackgroundHover",
          }}
          className="row-content"
        >
          <Flex flex>
            {row.getCenterVisibleCells().map((cell, index) => (
              <CellGroup
                cell={cell}
                row={row}
                table={table}
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
            zIndex={zIndex || 10}
            basis={`${table.getRightTotalSize()}px`}
            flex={false}
            background="mainBackground"
            _hover={{
              background: "mainBackgroundHover",
            }}
            rowReverse
            className="row-content"
          >
            {row.getRightVisibleCells().map((cell, index) => (
              <CellGroup
                cell={cell}
                row={row}
                table={table}
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

  const RowContainer = directCellContent ? DirectStyledRow : StyledRow

  return (
    <RowContainer
      data-testid={`netdata-table-row${testPrefix}${
        testPrefixCallback ? "-" + testPrefixCallback(row.original) : ""
      }`}
      data-id={row.original?.id || row.id}
      onClick={onClick}
      cursor={directCellContent ? undefined : isClickable ? "pointer" : "default"}
      style={directCellContent ? { cursor: isClickable ? "pointer" : "default" } : undefined}
      onMouseEnter={() => onHoverCell?.({ row: row.index })}
      onMouseLeave={() => onHoverCell?.({ row: null })}
      {...(!directCellContent && {
        flex: true,
        column: true,
        background: "mainBackground",
        _hover: { background: "mainBackgroundHover" },
        border: { side: "bottom" },
      })}
    >
      {rowContent}
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
    </RowContainer>
  )
}

const sameTableRow = (previous, next) =>
  previous === next ||
  (previous?.id === next?.id &&
    previous?.original === next?.original &&
    previous?.depth === next?.depth &&
    previous?.parentId === next?.parentId)

export const areRowPropsEqual = (previous, next) => {
  const previousKeys = Object.keys(previous)
  const nextKeys = Object.keys(next)
  if (previousKeys.length !== nextKeys.length) return false

  return previousKeys.every(key =>
    key === "row" ? sameTableRow(previous.row, next.row) : Object.is(previous[key], next[key])
  )
}

export default memo(TableRow, areRowPropsEqual)
