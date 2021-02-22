import React, { useState, useCallback } from "react"
import { Icon } from "src/components/icon/icon"
import Flex from "src/components/templates/flex"
import StyledTab from "./styledTab"

const Tab = ({
  active,
  onActivate,
  activeIndex,
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
  ...rest
}) => {
  const [hover, setHover] = useState()

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
    <StyledTab
      ref={onRef}
      active={active}
      onClick={onClickTab}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseOut}
      fixed={fixed}
      {...rest}
    >
      <Flex>
        {closable && (
          <Icon name="x" size="collapsed" color={active ? "text" : "border"} onClick={onCloseTab} />
        )}
        {!closable && icon && renderIcon(icon)}
      </Flex>
      {!collapsed && <div {...dragHandleProps}>{children}</div>}
    </StyledTab>
  )
}

Tab.displayName = "Tab"

export default Tab
