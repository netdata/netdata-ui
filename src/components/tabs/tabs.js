import React, { Fragment, useEffect } from "react"
import { StyledTabsWrapper, StyledTabs } from "./styled"
import { useSetActive, useBuildTabs } from "./tabs-hooks"

export const Tabs = ({
  className,
  onChange,
  selected,
  children,
  TabsHeader = Fragment,
  TabContent = Fragment,
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
    <StyledTabsWrapper className={className}>
      <TabsHeader>
        <StyledTabs className="tabs">{nav}</StyledTabs>
      </TabsHeader>
      <TabContent>{content}</TabContent>
    </StyledTabsWrapper>
  )
}
