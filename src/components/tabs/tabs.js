import React, { Fragment, useCallback, useEffect } from "react"
import { SegmentedTrack } from "@/components/button/segmented"
import { isNeutralLine, StyledTabs, StyledTabsWrapper } from "./styled"
import { useBuildTabs, useSetActive } from "./tabs-hooks"

const stepByKey = { ArrowRight: 1, ArrowLeft: -1 }

// Roving focus: arrows move to the next enabled tab and select it, wrapping at the ends.
const moveFocus = (e, supportsBoundaryKeys) => {
  const step = stepByKey[e.key]
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
  TabContent = Fragment,
  noDefaultBorder,
  variant = "line",
  appearance,
  accent,
  tabsProps,
  tabHeaderProps,
  tabContentProps,
  ref,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useSetActive(selected, onChange)

  const [nav, content, firstActiveIndex, activeIsDisabled] = useBuildTabs(
    children,
    activeIndex,
    setActiveIndex,
    { variant, appearance, accent }
  )

  const isRaised = variant === "contained" && appearance === "raised"
  const supportsBoundaryKeys = isRaised || isNeutralLine({ variant, appearance })

  const onKeyDown = useCallback(
    e => {
      moveFocus(e, supportsBoundaryKeys)
      tabsProps?.onKeyDown?.(e)
    },
    [tabsProps, supportsBoundaryKeys]
  )

  useEffect(() => {
    if (activeIsDisabled && activeIndex !== firstActiveIndex) setActiveIndex(firstActiveIndex)
  }, [activeIndex, firstActiveIndex, activeIsDisabled, setActiveIndex])

  return (
    <StyledTabsWrapper className={className} {...rest} ref={ref}>
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
            variant={variant}
            {...tabsProps}
            onKeyDown={onKeyDown}
          >
            {nav}
          </StyledTabs>
        )}
      </TabsHeader>
      <TabContent {...tabContentProps}>{content}</TabContent>
    </StyledTabsWrapper>
  )
}
