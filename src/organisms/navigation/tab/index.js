import React, { useState, useCallback } from "react"
import { Icon } from "@/components/icon/icon"
import Flex from "@/components/templates/flex"
import useStylesTab from "./use-styles-tab"
import { TabRoot, CloseButton } from "./styled"

const Tab = ({
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
  ref,
  tooltip,
  tooltipProps,
  ...rest
}) => {
  const [hover, setHover] = useState()
  const [focused, setFocused] = useState(false)
  const { rootStyles } = useStylesTab({ active, showBorderLeft, isDragOverlay, dragging })

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

  const onFocus = useCallback(() => setFocused(true), [])

  // Focus moving onto the close button stays inside the tab, so the button must not unmount.
  const onBlur = useCallback(event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
  }, [])

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
    iconProp =>
      React.cloneElement(iconProp, {
        color: iconProp?.props?.color
          ? iconProp.props.color
          : active || hover
            ? "text"
            : "textLite",
      }),
    [active, hover]
  )

  const closable = (hover || focused) && !fixed

  return (
    <TabRoot
      {...rootStyles}
      ref={ref}
      {...(!isDragOverlay && {
        onClick: onClickTab,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseOut,
        onFocus,
        onBlur,
      })}
      tabIndex="0"
      data-index={index}
      data-id={id}
      style={style}
      tooltip={tooltip}
      tooltipProps={tooltipProps}
      {...attributes}
      {...rootProps}
    >
      <Flex>
        {closable && !isDragOverlay && (
          <CloseButton onClick={onCloseTab}>
            <Icon name="x" size="small" color={active ? "text" : "textLite"} />
          </CloseButton>
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
          data-testid="navigation-tab-drag-handle"
          sx={{
            opacity: hover || active || isDragOverlay ? 1 : 0,
            transition: "opacity 140ms ease-out",
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
          {...handleProps}
          {...listeners}
          cursor={sorting || dragging ? "grabbing" : "grab"}
        />
      )}
    </TabRoot>
  )
}

Tab.displayName = "Tab"

export default Tab
