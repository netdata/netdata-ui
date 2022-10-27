import { Button } from "./button"
import Box from "src/components/templates/box"
import Flex from "src/components/templates/flex"

import React from "react"
import Tooltip from "src/components/drops/tooltip"
import { TextSmall } from "src/components/typography"

//this  addition here has been done to be aligned with our current implemetation at cloud-frontend src/components/tooltips/customTooltip.js

const tooltipBackground = ["neutral", "black"]

const CustomTooltipContent = ({ content }) => (
  <Flex padding={[1.5, 2]} margin={[2]} background={tooltipBackground} round={1} alignSelf="start">
    <TextSmall color="bright">{content}</TextSmall>
  </Flex>
)

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
    <Tooltip plain animation content={<CustomTooltipContent content={tooltip} />}>
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
