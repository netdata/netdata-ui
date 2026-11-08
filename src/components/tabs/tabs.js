import React, { Fragment, useCallback, useEffect, useId } from "react"
import Flex from "@/components/templates/flex"
import { SegmentedTrack } from "@/components/button/segmented"
import { isNeutralLine, StyledTabs, StyledTabsWrapper } from "./styled"
import { useBuildTabs, useSetActive } from "./tabs-hooks"

const horizontalSteps = { ArrowRight: 1, ArrowLeft: -1 }
const verticalSteps = { ArrowDown: 1, ArrowUp: -1 }

// Roving focus: arrows move to the next enabled tab and select it, wrapping at the ends.
const moveFocus = (e, vertical, supportsBoundaryKeys) => {
  const step = (vertical ? verticalSteps : horizontalSteps)[e.key]
  const boundary = supportsBoundaryKeys && (e.key === "Home" || e.key === "End")
  if (!step && !boundary) return

  const tabs = Array.from(
    e.currentTarget.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')
  )
  const current = tabs.indexOf(e.target.closest('[role="tab"]'))
  if (current < 0) return

  e.preventDefault()
  const next = boundary
    ? tabs[e.key === "Home" ? 0 : tabs.length - 1]
    : tabs[(current + step + tabs.length) % tabs.length]
  next.focus()
  next.click()
}

export const Tabs = ({
  className,
  onChange,
  selected,
  children,
  TabsHeader = Fragment,
  TabContent,
  noDefaultBorder,
  variant = "line",
  orientation = "horizontal",
  appearance,
  accent,
  tabsProps,
  tabHeaderProps,
  tabContentProps,
  ref,
  ...rest
}) => {
  const id = useId()
  const vertical = orientation === "vertical"
  const Panel = TabContent ?? (vertical ? Flex : Fragment)
  const panelId = vertical && Panel !== Fragment ? (tabContentProps?.id ?? id) : undefined
  const [activeIndex, setActiveIndex] = useSetActive(selected, onChange)

  const [nav, content, firstActiveIndex, activeIsDisabled] = useBuildTabs(
    children,
    activeIndex,
    setActiveIndex,
    { variant, appearance, accent, vertical, panelId }
  )

  const isRaised = !vertical && variant === "contained" && appearance === "raised"
  const supportsBoundaryKeys = vertical || isRaised || isNeutralLine({ variant, appearance })

  const onKeyDown = useCallback(
    e => {
      moveFocus(e, vertical, supportsBoundaryKeys)
      tabsProps?.onKeyDown?.(e)
    },
    [tabsProps, vertical, supportsBoundaryKeys]
  )

  useEffect(() => {
    if (activeIsDisabled && activeIndex !== firstActiveIndex) setActiveIndex(firstActiveIndex)
  }, [activeIndex, firstActiveIndex, activeIsDisabled, setActiveIndex])

  const activeTabId = panelId && nav.find(tab => tab.props.active)?.props.id

  return (
    <StyledTabsWrapper
      className={className}
      {...(vertical ? { column: false } : {})}
      {...rest}
      ref={ref}
    >
      <TabsHeader {...tabHeaderProps}>
        {isRaised ? (
          <SegmentedTrack
            className="tabs"
            appearance={appearance}
            {...tabsProps}
            as="nav"
            role="tablist"
            onKeyDown={onKeyDown}
          >
            {nav}
          </SegmentedTrack>
        ) : (
          <StyledTabs
            className="tabs"
            noDefaultBorder={noDefaultBorder}
            variant={vertical ? "line" : variant}
            {...(vertical
              ? {
                  column: true,
                  row: false,
                  alignItems: "stretch",
                  flex: false,
                  padding: [2],
                  gap: 0.5,
                  overflow: { vertical: "auto" },
                  noDefaultBorder: true,
                  "aria-orientation": "vertical",
                }
              : {})}
            {...tabsProps}
            onKeyDown={onKeyDown}
          >
            {nav}
          </StyledTabs>
        )}
      </TabsHeader>
      <Panel
        {...(panelId
          ? { id: panelId, role: "tabpanel", "aria-labelledby": activeTabId, tabIndex: 0 }
          : {})}
        {...(vertical && !TabContent ? { column: true, flex: true, width: { min: "0px" } } : {})}
        {...tabContentProps}
      >
        {content}
      </Panel>
    </StyledTabsWrapper>
  )
}
