import React, { useCallback } from "react"
import { StyledTab } from "./styled"

export const Tab = ({ index, onChange, ...rest }) => {
  const onClick = useCallback(() => onChange && onChange(index || 0), [index, onChange])

  return (
    <StyledTab
      justifyContent="center"
      alignItems="center"
      flex={{ grow: 1, shrink: 1 }}
      basis="100%"
      onClick={rest.disabled ? undefined : onClick}
      {...rest}
    >
      {rest.label}
    </StyledTab>
  )
}
