import React from "react"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import Tooltip from "@/components/drops/tooltip"
import { TextSmall } from "@/components/typography"
import { Button } from "./button"

const CustomTooltipContent = ({ content }) => (
  <Flex padding={[1.5, 2]} margin={[2]} background="tooltip" round={1} alignSelf="start">
    <TextSmall color="tooltipText">{content}</TextSmall>
  </Flex>
)

const IconButton = ({ width = "14px", height = "14px", tooltip = "", ref, ...props }) => (
  <Tooltip plain animation content={tooltip && <CustomTooltipContent content={tooltip} />}>
    <Box
      as={Button}
      iconWidth={width}
      iconHeight={height}
      ref={ref}
      flavour="borderless"
      neutral
      {...props}
    />
  </Tooltip>
)

export default IconButton
