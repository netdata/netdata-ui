import React, { forwardRef } from "react"
import { Checkbox as StyledCheckbox } from "./styled"

export const CheckboxIndicator = forwardRef(function CheckboxIndicator(
  { checked, shape = "checkbox", size = 4, markSize, ...rest },
  ref
) {
  return (
    <StyledCheckbox
      as="span"
      variant="filled"
      interactive={false}
      data-state={checked ? "checked" : "unchecked"}
      aria-hidden="true"
      width={size}
      height={size}
      round={shape === "radio" ? "50%" : 1}
      background={checked ? "buttonNeutralFill" : ["transparent", "full"]}
      shape={shape}
      markSize={markSize}
      ref={ref}
      {...rest}
    />
  )
})
