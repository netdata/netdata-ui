import React from "react"
import Box from "@/components/templates/box"
import Tooltip from "@/components/drops/tooltip"
import { controlSizeOf } from "@/mixins/controlSize"
import { Button } from "./button"

// Glyphs follow the square: 14px in the 24px compact square, 16px in 28 and 32.
const glyphSize = ({ large, compact }) =>
  controlSizeOf({ large, compact }) === "compact" ? "14px" : "16px"

// Native disabled drops focus and hover, so the tooltip that explains why becomes unreachable.
const preventActivation = event => event.preventDefault()

const focusableDisabledProps = {
  disabled: false,
  "aria-disabled": "true",
  onClick: preventActivation,
}

const IconButton = ({
  width,
  height,
  tooltip = "",
  focusableWhenDisabled = false,
  ref,
  ...props
}) => (
  <Tooltip animation content={tooltip}>
    <Box
      as={Button}
      iconWidth={width || glyphSize(props)}
      iconHeight={height || glyphSize(props)}
      ref={ref}
      flavour="borderless"
      neutral
      {...props}
      {...(focusableWhenDisabled && props.disabled ? focusableDisabledProps : {})}
    />
  </Tooltip>
)

export default IconButton
