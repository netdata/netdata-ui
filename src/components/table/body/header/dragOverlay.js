import React from "react"
import { createPortal } from "react-dom"
import { DragOverlay as DndDragOverlay } from "@dnd-kit/core"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"

const OverlayContainer = styled(Flex)`
  background: ${({ theme }) => theme.colors.mainBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 16px;
  border-radius: 4px;
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
