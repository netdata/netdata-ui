import React, { useRef, useLayoutEffect, useState, useMemo, useCallback } from "react"
import { useDebounce } from "react-use"
import setRef from "src/mixins/set-ref"
import Flex from "src/components/templates/flex"

const Tabs = ({ children }) => {
  const innerRef = useRef()
  const [shrink, setShrink] = useState()
  const [shrinkDebounced, setShrinkDebounced] = useState()

  useDebounce(
    () => {
      setShrinkDebounced(shrink)
    },
    250,
    [shrink]
  )

  const onResize = useCallback(() => {
    const clientWidth = innerRef.current.clientWidth
    const scrollWidth = innerRef.current.scrollWidth

    if (clientWidth < scrollWidth) setShrink(true)
    if (clientWidth > scrollWidth) setShrink(false)
  }, [])

  useLayoutEffect(() => {
    onResize()
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [children])

  const tabs = useMemo(() => {
    return React.Children.map(children, child => {
      const shrinkable = child.type.name !== "TabSeparator"
      const draggable = child.type.name === "DraggableTabs"
      return React.cloneElement(child, {
        shrink: shrinkable && shrinkDebounced,
        ...(draggable && { ref: node => setRef(innerRef, node) }),
      })
    })
  }, [shrinkDebounced, children])

  return (
    <Flex column width="100%">
      <Flex
        justifyContent="start"
        alignSelf="start"
        alignItems="end"
        gap={2}
        width="100%"
        height="100%"
        padding={[0, 2]}
        overflow="hidden"
      >
        {tabs}
      </Flex>
      <Flex height="1px" background="selected" width="100%" elevation={1} />
    </Flex>
  )
}

export default Tabs
