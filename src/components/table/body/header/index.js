import React, { memo } from "react"
import Flex from "@/components/templates/flex"
import { useTableState } from "../../provider"
import Cell from "./cell"

const rerenderSelector = state => {
  const columns = state.table?.getAllColumns() || []

  return {
    sizing: state.columnSizing,
    expanded: state.expanded,
    columnVisibility: state.columnVisibility,
    selectedRows: state.selectedRows,
    grouping: state.grouping,
    columnsCount: columns.length,
    columnsFilters: columns.map(({ columnDef }) => ({
      filterOptions: columnDef?.meta?.filter?.options,
    })),
  }
}

const HeaderGroup = ({ id, headers, testPrefix, rowReverse, ...rest }) => {
  return (
    <Flex
      id={id}
      data-testid={`netdata-table-headRow${testPrefix}`}
      flex
      background="tableRowBg2"
      rowReverse={rowReverse}
    >
      {headers.map((header, index) => (
        <Cell
          key={header.id}
          index={index}
          {...rest}
          header={header}
          testPrefix={testPrefix}
          hasSubheaders={!!header.subHeaders.length}
        >
          {!!header.subHeaders.length && (
            <HeaderGroup
              headers={header.subHeaders}
              id={header.id}
              key={header.id}
              {...rest}
              isSubheader
            />
          )}
        </Cell>
      ))}
    </Flex>
  )
}

const HeaderGroups = ({ groups, size, side, flex = "grow", ...rest }) => {
  if (!groups[0].headers.length) return null

  return (
    <Flex
      position={side ? "sticky" : "relative"}
      {...(side === "right"
        ? {
            right: 0,
            border: { side: "left" },
          }
        : { left: 0, border: { side: "right" } })}
      zIndex={side ? 11 : undefined}
      width={`${size}px`}
      flex={flex}
      column
    >
      <HeaderGroup headers={groups[0].headers} id={groups[0].id} key={groups[0].id} {...rest} />
    </Flex>
  )
}

const BodyHeader = memo(({ table, testPrefix, ...rest }) => {
  useTableState(rerenderSelector)

  return (
    <Flex
      data-testid={`netdata-table-head${testPrefix}`}
      flex
      border={{
        size: "1px",
        type: "solid",
        side: "bottom",
        color: "border",
      }}
    >
      <HeaderGroups
        groups={table.getLeftHeaderGroups()}
        side="left"
        size={table.getLeftTotalSize()}
        testPrefix={testPrefix}
        {...rest}
        flex={false}
        table={table}
      />
      <HeaderGroups
        groups={table.getCenterHeaderGroups()}
        size={table.getCenterTotalSize()}
        testPrefix={testPrefix}
        {...rest}
        table={table}
      />
      <HeaderGroups
        groups={table.getRightHeaderGroups()}
        side="right"
        size={table.getRightTotalSize()}
        testPrefix={testPrefix}
        {...rest}
        flex={false}
        table={table}
        rowReverse
      />
    </Flex>
  )
})

export default BodyHeader
