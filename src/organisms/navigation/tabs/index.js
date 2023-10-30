import React, { useState, useRef } from "react"
import Flex from "@/components/templates/flex"

const Tabs = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const ref = useRef()

  return (
    <Flex column width="100%" position="relative">
      <Flex
        height="1px"
        background="border"
        width="100%"
        position="absolute"
        style={{ top: 0 }}
        zIndex={3}
      />
      <Flex
        justifyContent="start"
        alignSelf="start"
        alignItems="end"
        width="100%"
        height="100%"
        overflow="hidden"
        background="topBarBg"
        ref={ref}
      >
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            collapsed,
            onResize: setCollapsed,
            parentRef: ref,
          })
        })}
      </Flex>
      <Flex
        height="1px"
        background="border"
        width="100%"
        position="absolute"
        style={{ bottom: 0 }}
        zIndex={1}
      />
    </Flex>
  )
}

export default Tabs
