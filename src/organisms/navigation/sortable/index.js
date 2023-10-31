import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  closestCenter,
  DragOverlay,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  MeasuringStrategy,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { defaultAnimateLayoutChanges, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { debounce } from "throttle-debounce"
import Flex from "@/components/templates/flex"
import useNavigationScroll from "@/organisms/navigation/hooks/useNavigationScroll"
import useNavigationArrows from "@/organisms/navigation/hooks/useNavigationArrows"
import useOnTabsResize from "@/organisms/navigation/hooks/useOnTabsResize"
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

const Sortable = ({
  activationConstraint,
  animateLayoutChanges = args => defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
  adjustScale = false,
  Container = DefaultContainer,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  measuring = { droppable: { strategy: MeasuringStrategy.Always } },
  modifiers, //= [restrictToHorizontalAxis], // @dnd-kit/modifiers -> https://docs.dndkit.com/api-documentation/modifiers
  strategy = horizontalListSortingStrategy,
  onDragEnd,
  onTabClose,
  onResize,
  items,
  Item,
  parentRef,
  collapsed,
}) => {
  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  )

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) return

        setActiveId(active.id)
      }}
      onDragEnd={({ over }) => {
        setActiveId(null)

        if (over) {
          const overIndex = getIndex(over.id)
          if (activeIndex !== overIndex) {
            onDragEnd(activeIndex, overIndex)
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <Flex overflow="hidden" position="relative">
        {arrowLeft && <Arrow onClick={scrollLeft} name="navLeft" />}
        <Container ref={containerRef}>
          <SortableContext items={items} strategy={strategy}>
            {items.map((item, index) => (
              <SortableItem
                key={`${item.id}-${index}`}
                id={item.id}
                draggable={!item.fixed}
                index={index}
                onRemove={onTabClose}
                animateLayoutChanges={animateLayoutChanges}
                Item={Item}
                itemProps={item}
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
            <Item {...items[activeIndex]} backgroundOpacity={0.8} isDragOverlay grabbing sorting />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

export default Sortable
