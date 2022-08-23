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
  iconSize,
  ...props
}) => {
  const isDefaultFlavour = flavour === "default"
  return (
    <Box
      cursor="pointer"
      sx={{ width, height }}
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
  )
}

export default IconButton
