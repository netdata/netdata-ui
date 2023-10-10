import React, { memo } from "react"
import Flex from "src/components/templates/flex"
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

const BodyHeader = memo(({ table, testPrefix, ...rest }) => {
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
      {!!table.getLeftHeaderGroups()[0].headers.length && (
        <Flex
          position="sticky"
          left={0}
          zIndex={11}
          width={`${table.getLeftTotalSize()}px`}
          flex="grow"
        >
          {table.getLeftHeaderGroups().map(headerGroup => (
            <HeaderGroup
              headerGroup={headerGroup}
              key={headerGroup.id}
              testPrefix={testPrefix}
              {...rest}
              table={table}
            />
          ))}
        </Flex>
      )}
      <Flex width={`${table.getCenterTotalSize()}px`} flex="grow">
        {table.getCenterHeaderGroups().map(headerGroup => (
          <HeaderGroup
            headerGroup={headerGroup}
            key={headerGroup.id}
            testPrefix={testPrefix}
            {...rest}
            table={table}
          />
        ))}
      </Flex>
      {!!table.getRightHeaderGroups()[0].headers.length && (
        <Flex
          position="sticky"
          right={0}
          zIndex={11}
          width={`${table.getLeftTotalSize()}px`}
          flex="grow"
        >
          {table.getRightHeaderGroups().map(headerGroup => (
            <HeaderGroup
              headerGroup={headerGroup}
              key={headerGroup.id}
              testPrefix={testPrefix}
              {...rest}
              table={table}
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
})

export default BodyHeader
