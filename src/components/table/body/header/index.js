import React, { forwardRef } from "react"
import Flex from "src/components/templates/flex"
import Cell from "./cell"

const BodyHeader = forwardRef(({ table, testPrefix, ...props }, ref) => (
  <Flex
    data-testid={`netdata-table-head${testPrefix}`}
    ref={ref}
    zIndex={10}
    position="sticky"
    top={0}
    background="tableRowBg"
    flex
    border={{
      size: "1px",
      type: "solid",
      side: "bottom",
      color: "border",
    }}
    column
  >
    {table.getHeaderGroups().map(headerGroup => (
      <Flex
        key={headerGroup.id}
        id={headerGroup.id}
        data-testid={`netdata-table-headRow${testPrefix}`}
        flex
      >
        {headerGroup.headers.map((header, index) => (
          <Cell
            key={header.id}
            index={index}
            {...props}
            header={header}
            testPrefix={testPrefix}
            table={table}
          />
        ))}
      </Flex>
    ))}
  </Flex>
))

export default BodyHeader
