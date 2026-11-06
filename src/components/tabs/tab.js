import React, { useCallback } from "react"
import { RaisedSegmentedItem } from "@/components/button/segmented"
import { Icon } from "@/components/icon"
import { StyledTab, StyledTabMenu, TabCount, TabLabel } from "./styled"

const tabRoleProps = ({ active, disabled }) => ({
  role: "tab",
  "aria-selected": !!active,
  "aria-disabled": disabled ? true : undefined,
  tabIndex: active && !disabled ? 0 : -1,
})

export const Tab = ({ index, isMenuItem, onChange, icon, count, ...rest }) => {
  const onClick = useCallback(e => onChange && onChange(index || 0, e), [index, onChange])
  const isRaised = rest.variant === "contained" && rest.appearance === "raised"
  const TabComponent = isMenuItem ? StyledTabMenu : isRaised ? RaisedSegmentedItem : StyledTab
  const hasSlots = !!icon || count !== undefined

  return (
    <TabComponent
      justifyContent={isRaised ? undefined : "center"}
      alignItems="center"
      gap={hasSlots ? 1.5 : undefined}
      onClick={rest.disabled ? undefined : onClick}
      {...(isMenuItem ? {} : tabRoleProps(rest))}
      {...rest}
    >
      {icon ? <Icon name={icon} width="16px" height="16px" aria-hidden="true" /> : null}
      {typeof rest.label === "function" ? (
        rest.label({ index, isMenuItem, icon, count, ...rest })
      ) : typeof rest.label === "string" ? (
        <TabLabel>{rest.label}</TabLabel>
      ) : (
        rest.label
      )}
      {count !== undefined ? <TabCount value={count}>{count.toLocaleString()}</TabCount> : null}
    </TabComponent>
  )
}
