import React, { Fragment, useCallback, useEffect } from "react"
import { StyledTabs, StyledTabsWrapper } from "./styled"
import { useBuildTabs, useSetActive } from "./tabs-hooks"

const stepByKey = { ArrowRight: 1, ArrowLeft: -1 }

// Roving focus: arrows move to the next enabled tab and select it, wrapping at the ends.
const moveFocus = e => {
  const step = stepByKey[e.key]
  if (!step) return

  const tabs = Array.from(
    e.currentTarget.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')
  )
  const current = tabs.indexOf(e.target.closest('[role="tab"]'))
  if (current < 0) return

  e.preventDefault()
  const next = tabs[(current + step + tabs.length) % tabs.length]
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
    variant
  )

  const onKeyDown = useCallback(
    e => {
      moveFocus(e)
      tabsProps?.onKeyDown?.(e)
    },
    [tabsProps]
  )

  useEffect(() => {
    if (activeIsDisabled && activeIndex !== firstActiveIndex) setActiveIndex(firstActiveIndex)
  }, [activeIndex, firstActiveIndex, activeIsDisabled, setActiveIndex])

  return (
    <StyledTabsWrapper className={className} {...rest} ref={ref}>
      <TabsHeader {...tabHeaderProps}>
        <StyledTabs
          className="tabs"
          noDefaultBorder={noDefaultBorder}
          variant={variant}
          {...tabsProps}
          onKeyDown={onKeyDown}
        >
          {nav}
        </StyledTabs>
      </TabsHeader>
      <TabContent {...tabContentProps}>{content}</TabContent>
    </StyledTabsWrapper>
  )
}
