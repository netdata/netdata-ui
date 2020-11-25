import React, { FC } from "react"
import { MarginProps, AlignSelfProps, ColorType } from "src/mixins/types"
import { iconsList } from "./icons-list"
import { StyledIcon } from "./styled"

export interface IconProps extends MarginProps, AlignSelfProps {
  name: string
  size?: "small" | "medium" | "large"
  className?: string
  onClick?: (arg?: any) => void
  title?: string
  disabled?: boolean
  color?: ColorType
  hoverColor?: ColorType
}

const getSize = filename => {
  if (filename.endsWith("_s")) {
    return "small"
  }
  if (filename.endsWith("_l")) {
    return "large"
  }
  return "medium"
}

export const Icon: FC<IconProps> = ({
  name,
  className,
  size,
  disabled = false,
  ...props
}: IconProps) => {
  const iconSymbol = iconsList[name]

  if (!iconSymbol) {
    return null
  }

  const iconSize = size || getSize(name)

  return (
    <StyledIcon
      {...props}
      size={iconSize}
      className={className}
      viewBox={iconSymbol.viewBox}
      disabled={disabled}
    >
      <use xlinkHref={`#${iconSymbol.id}`} />
    </StyledIcon>
  )
}
