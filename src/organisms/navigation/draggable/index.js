import React, { useMemo, useCallback, useRef, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Flex from "src/components/templates/flex"
import { Icon } from "src/components/icon/icon"
import useNavigationArrows from "src/organisms/navigation/hooks/useNavigationArrows"
import useNavigationScroll from "src/organisms/navigation/hooks/useNavigationScroll"
import Container from "./container"

const DraggableTabs = ({ children, onDragEnd: dragEnd, onTabClose, onResize: resizeCallback }) => {
  const containerRef = useRef()
  const tabsRef = useRef([])

  const [arrowLeft, arrowRight] = useNavigationArrows(containerRef, tabsRef, [
    children,
  ])
  useNavigationScroll(containerRef)

  const onResize = useCallback(() => {
    if (!containerRef.current || !tabsRef.current.length) return

    const container = containerRef.current
    const { right: containerRight } = container.getBoundingClientRect()

    const lastTab = tabsRef.current[tabsRef.current.length - 1]
    const { right: tabRight, width: tabWidth } = lastTab.getBoundingClientRect()

    if (tabRight > containerRight) resizeCallback(true)
    if (tabRight + tabWidth <= containerRight) resizeCallback(false)
  }, [children])

  useEffect(() => {
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [children])

  const scrollLeft = e => {
    e.preventDefault()
    const container = containerRef.current
    container.scrollTo({
      left: container.scrollLeft - 100,
      behavior: "smooth",
    })
  }

  const scrollRight = e => {
    e.preventDefault()
    const container = containerRef.current
    container.scrollTo({
      left: container.scrollLeft + 100,
      behavior: "smooth",
    })
  }

  const setTabRef = useCallback(
    tab => {
      if (!tab) return
      if (children.length >= tabsRef.current.length) tabsRef.current = [...tabsRef.current, tab]
      if (children.length < tabsRef.current.length) {
        tabsRef.current = tabsRef.current.filter(
          t => t.getAttribute("data-rbd-draggable-id") === tab.getAttribute("data-rbd-draggable-id")
        )
      }
    },
    [children]
  )

  const tabs = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      const key = `tab-${index}`
      return (
        <Draggable key={key} draggableId={key} index={index}>
          {({ innerRef, draggableProps, dragHandleProps }) =>
            React.cloneElement(child, {
              ...draggableProps,
              dragHandleProps,
              draggableRef: innerRef,
              tabRef: setTabRef,
              tabIndex: index,
              onClose: onTabClose,
              ...child.props,
            })
          }
        </Draggable>
      )
    })
  }, [children, onTabClose])

  const onDragEnd = useCallback(
    result => {
      if (dragEnd) return dragEnd(result)
    },
    [dragEnd]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex flex="grow" basis="0%" height="100%" width="100%" alignItems="center" overflow="hidden">
        {arrowLeft && (
          <Icon
            name="navLeft"
            height={8}
            width={8}
            color="text"
            onClick={scrollLeft}
            margin={[0, 2]}
          />
        )}
        <Droppable droppableId="tabList" direction="horizontal">
          {({ innerRef, placeholder, droppableProps }) => {
            return (
              <Container
                ref={node => {
                  containerRef.current = node
                  innerRef(node)
                }}
                {...droppableProps}
                gap={2}
                flex="grow"
                basis="0%"
                position="relative"
              >
                {tabs}
                {placeholder}
              </Container>
            )
          }}
        </Droppable>
        {arrowRight && (
          <Icon
            name="navRight"
            height={8}
            width={8}
            color="text"
            onClick={scrollRight}
            margin={[0, 2]}
          />
        )}
      </Flex>
    </DragDropContext>
  )
}

DraggableTabs.displayName = "DraggableTabs"

export default DraggableTabs
