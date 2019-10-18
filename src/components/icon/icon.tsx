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

export const StyledIcon = styled.svg<{ size: string }>`
  height: ${({ size }) => SIZES[size]};
  width: ${({ size }) => SIZES[size]};
`

export const Icon = ({ name, className, size = "medium" }: Props) => {
  const iconSymbol = iconsList[name]

  if (!iconSymbol) {
    return null
  }

  return (
    <StyledIcon size={size} className={className} viewBox={iconSymbol.viewBox}>
      <use xlinkHref={`#${iconSymbol.id}`} />
    </StyledIcon>
  )
}
