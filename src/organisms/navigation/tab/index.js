import React, { useState, useCallback } from "react"
import { Icon } from "src/components/icon/icon"
import Flex from "src/components/templates/flex"

import useStylesTab from "./use-styles-tab"
import Tooltip from "src/components/drops/tooltip"

const Tab = ({
  active,
  onActivate,
  tabIndex,
  onMouseOver: mouseOver,
  onMouseOut: mouseOut,
  onClose,
  fixed,
  collapsed,
  icon,
  children,
  draggableRef,
  dragHandleProps,
  tabRef,
  showBorderLeft,
  tooltip,
  ...rest
}) => {
  const [hover, setHover] = useState()
  const { rootStyles } = useStylesTab({ active, showBorderLeft })

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
      if (onClose) onClose(tabIndex, active)
    },
    [onClose, tabIndex, active]
  )

  const onRef = useCallback(
    node => {
      if (draggableRef) draggableRef(node)
      if (tabRef) tabRef(node)
    },
    [draggableRef, tabRef]
  )

  const renderIcon = useCallback(
    iconProp => React.cloneElement(iconProp, { color: active ? "text" : "border" }),
    [active]
  )

  const closable = hover && !fixed

  return (
    <Flex
      {...rootStyles}
      ref={onRef}
      onClick={onClickTab}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseOut}
      {...rest}
    >
      <Flex>
        {closable && (
          <Icon name="x" size="small" color={active ? "text" : "border"} onClick={onCloseTab} />
        )}
        <Tooltip content={tooltip} align={tooltip ? "bottom" : "top"} isBasic>
          {!closable && icon && renderIcon(icon)}
        </Tooltip>
      </Flex>
      {!collapsed && <Flex {...dragHandleProps}>{children}</Flex>}
    </Flex>
  )
}

Tab.displayName = "Tab"

export default Tab
