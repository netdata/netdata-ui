import React, { forwardRef, Fragment, useEffect } from "react"
import { StyledTabs, StyledTabsWrapper } from "./styled"
import { useBuildTabs, useSetActive } from "./tabs-hooks"

export const Tabs = forwardRef(
  (
    {
      className,
      onChange,
      selected,
      children,
      TabsHeader = Fragment,
      TabContent = Fragment,
      noDefaultBorder,
    },
    ref
  ) => {
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
        <TabsHeader ref={ref}>
          <StyledTabs className="tabs" noDefaultBorder={noDefaultBorder}>
            {nav}
          </StyledTabs>
        </TabsHeader>
        <TabContent>{content}</TabContent>
      </StyledTabsWrapper>
    )
  }
)
