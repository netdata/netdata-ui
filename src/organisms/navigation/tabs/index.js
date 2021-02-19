import React, { useMemo, useState } from "react"
import Flex from "src/components/templates/flex"

const Tabs = ({ children }) => {
  const [small, setSmall] = useState(false)

  const tabs = useMemo(() => {
    return React.Children.map(children, child => {
      const shrinkable = child.type.name !== "TabSeparator"
      const draggable = child.type.displayName === "DraggableTabs"
      return React.cloneElement(child, {
        ...(shrinkable && { small }),
        ...(draggable && { onResize: setSmall }),
      })
    })
  }, [small, children])

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
