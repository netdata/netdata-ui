import React, { forwardRef, useMemo, useCallback, useRef, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { debounce } from "throttle-debounce"
import Flex from "@/components/templates/flex"
import useNavigationArrows from "@/organisms/navigation/hooks/useNavigationArrows"
import useNavigationScroll from "@/organisms/navigation/hooks/useNavigationScroll"
import useOnTabsResize from "@/organisms/navigation/hooks/useOnTabsResize"
import Container from "./container"
import Arrow from "./arrow"

const DraggableTabs = forwardRef(
  ({ children, onDragEnd: dragEnd, onTabClose, onResize, collapsed }, parentRef) => {
    const ref = useRef()
    const tabsRef = useRef([])

    useNavigationScroll(ref)
    const onTabsResize = useOnTabsResize(parentRef, ref, tabsRef, onResize, [children])
    const [arrowLeft, arrowRight, onScroll] = useNavigationArrows(ref, tabsRef, children, collapsed)

    useEffect(() => {
      if (!ref.current) return

      const container = ref.current

      const handlers = debounce(300, () => {
        onTabsResize()
        onScroll()
      })

      handlers()

      container.addEventListener("scroll", onScroll)
      window.addEventListener("resize", handlers)
      return () => {
        container.removeEventListener("scroll", onScroll)
        window.removeEventListener("resize", handlers)
      }
    }, [children])

    const scrollLeft = e => {
      e.preventDefault()
      const container = ref.current
      container.scrollTo({
        left: container.scrollLeft - 100,
        behavior: "smooth",
      })
    }

    const scrollRight = e => {
      e.preventDefault()
      const container = ref.current
      container.scrollTo({
        left: container.scrollLeft + 100,
        behavior: "smooth",
      })
    }

    const setTabRef = useCallback(
      tab => {
        if (!tab) return

        const tabs = tabsRef.current

        if (children.length >= tabs.length) tabsRef.current = [...tabs, tab]
        if (children.length < tabs.length) {
          tabsRef.current = tabs.filter(
            node =>
              node.getAttribute("data-rbd-draggable-id") ===
              tab.getAttribute("data-rbd-draggable-id")
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
        <Flex
          flex="grow"
          basis="0%"
          height="100%"
          width="100%"
          alignItems="center"
          overflow="hidden"
        >
          {arrowLeft && <Arrow onClick={scrollLeft} name="navLeft" />}
          <Droppable droppableId="tabList" direction="horizontal">
            {({ innerRef, placeholder, droppableProps }) => {
              return (
                <Container
                  ref={node => {
                    ref.current = node
                    innerRef(node)
                  }}
                  {...droppableProps}
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
          {arrowRight && <Arrow onClick={scrollRight} name="navRight" />}
        </Flex>
      </DragDropContext>
    )
  }
)

DraggableTabs.displayName = "DraggableTabs"

export default DraggableTabs
