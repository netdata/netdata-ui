import React, { forwardRef } from "react"
import { iconsList } from "./iconsList"
import { StyledIcon } from "./styled"

const getSize = filename => {
  if (filename.endsWith("_s")) {
    return "small"
  }
  if (filename.endsWith("_l")) {
    return "large"
  }
  return "medium"
}

export const Icon = forwardRef(({ name, size, ...rest }, ref) => {
  const iconSymbol = iconsList[name]

  if (!iconSymbol) {
    return null
  }

  const iconSize = size || getSize(name)

  return (
    <StyledIcon viewBox={iconSymbol.viewBox} {...rest} size={iconSize} ref={ref}>
      <use xlinkHref={`#${iconSymbol.id}`} />
    </StyledIcon>
  )
})
