import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { useTableState } from "../../provider"

const rerenderSelector = state => state.columnSizingInfo?.deltaPercentage

export const Handler = styled(Flex).attrs({
  position: "absolute",
  top: "2px",
  right: 0,
  bottom: "2px",
})``

const ResizeHandler = ({ header, table }) => {
  useTableState(rerenderSelector)
  if (!header.column.getCanResize()) return null

  const resizingProps = header.column.getIsResizing()
    ? { transform: `translateX(${table.getState().columnSizingInfo.deltaOffset}px)` }
    : {}

  return (
    <Handler
      border={{ side: "right", size: "1px", color: "borderSecondary" }}
      _hover={{ border: { side: "right", size: "3px", color: "resizerLine" } }}
      _active={{ border: { side: "right", size: "3px", color: "resizerLine" } }}
      width="8px"
      sx={{
        userSelect: "none",
        touchAction: "none",
        cursor: "col-resize",
        ...resizingProps,
      }}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
    />
  )
}

export default ResizeHandler
