import React, { forwardRef, useMemo, useCallback, useRef } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Flex from "src/components/templates/flex"
import { Icon } from "src/components/icon/icon"
import useNavigationArrows from "src/organisms/navigation/hooks/useNavigationArrows"
import useNavigationScroll from "src/organisms/navigation/hooks/useNavigationScroll"
import Wrapper from "./container"

const DraggableTabs = forwardRef(({ children, onDragEnd: dragEnd, onTabClose }, parentRef) => {
  const containerRef = useRef()
  const tabsRef = useRef([])

  const [arrowLeft, arrowRight] = useNavigationArrows(containerRef, tabsRef, [children])
  useNavigationScroll(containerRef)

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
    tab => (tabsRef.current = [...tabsRef.current, tab].slice(0, children.length)),
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
              ...dragHandleProps,
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
          <Icon name="navLeft" height={8} width={8} onClick={scrollLeft} margin={[0, 2]} />
        )}
        <Droppable droppableId="tabList" direction="horizontal">
          {({ innerRef, placeholder, droppableProps }) => {
            return (
              <Wrapper
                ref={node => {
                  containerRef.current = node
                  parentRef(node)
                }}
              >
                <Flex
                  gap={2}
                  flex="grow"
                  basis="0%"
                  position="absolute"
                  ref={innerRef}
                  {...droppableProps}
                >
                  {tabs}
                  {placeholder}
                </Flex>
              </Wrapper>
            )
          }}
        </Droppable>
        {arrowRight && (
          <Icon name="navRight" height={8} width={8} onClick={scrollRight} margin={[0, 2]} />
        )}
      </Flex>
    </DragDropContext>
  )
})

DraggableTabs.name = "DraggableTabs"

export default DraggableTabs
