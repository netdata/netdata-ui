import React from "react"
import Drop from "src/components/drops/drop/index.js"
import { ListItem } from "src/components/typography"
import { Checkbox } from "src/components/checkbox"
import Flex from "src/components/templates/flex"

const ColumnsMenu = ({ parentRef, isOpen, columns, onClose }) => {
  if (parentRef.current && isOpen)
    return (
      <Drop target={parentRef.current} onClickOutside={onClose}>
        <Flex column gap={2}>
          {columns.map(column => {
            {
              return (
                column.getCanHide() && (
                  <ListItem key={column.id}>
                    <Checkbox
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      label={column.id}
                    />
                  </ListItem>
                )
              )
            }
          })}
        </Flex>
      </Drop>
    )

  return null
}

export default ColumnsMenu
