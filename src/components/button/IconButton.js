import { Button } from "./button"
import Box from "src/components/templates/box"

import React from "react"
import Tooltip from "src/components/drops/tooltip"

const IconButton = ({
  iconColor = "nodeBadgeColor",
  flavour = "borderless",
  icon,
  disabled,
  onClick,
  width = "20px",
  height = "20px",
  iconSize,
  tooltip = "",
  ...props
}) => {
  const isDefaultFlavour = flavour === "default"
  return (
    <Tooltip content={tooltip}>
      <Box
        cursor="pointer"
        iconWidth={width}
        iconHeight={height}
        onClick={onClick}
        as={Button}
        flavour={flavour}
        disabled={disabled}
        icon={icon}
        iconColor={isDefaultFlavour ? "white" : iconColor}
        iconSize={iconSize}
        neutral={!isDefaultFlavour}
        {...props}
      ></Box>
    </Tooltip>
  )
}

export default IconButton
