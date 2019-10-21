import React from "react"
import styled from "styled-components"
import { iconsList } from "./icons-list"

interface Props {
  name: string
  size?: "small" | "medium" | "large"
  className?: string
}

const SIZES = {
  small: "16px",
  medium: "24px",
  large: "40px",
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

export const StyledIcon = styled.svg<{ size: string }>`
  height: ${({ size }) => SIZES[size]};
  width: ${({ size }) => SIZES[size]};
`

export const Icon = ({ name, className, size }: Props) => {
  const iconSymbol = iconsList[name]

  if (!iconSymbol) {
    return null
  }

  const iconSize = size || getSize(name)

  return (
    <StyledIcon size={iconSize} className={className} viewBox={iconSymbol.viewBox}>
      <use xlinkHref={`#${iconSymbol.id}`} />
    </StyledIcon>
  )
}
