import React from "react"
import { useMeasure } from "react-use"
import Flex from "@/components/templates/flex"
import Cell from "./cell"

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
  const [widthRef, { width }] = useMeasure()

  if (!groups[0].headers.length) return null

  if (!side)
    return groups.map(headerGroup => (
      <HeaderGroup headerGroup={headerGroup} key={headerGroup.id} {...rest} />
    ))

  return (
    <Flex
      // ref={widthRef}
      position="sticky"
      {...(side === "right" ? { right: 0, sx: { transform: "translateX(100%)" } } : { left: 0 })}
      zIndex={11}
      width={`${size}px`}
      flex="grow"
    >
      {groups.map(headerGroup => (
        <HeaderGroup headerGroup={headerGroup} key={headerGroup.id} {...rest} />
      ))}
    </Flex>
  )
}

const BodyHeader = ({ table, testPrefix, ...rest }) => (
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

export default BodyHeader
