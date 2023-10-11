import React, { forwardRef } from "react"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import Tooltip from "@/components/drops/tooltip"
import { TextSmall } from "@/components/typography"
import { Button } from "./button"

//this  addition here has been done to be aligned with our current implementation at cloud-frontend src/components/tooltips/customTooltip.js

const tooltipBackground = ["neutral", "black"]

const CustomTooltipContent = ({ content }) => (
  <Flex padding={[1.5, 2]} margin={[2]} background={tooltipBackground} round={1} alignSelf="start">
    <TextSmall color="bright">{content}</TextSmall>
  </Flex>
)

const IconButton = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const isDefaultFlavour = flavour === "default"
    return (
      <Tooltip plain animation content={tooltip && <CustomTooltipContent content={tooltip} />}>
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
          ref={ref}
          {...props}
        />
      </Tooltip>
    )
  }
)

export default IconButton
