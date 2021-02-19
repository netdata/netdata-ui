import React, { useState, useCallback, forwardRef } from "react"
import { Icon } from "src/components/icon/icon"
import useForwardRef from "src/hooks/use-forward-ref"
import StyledTab from "./styledTab"

const Tab = forwardRef(
  (
    {
      active,
      onActivate,
      activeIndex,
      tabIndex,
      onMouseOver: mouseOver,
      onMouseOut: mouseOut,
      onClose,
      fixed,
      shrink,
      icon,
      children,
      reverse,
      draggableRef,
      dragHandleProps,
      tabRef,
      ...rest
    },
    parentRef
  ) => {
    const [hover, setHover] = useState()

    const [, setRef] = useForwardRef(parentRef)

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
        if (!tabRef || !draggableRef) return
        if (setRef) setRef(node)

        draggableRef(node)
        tabRef(node)
      },
      [tabRef, draggableRef]
    )

    const renderIcon = iconProp => React.cloneElement(iconProp, !active && { color: "border" })
    const closable = hover && !fixed

    return (
      <StyledTab
        ref={onRef}
        active={active}
        onClick={onClickTab}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseOut}
        {...rest}
      >
        {reverse && !shrink && <span {...dragHandleProps}>{children}</span>}
        {closable ? <Icon name="x" size="small" onClick={onCloseTab} /> : icon && renderIcon(icon)}
        {!reverse && !shrink && <span {...dragHandleProps}>{children}</span>}
      </StyledTab>
    )
  }
)

Tab.name = "Tab"

export default Tab
