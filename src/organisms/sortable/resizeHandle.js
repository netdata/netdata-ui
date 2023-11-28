import React, { memo } from "react"
import styled from "styled-components"
import { useDraggable } from "@dnd-kit/core"
import { IconButton } from "@/components/button"

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

const ResizeHandle = memo(({ id, containerId }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${id}-resizeHandle`,
    data: {
      isResizer: true,
      itemId: id,
      containerId,
    },
  })

  return <ResizeButton ref={setNodeRef} {...attributes} {...listeners} />
})

export default ResizeHandle
