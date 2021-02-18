import React, { useRef, useMemo, useCallback } from "react"
import setRef from "src/mixins/set-ref"
import Flex from "src/components/templates/flex"
import useOnResize from "src/organisms/navigation/hooks/useOnResize"

const Tabs = ({ children }) => {
  const innerRef = useRef()

  const onResize = useCallback(setValue => {
    const clientWidth = innerRef.current.clientWidth
    const scrollWidth = innerRef.current.scrollWidth

    if (clientWidth < scrollWidth) setValue(true)
    if (clientWidth >= scrollWidth) setValue(false)
  }, [])

  const [shrink] = useOnResize(onResize, [children])

  const tabs = useMemo(() => {
    return React.Children.map(children, child => {
      const shrinkable = child.type.name !== "TabSeparator"
      const draggable = child.type.name === "DraggableTabs"
      return React.cloneElement(child, {
        shrink: shrinkable && shrink,
        ...(draggable && { ref: node => setRef(innerRef, node) }),
      })
    })
  }, [shrink, children])

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
