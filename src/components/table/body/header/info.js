import React from "react"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Tooltip from "src/components/drops/tooltip"

const Info = ({ meta }) => {
  const tooltipText = meta && meta?.tooltip ? meta?.tooltip : ""

  if (!tooltipText) return null

  return (
    <Flex position="absolute" top={1} right="12px" width={4} height={4}>
      <Tooltip align="bottom" content={tooltipText}>
        <Icon color="nodeBadgeColor" size="small" name="information" />
      </Tooltip>
    </Flex>
  )
}

export default Info
