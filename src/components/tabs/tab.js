import { useCallback } from "react"
import { RaisedSegmentedItem } from "@/components/button/segmented"
import { Icon } from "@/components/icon"
import { StyledTab, StyledTabMenu, VerticalTab, TabCount, TabLabel, isNeutralLine } from "./styled"

const tabRoleProps = ({ active, disabled }) => ({
  role: "tab",
  "aria-selected": !!active,
  "aria-disabled": disabled ? true : undefined,
  tabIndex: active && !disabled ? 0 : -1,
})

export const Tab = ({ index, isMenuItem, onChange, icon, count, vertical, ...rest }) => {
  const onClick = useCallback(e => onChange && onChange(index || 0, e), [index, onChange])
  const isRaised = !vertical && rest.variant === "contained" && rest.appearance === "raised"
  const LineTab = vertical ? VerticalTab : StyledTab
  const TabComponent = isMenuItem ? StyledTabMenu : isRaised ? RaisedSegmentedItem : LineTab
  const hasSlots = !!icon || count !== undefined

  return (
    <TabComponent
      justifyContent={vertical ? "start" : isRaised ? undefined : "center"}
      alignItems="center"
      gap={isNeutralLine(rest) ? 1.75 : hasSlots ? 1.5 : undefined}
      onClick={rest.disabled ? undefined : onClick}
      {...(isMenuItem ? {} : tabRoleProps(rest))}
      {...rest}
    >
      {icon ? <Icon name={icon} width="16px" height="16px" aria-hidden="true" /> : null}
      {typeof rest.label === "function" ? (
        rest.label({ index, isMenuItem, icon, count, ...rest })
      ) : typeof rest.label === "string" ? (
        <TabLabel appearance={vertical || isNeutralLine(rest) ? "neutral" : undefined}>
          {rest.label}
        </TabLabel>
      ) : (
        rest.label
      )}
      {count !== undefined ? <TabCount value={count}>{count.toLocaleString()}</TabCount> : null}
    </TabComponent>
  )
}
