import React from "react"
import Flex from "src/components/templates/flex"

const ResizeHandler = ({ header, table }) => {
  if (!header.column.getCanResize()) return null

  const resizingProps = header.column.getIsResizing()
    ? { transform: `translateX(${table.getState().columnSizingInfo.deltaOffset}px)` }
    : {}

  return (
    <Flex
      background="borderSecondary"
      _hover={{ background: "resizerLine", color: "resizerLine" }}
      _active={{ background: "resizerLine", color: "resizerLine" }}
      _before={{
        content: "",
        position: "absolute",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        left: "-8px",
        width: "8px",
      }}
      width="1px"
      sx={{
        userSelect: "none",
        touchAction: "none",
        cursor: "col-resize",
        color: "border",
        ...resizingProps,
      }}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      position="absolute"
      top={0}
      right={0}
      bottom={0}
    />
  )
}

export default ResizeHandler
