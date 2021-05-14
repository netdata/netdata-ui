import React from "react"
import { iconsList } from "./icons-list"
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

export const Icon = ({ name, className, size, disabled = false, ...rest }) => {
  const iconSymbol = iconsList[name]

  if (!iconSymbol) {
    return null
  }

  const iconSize = size || getSize(name)

  return (
    <StyledIcon
      viewBox={iconSymbol.viewBox}
      {...rest}
      size={iconSize}
      className={className}
      disabled={disabled}
    >
      <use xlinkHref={`#${iconSymbol.id}`} />
    </StyledIcon>
  )
}
