import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"

const HandleContainer = styled(Flex)`
  cursor: grab;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  flex-shrink: 0;

  &:active {
    cursor: grabbing;
  }

  svg {
    width: 10px;
    height: 10px;
  }
`

export const DragHandle = ({ dragHandleProps, visible }) => {
  if (!dragHandleProps || Object.keys(dragHandleProps).length === 0) {
    return null
  }

  return (
    <HandleContainer
      {...dragHandleProps}
      alignItems="center"
      justifyContent="center"
      padding={[0, 1, 0, 0]}
      style={{ opacity: visible ? 1 : undefined }}
      className="drag-handle"
    >
      <Icon name="hamburger" color="textLite" />
    </HandleContainer>
  )
}

export default DragHandle
