import React, { forwardRef } from "react"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import Tooltip from "@/components/drops/tooltip"
import { TextSmall } from "@/components/typography"
import { Button } from "./button"

const CustomTooltipContent = ({ content }) => (
  <Flex padding={[1.5, 2]} margin={[2]} background="tooltip" round={1} alignSelf="start">
    <TextSmall color="bright">{content}</TextSmall>
  </Flex>
)

const IconButton = forwardRef(
  ({ width = "20px", height = "20px", tooltip = "", ...props }, ref) => (
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
)

export default IconButton
