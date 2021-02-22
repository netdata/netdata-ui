import React, { useMemo, useState } from "react"
import Flex from "src/components/templates/flex"

const Tabs = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const tabs = useMemo(() => {
    return React.Children.map(children, child => {
      const draggable = child.type.displayName === "DraggableTabs"
      return React.cloneElement(child, {
        collapsed,
        ...(draggable && { onResize: setCollapsed }),
      })
    })
  }, [collapsed, children])

  return (
    <Flex column width="100%" position="relative">
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
        background="selected"
        width="100%"
        position="absolute"
        style={{ bottom: 0 }}
        elevation={1}
      />
    </Flex>
  )
}

export default Tabs
