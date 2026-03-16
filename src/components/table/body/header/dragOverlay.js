import React from "react"
import { createPortal } from "react-dom"
import { DragOverlay as DndDragOverlay } from "@dnd-kit/core"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"

const OverlayContainer = styled(Flex).attrs({
  background: "mainBackground",
  padding: [2, 4],
  round: 1,
  border: true,
})`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
`

const DragOverlay = ({ activeColumn }) => {
  if (!activeColumn) return null

  return createPortal(
    <DndDragOverlay>
      <OverlayContainer alignItems="center" gap={2}>
        <Text strong>{activeColumn.columnDef.header || activeColumn.id}</Text>
      </OverlayContainer>
    </DndDragOverlay>,
    document.body
  )
}

export default DragOverlay
