import React, { Fragment, useEffect } from "react"
import { StyledTabs, StyledTabsWrapper } from "./styled"
import { useBuildTabs, useSetActive } from "./tabs-hooks"

export const Tabs = ({
  className,
  onChange,
  selected,
  children,
  TabsHeader = Fragment,
  TabContent = Fragment,
  noDefaultBorder,
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
    setActiveIndex
  )

  useEffect(() => {
    if (activeIsDisabled && activeIndex !== firstActiveIndex) setActiveIndex(firstActiveIndex)
  }, [activeIndex, firstActiveIndex, activeIsDisabled, setActiveIndex])

  return (
    <StyledTabsWrapper className={className} {...rest} ref={ref}>
      <TabsHeader {...tabHeaderProps}>
        <StyledTabs className="tabs" noDefaultBorder={noDefaultBorder} {...tabsProps}>
          {nav}
        </StyledTabs>
      </TabsHeader>
      <TabContent {...tabContentProps}>{content}</TabContent>
    </StyledTabsWrapper>
  )
}
