import React, { forwardRef, useState, useCallback } from "react"
import { Icon } from "@/components/icon/icon"
import Flex from "@/components/templates/flex"
import useStylesTab from "./use-styles-tab"

const Tab = forwardRef(
  (
    {
      active,
      onActivate,
      index,
      onMouseOver: mouseOver,
      onMouseOut: mouseOut,
      onRemove,
      fixed,
      icon,
      children,
      showBorderLeft,
      isDragOverlay,
      draggable,
      handleProps,
      listeners,
      attributes,
      id,
      style,
      dragging,
      sorting,
      collapsed,
      rootProps,
      ...rest
    },
    ref
  ) => {
    const [hover, setHover] = useState()
    const { rootStyles } = useStylesTab({ active, showBorderLeft, isDragOverlay })

    const onClickTab = useCallback(
      event => {
        if (event) event.preventDefault()
        if (onActivate) onActivate()
      },
      [onActivate]
    )

    const onMouseOver = useCallback(
      event => {
        setHover(true)
        if (mouseOver) mouseOver(event)
      },
      [mouseOver]
    )

    const onMouseOut = useCallback(
      event => {
        setHover(false)
        if (mouseOut) mouseOut(event)
      },
      [mouseOut]
    )

    const onCloseTab = useCallback(
      event => {
        event.preventDefault()
        event.stopPropagation()
        if (onRemove) onRemove(index, active)
      },
      [onRemove, index, active]
    )

    const renderIcon = useCallback(
      iconProp => React.cloneElement(iconProp, { color: active ? "text" : "textLite" }),
      [active]
    )

    const closable = hover && !fixed

    return (
      <Flex
        {...rootStyles}
        ref={ref}
        {...(!isDragOverlay && {
          onClick: onClickTab,
          onMouseOver: onMouseOver,
          onMouseLeave: onMouseOut,
        })}
        tabIndex="0"
        data-index={index}
        data-id={id}
        style={style}
        {...attributes}
        {...rootProps}
      >
        <Flex>
          {closable && !isDragOverlay && (
            <Icon name="x" size="small" color={active ? "text" : "textLite"} onClick={onCloseTab} />
          )}
          {!closable && icon && renderIcon(icon)}
        </Flex>
        {!collapsed && <Flex {...rest}>{children}</Flex>}
        {(draggable || isDragOverlay) && (
          <Icon
            name="rearrange"
            width="10px"
            height="10px"
            color={hover ? (active ? "text" : "textLite") : "textNoFocus"}
            {...handleProps}
            {...listeners}
            cursor={sorting || dragging ? "grabbing" : "grab"}
          />
        )}
      </Flex>
    )
  }
)

Tab.displayName = "Tab"

export default Tab
