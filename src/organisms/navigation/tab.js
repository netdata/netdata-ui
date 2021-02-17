import styled from "styled-components"
import React, { useState, useCallback, forwardRef } from "react"
import Flex from "src/components/templates/flex"
import { Icon } from "src/components/icon/icon"
import { getColor } from "src/theme"
import useForwardRef from "src/hooks/use-forward-ref"

export const StyledTab = styled(Flex).attrs(({ active }) => ({
  gap: 1,
  background: active ? "mainBackground" : "elementBackground",
  padding: [2, 3],
  round: { side: "top" },
  border: active && { side: "all", color: "selected" },
  alignItems: "center",
  justifyContent: "start",
  overflow: "hidden",
  width: { max: 120 },
  position: "relative",
  elevation: active ? "2" : "0",
}))`
  top: 1px;
  border-bottom-color: ${({ active }) => active && getColor("mainBackground")};
  cursor: pointer;
  translate: scale(${({ active }) => (active ? 1 : 0.8)});
`

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
        {reverse && !shrink && children}
        {closable ? <Icon name="x" size="small" onClick={onCloseTab} /> : icon && renderIcon(icon)}
        {!reverse && !shrink && children}
      </StyledTab>
    )
  }
)

Tab.name = "Tab"

export default Tab
