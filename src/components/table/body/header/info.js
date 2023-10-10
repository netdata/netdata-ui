import React from "react"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Tooltip from "src/components/drops/tooltip"

const Info = ({ meta }) => {
  const tooltipText = meta && meta?.tooltip ? meta?.tooltip : ""

  if (!tooltipText) return null

  return (
    <Flex position="absolute" top="1px" right="1px" width={3} height={3}>
      <Tooltip align="bottom" content={tooltipText}>
        <Icon color="nodeBadgeColor" size="small" name="information" />
      </Tooltip>
    </Flex>
  )
}

export default Info
