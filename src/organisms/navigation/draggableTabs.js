import React, { forwardRef, useMemo, useCallback, useRef } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import Flex from "src/components/templates/flex"
import { Icon } from "src/components/icon/icon"
import { getColor } from "src/theme"
import useNavigationArrows from "./useNavigationArrows"
import useNavigationScroll from "./useNavigationScroll"

const Wrapper = styled(Flex).attrs({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  flex: true,
  basis: "0%",
})`
  position: relative;
  overflow-y: hidden;
  overflow-x: auto;

  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;

  &::-webkit-scrollbar {
    height: 1px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${getColor("selected")};
  }
`

const DraggableTabs = forwardRef(({ children, onDragEnd: dragEnd }, parentRef) => {
  const containerRef = useRef()
  const tabsRef = useRef([])

  const [arrowLeft, arrowRight] = useNavigationArrows(containerRef, tabsRef, children)
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

              ...child.props,
            })
          }
        </Draggable>
      )
    })
  }, [children])

  const onDragEnd = useCallback(
    result => {
      if (dragEnd) return dragEnd(result)
    },
    [dragEnd]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex flex="grow" basis="0%" height="100%" width="100%" alignItems="center">
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
