import React from "react"
import styled from "styled-components"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { mergeRefs } from "@/utils"
import { IconButton } from "@/components/button"
import { calcItemPosition } from "./calcPosition"

const ResizeButton = styled(IconButton).attrs({
  icon: "resize_handler",
  padding: [0],
  position: "absolute",
  bottom: 0,
  right: 0,
  color: "textLite",
  hoverColor: "textDescription",
  size: "16px",
})`
  && {
    cursor: ns-resize;
  }
`

const DraggableItem = ({
  draggable,
  id,
  containerId,
  index,
  onRemove,
  itemProps,
  Item,
  top,
  left,
  width,
  height,
  containerWidth,
  rowHeight,
  gridTracks,
  gutter,
  transformed,
}) => {
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id,
    disabled: !draggable,
    data: {
      isItem: true,
      itemId: id,
      containerId,
    },
  })

  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef } = useDraggable({
    id,
    disabled: !draggable,
    data: {
      isItem: true,
      itemId: id,
      containerId,
    },
  })

  const resizer = useDraggable({
    id: `${id}-resizeHandle`,
    data: {
      isResizer: true,
      itemId: id,
      containerId,
    },
  })

  const position = calcItemPosition(
    { containerWidth, rowHeight, gridTracks, gutter },
    left,
    top,
    width,
    height,
    transformed
  )

  const style = {
    transition: "top 50ms ease, left 50ms ease, width 50ms ease, height 50ms ease",
    position: "absolute",
    width: `${(position.width / containerWidth) * 100}%`,
    height: `${position.height}px`,
    left: `${(position.left / containerWidth) * 100}%`,
    top: `${position.top}px`,
  }

  return (
    <Item
      {...itemProps}
      ref={mergeRefs(setNodeRef, setDroppableNodeRef)}
      dragging={isDragging}
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
      resizeHandle={
        <ResizeButton ref={resizer.setNodeRef} {...resizer.attributes} {...resizer.listeners} />
      }
    />
  )
}

export default DraggableItem
