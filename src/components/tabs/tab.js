import React, { useCallback } from "react"
import { StyledTab } from "./styled"

export const Tab = ({ index, onChange, ...rest }) => {
  const onClick = useCallback(() => onChange && onChange(index || 0), [index, onChange])

  return (
    <StyledTab onClick={rest.disabled ? undefined : onClick} {...rest}>
      {rest.label}
    </StyledTab>
  )
}
