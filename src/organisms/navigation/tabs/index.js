import React, { useMemo, useState, useRef } from "react"
import Flex from "src/components/templates/flex"

const Tabs = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const ref = useRef()
  const tabs = useMemo(() => {
    return React.Children.map(children, child => {
      const draggable = child.type.displayName === "DraggableTabs"
      return React.cloneElement(child, {
        collapsed,
        ...(draggable && { onResize: setCollapsed, ref }),
      })
    })
  }, [collapsed, children])

  return (
    <Flex column width="100%" position="relative" ref={ref}>
      <Flex
        justifyContent="start"
        alignSelf="start"
        alignItems="end"
        gap={2}
        width="100%"
        height="100%"
        padding={[0, 4]}
        overflow="hidden"
      >
        {tabs}
      </Flex>
      <Flex
        height="1px"
        background="tabsBorder"
        width="100%"
        position="absolute"
        style={{ bottom: 0 }}
        zIndex={1}
      />
    </Flex>
  )
}

export default Tabs
