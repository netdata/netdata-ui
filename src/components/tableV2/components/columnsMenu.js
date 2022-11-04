import React from "react"
import Drop from "src/components/drops/drop/index.js"
import { Text, ListItem } from "src/components/typography"
import { Checkbox } from "src/components/checkbox"
import Flex from "src/components/templates/flex"

import styled from "styled-components"

const Dropdown = styled(Flex)`
  box-shadow: 0px 10px 18px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);
`

const ColumnsMenu = ({ parentRef, isOpen, columns, onClose }) => {
  if (parentRef.current && isOpen)
    return (
      <Drop target={parentRef.current} onClickOutside={onClose}>
        <Dropdown background="dropdown" column round={1} width={50}>
          <Flex column>
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
          </Flex>
        </Dropdown>
      </Drop>
    )

  return null
}

export default ColumnsMenu
