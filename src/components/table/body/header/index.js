import React, { memo } from "react"
import Flex from "@/components/templates/flex"
import { useTableState } from "../../provider"
import Cell from "./cell"

const rerenderSelector = state => state.columnVisibility

const HeaderGroup = ({ headerGroup, testPrefix, ...rest }) => (
  <Flex
    id={headerGroup.id}
    data-testid={`netdata-table-headRow${testPrefix}`}
    flex
    background="panelBg"
  >
    {headerGroup.headers.map((header, index) => (
      <Cell key={header.id} index={index} {...rest} header={header} testPrefix={testPrefix} />
    ))}
  </Flex>
)

const HeaderGroups = ({ groups, size, side, ...rest }) => {
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
      flex="grow"
    >
      {groups.map(headerGroup => (
        <HeaderGroup headerGroup={headerGroup} key={headerGroup.id} {...rest} />
      ))}
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
        table={table}
      />
    </Flex>
  )
})

export default BodyHeader
