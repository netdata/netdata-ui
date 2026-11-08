import React from "react"
import Box from "@/components/templates/box"
import Tooltip from "@/components/drops/tooltip"
import { controlSizeOf } from "@/mixins/controlSize"
import { Button } from "./button"
import { mergeRefs } from "@/utils/mergeRefs"

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

const joinIds = (...ids) =>
  [...new Set(ids.filter(Boolean).flatMap(id => String(id).split(" ")))].join(" ") || undefined

const IconButton = ({
  width,
  height,
  buttonSize,
  buttonHeight = buttonSize,
  tooltip = "",
  TooltipComponent = Tooltip,
  tooltipProps,
  focusableWhenDisabled = false,
  ref,
  ...props
}) => {
  const renderButton = ({
    ref: tooltipRef,
    "aria-describedby": description,
    ...triggerProps
  } = {}) => (
    <Box
      as={Button}
      iconWidth={width || glyphSize(props)}
      iconHeight={height || glyphSize(props)}
      ref={tooltipRef ? mergeRefs(ref, tooltipRef) : ref}
      flavour="borderless"
      neutral
      {...props}
      {...triggerProps}
      hasLabel={false}
      {...(buttonSize ? { width: buttonSize, height: buttonHeight } : {})}
      {...(focusableWhenDisabled && props.disabled ? focusableDisabledProps : {})}
      aria-describedby={joinIds(props["aria-describedby"], description)}
    />
  )
  return tooltip ? (
    <TooltipComponent animation content={tooltip} {...tooltipProps}>
      {renderButton}
    </TooltipComponent>
  ) : (
    renderButton()
  )
}

export default IconButton
