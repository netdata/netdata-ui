import React, { useCallback } from "react"
import { StyledTab, StyledTabMenu } from "./styled"

export const Tab = ({ index, isMenuItem, onChange, ...rest }) => {
  const onClick = useCallback(e => onChange && onChange(index || 0, e), [index, onChange])
  const TabComponent = isMenuItem ? StyledTabMenu : StyledTab

  return (
    <TabComponent
      justifyContent="center"
      alignItems="center"
      onClick={rest.disabled ? undefined : onClick}
      {...rest}
    >
      {typeof rest.label === "function" ? rest.label({ index, isMenuItem, ...rest }) : rest.label}
    </TabComponent>
  )
}
