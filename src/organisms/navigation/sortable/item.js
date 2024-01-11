import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const SortableItem = ({
  animateLayoutChanges,
  draggable,
  id,
  index,
  onRemove,
  itemProps,
  Item,
  lastTabRef,
}) => {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled: !draggable,
    data: {
      sortable: true,
      navigationTab: true,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const setRef = el => {
    setNodeRef(el)
    if (lastTabRef) lastTabRef.current = el
  }

  return (
    <Item
      {...itemProps}
      ref={setRef}
      dragging={isDragging}
      sorting={isSorting}
      draggable={draggable}
      handleProps={
        draggable
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      index={index}
      style={style}
      onRemove={onRemove}
      id={id}
      attributes={attributes}
      listeners={listeners}
    />
  )
}

export default SortableItem
