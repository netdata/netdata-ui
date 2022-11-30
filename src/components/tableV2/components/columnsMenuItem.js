import React from "react"
import { Checkbox } from "src/components/checkbox"
import Flex from "src/components/templates/flex"
import { ListItem } from "src/components/typography"

const ColumnsMenuItem = ({ column, disabled }) => {
  if (!column.getCanHide()) return null

  return (
    <Flex alignItems="center" as={ListItem} justifyContent="between" padding={[1]}>
      <Checkbox
        checked={column.getIsVisible()}
        disabled={disabled}
        label={column.id}
        onChange={column.getToggleVisibilityHandler()}
      />
    </Flex>
  )
}

export default ColumnsMenuItem
