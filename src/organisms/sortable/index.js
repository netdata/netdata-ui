import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal, unstable_batchedUpdates } from "react-dom"
import {
  pointerWithin,
  rectIntersection,
  DndContext,
  DragOverlay,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensors,
  useSensor,
  MeasuringStrategy,
  defaultDropAnimationSideEffects,
  closestCenter,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Icon } from "@/components/icon/icon"
import Container from "./container"
import DraggableItem from "./item"
import { findBottom, moveItem, compact, getLayoutItem } from "./helpers"
import { calcWH, calcXY, calcItemPosition } from "./calcPosition"

const animateLayoutChanges = args => defaultAnimateLayoutChanges({ ...args, wasDragging: true })

const DroppableContainer = ({
  children,
  disabled,
  id,
  items,
  onRemove,
  containerWidth,
  rowHeight,
  gutter,
  ...props
}) => {
  const { active, attributes, isDragging, listeners, over, setNodeRef, transition, transform } =
    useSortable({
      id,
      data: {
        isContainer: true,
        items,
        containerId: id,
      },
      animateLayoutChanges,
    })

  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== "container") || items.includes(over.id)
    : false

  const nbRow = findBottom(items)
  const height = nbRow * rowHeight + (nbRow - 1) * gutter + "px"

  return (
    <Container
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
        width: containerWidth,
        height,
      }}
      column={false}
      hover={isOverContainer}
      {...attributes}
      {...listeners}
      {...props}
    >
      <Icon name="x" size="small" onClick={onRemove} />
      {children}
    </Container>
  )
}

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
}

export const TRASH_ID = "void"

const PLACEHOLDER_ID = "placeholder"

