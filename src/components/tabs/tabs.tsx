import React, { FC, Fragment, ReactNode, useEffect } from "react"
import { StyledTabsWrapper, StyledTabs } from "./styled"
import { useSetActive, useBuildTabs, OnChange } from "./tabs-hooks"

export interface TabsProps {
  className?: string
  onChange?: OnChange
  selected?: number
  children?: ReactNode
  TabsHeader?: string | React.ComponentType<any>
  TabContent?: string | React.ComponentType<any>
}

export const Tabs: FC<TabsProps> = ({
  className,
  onChange,
  selected,
  children,
  TabsHeader = Fragment,
  TabContent = Fragment,
}: TabsProps) => {
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
