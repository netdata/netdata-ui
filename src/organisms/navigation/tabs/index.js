import React, { useState, useRef } from "react"
import Flex from "@/components/templates/flex"

const Tabs = ({ children, subTabs, ...rest }) => {
  const [collapsed, setCollapsed] = useState(false)
  const ref = useRef()

  return (
    <Flex column width="100%" position="relative">
      <Flex height="1px" background="border" width="100%" position="absolute" top={0} zIndex={4} />
      <Flex
        justifyContent="start"
        alignSelf="start"
        alignItems="end"
        width="100%"
        height="100%"
        overflow="auto"
        background="topBarBg"
        ref={ref}
        zIndex={1}
        {...rest}
      >
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            collapsed,
            onResize: setCollapsed,
            parentRef: ref,
          })
        })}
      </Flex>
      {subTabs &&
        React.cloneElement(subTabs, {
          collapsed,
        })}
      <Flex
        height="1px"
        background="border"
        width="100%"
        position="absolute"
        bottom={0}
        zIndex={0}
      />
    </Flex>
  )
}

export default Tabs