const MultipleContainers = ({
  adjustScale = false,
  cancelDrop,
  items: initialItems,
  coordinateGetter = sortableKeyboardCoordinates,
  modifiers = [],
  trashable = true,
  onRemove,
  Item,
  containerWidth = 800,
  rowHeight = 10,
  gridTracks = 12,
  gutter = 4,
  allowOverlap = false,
  compactType = "vertical",
  maxRows = 30,
}) => {
  const [items, setItems] = useState(() => initialItems)
  const [containers, setContainers] = useState(() => Object.keys(items))
  const [activeItem, setActiveItem] = useState(null)
  const lastContainerOverId = useRef(null)
  const isSortingContainer = activeItem?.isContainer

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy = useCallback(
    args => {
      const { active } = args
      const { isResizer, itemId } = active.data.current

      if (isResizer) {
        const rectResizing = args.droppableRects.get(itemId)

        return rectIntersection({
          ...args,
          collisionRect: {
            ...rectResizing,
            ...(active.rect.current.translated && {
              width:
                rectResizing.width +
                (active.rect.current.translated.right - active.rect.current.initial.right),
              height:
                rectResizing.height +
                (active.rect.current.translated.bottom - active.rect.current.initial.bottom),
            }),
          },
          droppableContainers: args.droppableContainers.filter(
            container => !(container.id in items)
          ),
        })
      }

      // const pointerIntersections = pointerWithin(args)

      // if (!pointerIntersections?.length) {
      //   return pointerIntersections
      // }

      // let overContainerId = pointerIntersections.find(intersection => intersection.id in items)?.id

      // if (!overContainerId) {
      //   const overId = getFirstCollision(pointerIntersections, "id")
      //   if (overId === TRASH_ID) return pointerIntersections

      //   return lastContainerOverId.current ? [{ id: lastContainerOverId.current }] : []
      // }

      return rectIntersection({
        ...args,
        droppableContainers: args.droppableContainers.filter(container => {
          return !(container.data.current?.isResizer || container.id === itemId)
        }),
      })
    },
    [activeItem, items]
  )
  const [clonedItems, setClonedItems] = useState(null)
  const [transformedItems, setTransformedItems] = useState(null)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  )
  const findContainer = id => (id in items ? id : null)

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems)
    }

    setActiveItem(null)
    setClonedItems(null)
    setTransformedItems(null)
  }

  const renderItemDragOverlay = (item, Item) => {
    const containerItems = (transformedItems || items)[item.containerId]
    if (!containerItems) return null

    const itemIndex = containerItems.findIndex(l => l.id === item.itemId)

    if (itemIndex === -1) return null

    const { id, left, width, height, top } = containerItems[itemIndex]

    if (!id) return null

    const position = calcItemPosition(
      { containerWidth, rowHeight, gridTracks, gutter },
      left,
      top,
      width,
      height
    )

    const style = {
      position: "absolute",
      width: `${position.width}px`,
      height: `${position.height}px`,
    }
    return <Item style={style} id={id} dragOverlay />
  }

  const renderContainerDragOverlay = ({ items }, Item) => {
    const nbRow = findBottom(items)
    const height = nbRow * rowHeight + (nbRow - 1) * gutter + "px"

    return (
      <Container
        style={{
          width: containerWidth,
          height,
        }}
      >
        {items.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </Container>
    )
  }

  const handleRemove = containerId => {
    setContainers(containers => containers.filter(id => id !== containerId))
  }

  const handleAddColumn = () => {
    const newContainerId = getNextContainerId()

    unstable_batchedUpdates(() => {
      setContainers(containers => [...containers, newContainerId])
      setItems(items => ({
        ...items,
        [newContainerId]: [],
      }))
    })
  }

  const getNextContainerId = () => {
    const containerIds = Object.keys(items)
    const lastContainerId = containerIds[containerIds.length - 1]

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        const { isContainer } = active.data.current

        setActiveItem(active.data.current)
        setClonedItems(items)
        if (!isContainer) setTransformedItems(items)
      }}
      onDragMove={({ active, over, collisions }) => {
        const { isResizer, isContainer, itemId, containerId } = active.data.current

        if (isContainer) return

        const { initial, translated } = active.rect.current

        let layout = transformedItems[containerId]

        const item = getLayoutItem(layout, itemId)

        if (!item) return

        const overId = over?.id

        if (overId === TRASH_ID) {
          setActiveItem(prev => ({
            ...prev,
            containerId: prev.originalContainerId || prev.containerId,
          }))
          setTransformedItems(clonedItems)
          return
        }

        if (isResizer) {
          if (!overId) return

          const newWidth = over.rect.width + (translated.right - initial.right)
          const newheight = over.rect.height + (translated.bottom - initial.bottom)

          let { width, height } = calcWH(
            { gutter, maxRows, gridTracks, rowHeight, containerWidth },
            newWidth,
            newheight,
            item
          )

          if (item.width === width && item.height === height) return

          layout = layout.map(l => (l.id === item.id ? { ...item, width, height } : l))
          collisions = collisions.filter(c => c.id !== item.id)

          if (collisions.length) layout = compact(layout, compactType, gridTracks)

          // Re-compact the newLayout and set the drag placeholder.
          setTransformedItems(prev => ({
            ...prev,
            [containerId]: [...layout],
          }))
          return
        }

        const activeContainer = findContainer(containerId)
        const overContainer = findContainer(overId) || activeContainer

        if (!overContainer || overContainer !== activeContainer) {
          layout = [...transformedItems[overContainer], item]
        }

        const container = collisions.find(c => c.id === overContainer)

        if (!container) return

        let { left, top } = calcXY(
          { gutter, maxRows, gridTracks, rowHeight, containerWidth },
          translated.top - container.data.droppableContainer.rect.current.top,
          translated.left - container.data.droppableContainer.rect.current.left,
          item
        )

        if (item.top === top && item.left === left) return

        layout = moveItem(
          layout,
          item,
          left,
          top,
          true,
          false,
          compactType,
          gridTracks,
          allowOverlap
        )

        layout = compact(layout, compactType, gridTracks)

        const isCrossingContainers = overContainer !== activeContainer
        if (isCrossingContainers)
          setActiveItem(prev => ({
            ...prev,
            originalContainerId: prev.originalContainerId || prev.containerId,
            containerId: overContainer,
          }))

        setTransformedItems(prev => ({
          ...prev,
          [overContainer]: [...layout],
          ...(isCrossingContainers && {
            [containerId]: compact(
              prev[containerId].filter(l => l.id !== item.id),
              compactType,
              gridTracks
            ),
          }),
        }))
      }}
      onDragEnd={({ active, over }) => {
        const { isResizer, isItem } = active.data.current

        const overId = over?.id

        if (overId === null) {
          setActiveItem(null)
          setTransformedItems(null)
          return
        }

        if (overId === TRASH_ID) {
          setItems(prev => ({
            ...prev,
            [activeItem.containerId]: compact(
              prev[activeItem.containerId].filter(({ id }) => id !== activeItem.itemId),
              compactType,
              gridTracks
            ),
          }))
          setActiveItem(null)
          setTransformedItems(null)
          return
        }

        if (isItem || isResizer) {
          if (transformedItems) setItems(transformedItems)
          setTransformedItems(null)
          setActiveItem(null)
          return
        }

        if (active.id in items && over?.id) {
          setContainers(prevContainers => {
            const activeIndex = prevContainers.indexOf(active.id)
            const overIndex = prevContainers.indexOf(over.id)

            return arrayMove(prevContainers, activeIndex, overIndex)
          })
        }

        const activeContainer = findContainer(active.id)

        if (!activeContainer) {
          setActiveItem(null)
          return
        }

        if (overId === PLACEHOLDER_ID) {
          const newContainerId = getNextContainerId()

          unstable_batchedUpdates(() => {
            setContainers(prevContainers => [...prevContainers, newContainerId])
            setItems(items => ({
              ...items,
              [activeContainer]: items[activeContainer].filter(id => id !== activeItem.itemId),
              [newContainerId]: [active.id],
            }))
            setActiveItem(null)
          })
          return
        }

        if (transformedItems) setItems(transformedItems)
        setTransformedItems(null)
        setActiveItem(null)
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <SortableContext
        items={[...containers, PLACEHOLDER_ID]}
        strategy={verticalListSortingStrategy}
      >
        {containers.map(containerId => (
          <DroppableContainer
            key={containerId}
            id={containerId}
            label={`Column ${containerId}`}
            items={(transformedItems || items)[containerId]}
            onRemove={() => handleRemove(containerId)}
            containerWidth={containerWidth}
            rowHeight={rowHeight}
            gridTracks={gridTracks}
            gutter={gutter}
          >
            {(transformedItems || items)[containerId].map((item, index) => {
              return (
                <DraggableItem
                  disabled={isSortingContainer}
                  key={item.id}
                  {...item}
                  index={index}
                  containerId={containerId}
                  Item={Item}
                  onRemove={onRemove}
                  draggable
                  containerWidth={containerWidth}
                  rowHeight={rowHeight}
                  gridTracks={gridTracks}
                  gutter={gutter}
                  transformed={transformedItems?.[containerId]?.[index]}
                />
              )
            })}
          </DroppableContainer>
        ))}
        {/*<DroppableContainer
          id={PLACEHOLDER_ID}
          disabled={isSortingContainer}
          items={empty}
          onClick={handleAddColumn}
          placeholder
        >
          <div>+ Add column</div>
        </DroppableContainer>*/}
      </SortableContext>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {!activeItem
            ? null
            : activeItem.isContainer
            ? renderContainerDragOverlay(activeItem, Item)
            : activeItem.isItem
            ? renderItemDragOverlay(activeItem, Item)
            : null}
        </DragOverlay>,
        document.body
      )}
      {trashable && activeItem && (activeItem.isContainer || activeItem.isItem) ? (
        <Trash id={TRASH_ID} />
      ) : null}
    </DndContext>
  )
}

const Trash = ({ id }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        left: "50%",
        marginLeft: -150,
        bottom: 20,
        width: 300,
        height: 60,
        borderRadius: 5,
        border: "1px solid",
        borderColor: isOver ? "red" : "#DDD",
      }}
    >
      Drop here to delete
    </div>
  )
}

export default MultipleContainers
