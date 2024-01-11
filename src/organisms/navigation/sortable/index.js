import React, { forwardRef, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  closestCenter,
  DragOverlay,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDndMonitor,
  defaultDropAnimationSideEffects,
  MeasuringStrategy,
} from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { defaultAnimateLayoutChanges, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { debounce } from "throttle-debounce"
import Flex from "@/components/templates/flex"
import useNavigationScroll from "@/organisms/navigation/hooks/useNavigationScroll"
import useNavigationArrows from "@/organisms/navigation/hooks/useNavigationArrows"
import useOnTabsResize from "@/organisms/navigation/hooks/useOnTabsResize"
import { mergeRefs } from "@/utils"
import SortableItem from "./item"
import DefaultContainer from "./container"
import Arrow from "./arrow"

const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
}

export const BaseSortable = forwardRef(
  (
    {
      animateLayoutChanges = args => defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
      adjustScale = false,
      Container = DefaultContainer,
      dropAnimation = dropAnimationConfig,
      strategy = horizontalListSortingStrategy,
      onDragEnd,
      onTabClose,
      onResize,
      items,
      Item,
      parentRef,
      collapsed,
    },
    ref
  ) => {
    const [activeId, setActiveId] = useState(null)

    const getIndex = id => items.findIndex(item => item.id === id)
    const activeIndex = activeId !== null ? getIndex(activeId) : -1

    const containerRef = useRef()
    useNavigationScroll(containerRef)

    const lastTabRef = useRef()

    const onTabsResize = useOnTabsResize(parentRef, containerRef, lastTabRef, onResize, [
      items.length,
    ])

    const [arrowLeft, arrowRight, onScroll] = useNavigationArrows(
      containerRef,
      lastTabRef,
      items.length,
      collapsed
    )

    useEffect(() => {
      if (!containerRef.current) return

      onTabsResize()

      const container = containerRef.current

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
    }, [items.length, collapsed])

    const scrollLeft = e => {
      e.preventDefault()

      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 100,
        behavior: "smooth",
      })
    }

    const scrollRight = e => {
      e.preventDefault()

      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 100,
        behavior: "smooth",
      })
    }

    useDndMonitor({
      onDragStart: ({ active }) => {
        if (!active || !active.data.current.navigationTab) return

        setActiveId(active.id)
      },
      onDragEnd: ({ active, over }) => {
        if (!active || !active.data.current.navigationTab) return
        setActiveId(null)

        if (over && over.data.current.navigationTab) {
          const overIndex = getIndex(over.id)
          if (activeIndex !== overIndex) {
            onDragEnd(activeIndex, overIndex)
          }
        }
      },
      onDragCancel: () => setActiveId(null),
    })

    return (
      <>
        <Flex overflow="hidden" position="relative">
          {arrowLeft && <Arrow onClick={scrollLeft} name="navLeft" />}
          <Container ref={mergeRefs(containerRef, ref)}>
            <SortableContext items={items} strategy={strategy}>
              {items.map((item, index) => (
                <SortableItem
                  key={`${item.id}-${index}`}
                  itemProps={item}
                  id={item.id}
                  draggable={!item.fixed}
                  index={index}
                  onRemove={onTabClose}
                  animateLayoutChanges={animateLayoutChanges}
                  Item={Item}
                  {...(index === items.length - 1 && { lastTabRef })}
                  collapsed={collapsed}
                />
              ))}
            </SortableContext>
          </Container>
          {arrowRight && <Arrow onClick={scrollRight} name="navRight" right />}
        </Flex>
        {createPortal(
          <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
            {activeId !== null ? (
              <Item
                {...items[activeIndex]}
                backgroundOpacity={0.8}
                isDragOverlay
                grabbing
                sorting
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </>
    )
  }
)

const Sortable = ({
  activationConstraint,
  collisionDetection = closestCenter,
  measuring = { droppable: { strategy: MeasuringStrategy.Always } },
  modifiers, //= [restrictToHorizontalAxis], // @dnd-kit/modifiers -> https://docs.dndkit.com/api-documentation/modifiers
  ...rest
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      measuring={measuring}
      modifiers={modifiers}
    >
      <BaseSortable {...rest} />
    </DndContext>
  )
}

export default Sortable
