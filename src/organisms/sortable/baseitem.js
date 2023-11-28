import React, { forwardRef, useState, useCallback } from "react"
import { Icon } from "@/components/icon/icon"
import Flex from "@/components/templates/flex"

const Item = forwardRef(
  (
    {
      active,
      index,
      onRemove,
      children,
      isDragOverlay,
      handleProps,
      listeners,
      attributes,
      id,
      style,
      dragging,
      resizeHandle,
      ...rest
    },
    ref
  ) => {
    const onClose = useCallback(
      event => {
        event.preventDefault()
        event.stopPropagation()
        if (onRemove) onRemove(index, active)
      },
      [onRemove, index, active]
    )

    return (
      <Flex
        ref={ref}
        tabIndex="0"
        data-index={index}
        data-id={id}
        style={style}
        {...attributes}
        border
      >
        <Flex>
          {!isDragOverlay && (
            <Icon name="x" size="small" color={active ? "text" : "textLite"} onClick={onClose} />
          )}
        </Flex>
        <Flex {...rest}>{id}</Flex>
        <Icon
          name="rearrange"
          width="10px"
          height="10px"
          color={active ? "text" : "textLite"}
          {...handleProps}
          {...listeners}
          cursor={dragging ? "grabbing" : "grab"}
        />
        {children}
        {resizeHandle}
      </Flex>
    )
  }
)

Item.displayName = "Item"

export default Item
