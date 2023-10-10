import React, { memo } from "react"
import { flexRender } from "@tanstack/react-table"
import Flex from "src/components/templates/flex"
import { TextMicro } from "src/components/typography"
import { Icon } from "src/components/icon"
import useIntersection from "src/hooks/use-intersection"
import { useTableContext } from "../provider"

const makeSelectIsRowHovered = id => s => s.hoveredRow === id

const CellGroup = ({ cell, row, header, testPrefix, coloredSortedColumn, rootRef }) => {
  const [setRef, , visible] = useIntersection({
    rootMargin: "100% 0% 100% 0%",
    threshold: 0,
    root: rootRef.current,
    defaultVisible: true,
  })

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
      ref={setRef}
      flex={
        !column.columnDef.fullWidth && (column.columnDef.notFlex || column.getCanResize())
          ? false
          : header.colSpan
      }
      width={`${column.getSize()}px`}
      padding={[1]}
      position="relative"
      data-testid={`netdata-table-cell-${cell.column.columnDef.id}${testPrefix}`}
      overflow="hidden"
      {...(cell.column.getCanSort() &&
        coloredSortedColumn &&
        !!cell.column.getIsSorted() && {
          background: "columnHighlight",
          backgroundOpacity: row.index % 2 === 0 ? "0.2" : "0.4",
        })}
      {...cellStyles}
    >
      <Flex flex width="100%" justifyContent="between">
        {visible && (
          <>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
            {cell.getIsGrouped() && row.getCanExpand() && (
              <Flex
                cursor="pointer"
                role="button"
                padding={[0.5]}
                gap={0.5}
                onClick={e => {
                  row.getToggleExpandedHandler()(e)
                  setTimeout(() =>
                    e.target.scrollIntoView({ behavior: "smooth", block: "nearest" })
                  )
                }}
                alignSelf="end"
              >
                <TextMicro fontSize="10px" color="textLite">
                  Expand
                </TextMicro>
                <Icon
                  name="chevron_down"
                  width="12px"
                  height="12px"
                  color="selected"
                  rotate={row.getIsExpanded() ? 2 : null}
                />
              </Flex>
            )}
          </>
        )}
      </Flex>
    </Flex>
  )
}

const selectOnHover = s => s.onHover

export default memo(
  ({ disableClickRow, onClickRow, row, table, testPrefix, testPrefixCallback, index, ...rest }) => {
    const onHover = useTableContext(selectOnHover)
    const isHovered = useTableContext(makeSelectIsRowHovered(row.id))

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
        onMouseEnter={() => onHover({ hoveredRow: row.id })}
        onMouseLeave={() => onHover({ hoveredRow: null, hoveredColumn: null })}
        disableClickRow={() =>
          disableClickRow?.({ data: row.original, table: table, fullRow: row })
        }
        flex
      >
        {!!row.getLeftVisibleCells().length && (
          <Flex
            position="sticky"
            left={0}
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
