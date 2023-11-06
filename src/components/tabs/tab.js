import React, { useCallback } from "react"
import { StyledTab, StyledTabMenu } from "./styled"

export const Tab = ({ index, isMenuItem, onChange, ...rest }) => {
  const onClick = useCallback(() => onChange && onChange(index || 0), [index, onChange])

  const TabComponent = isMenuItem ? StyledTabMenu : StyledTab
  return (
    <TabComponent
      justifyContent="center"
      alignItems="center"
      onClick={rest.disabled ? undefined : onClick}
      {...rest}
    >
      {rest.label}
    </TabComponent>
  )
}
