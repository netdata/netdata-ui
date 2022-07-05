import { Button } from "./button"
import Box from "src/components/templates/box"

import React from "react"

const IconButton = ({
  iconColor = "nodeBadgeColor",
  flavour = "borderless",
  icon,
  disabled,
  onClick,
  width = "16px",
  height = "18px",
  ...props
}) => {
  return (
    <Box
      cursor="pointer"
      sx={{ width, height }}
      onClick={onClick}
      as={Button}
      flavour={flavour}
      disabled={disabled}
      icon={icon}
      iconColor={iconColor}
      {...props}
    ></Box>
  )
}

export default IconButton
