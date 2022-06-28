import React from "react"

import Tooltip from "src/components/drops/tooltip"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"
import { Icon } from "src/components/icon"

const Action = ({ id, icon, handleAction, tooltipText, row }) => {
  return (
    <Tooltip content={tooltipText}>
      <Flex
        alignItems="center"
        justifyContent="center"
        height={"100%"}
        _hover={{ background: "borderSecondary" }}
        cursor="pointer"
        key={id}
        width={10}
        onClick={() => handleAction(row.original)}
      >
        <Box as={Icon} name={icon} />
      </Flex>
    </Tooltip>
  )
}

export default Action
