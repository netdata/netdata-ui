import React from "react"
import Drop from "src/components/drops/drop/index.js"
import { Text, ListItem } from "src/components/typography"
import { Checkbox } from "src/components/checkbox"
import Flex from "src/components/templates/flex"

const ColumnsMenu = ({ parentRef, isOpen, columns, onClose }) => {
  if (parentRef.current && isOpen)
    return (
      <Drop
        background="dropdown"
        height={{ max: "100vh" }}
        onClickOutside={onClose}
        overflow={{ vertical: "auto" }}
        round={1}
        target={parentRef.current}
        width={50}
      >
        <>
          <Flex
            padding={[2]}
            border={{
              size: "1px",
              type: "solid",
              side: "bottom",
              color: "borderSecondary",
            }}
          >
            <Text strong>Columns</Text>
          </Flex>

          {columns.map(column => {
            {
              return (
                column.getCanHide() && (
                  <Flex
                    padding={[2]}
                    as={ListItem}
                    alignItems="center"
                    justifyContent="between"
                    key={column.id}
                    border={{
                      size: "1px",
                      type: "solid",
                      side: "bottom",
                      color: "borderSecondary",
                    }}
                  >
                    <Checkbox
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      label={column.id}
                    />
                  </Flex>
                )
              )
            }
          })}
        </>
      </Drop>
    )

  return null
}

export default ColumnsMenu
