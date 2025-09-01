import React, { useRef, Fragment, useLayoutEffect } from "react"
import Drop from "@/components/drops/drop"
import useForwardRef from "@/hooks/useForwardRef"
import useToggle from "@/hooks/useToggle"
import useClonedChildren from "@/components/drops/mixins/useClonedChildren"
import useDescribedId from "@/components/drops/mixins/useDescribedId"
import dropAlignMap from "@/components/drops/mixins/dropAlignMap"
import Container from "@/components/drops/container"

const getContent = content => (typeof content === "function" ? content() : content)

const Tooltip = ({
  plain,
  open: initialOpen = false,
  align = "top",
  dropProps,
  content,
  animation,
  disabled,
  zIndex = 80,
  delay = 0,
  children,
  allowHoverOnTooltip,
  ref: parentRef,
  ...rest
}) => {
  const id = useDescribedId(rest["aria-describedby"])
  const [isOpen, , open, close] = useToggle(false)
  const [ref, setRef] = useForwardRef(parentRef)
  const onAccessorRef = useRef(false)
  const onTooltipRef = useRef(false)

  const targetElement = useClonedChildren(children, setRef, {
    onMouseEnter: () => {
      onAccessorRef.current = true
      if (delay) {
        setTimeout(() => {
          if (onAccessorRef.current) {
            open()
          }
        }, delay)
      } else {
        open()
      }
    },
    onMouseLeave: !allowHoverOnTooltip
      ? () => {
          close()
          onAccessorRef.current = false
        }
      : () =>
          setTimeout(() => {
            if (onTooltipRef.current) return
            close()
            onAccessorRef.current = false
          }, 300),
    onFocus: open,
    onBlur: close,
    ...(isOpen && { "aria-describedby": id }),
    ...rest,
  })

  useLayoutEffect(() => {
    if (ref.current && initialOpen) open()
  }, [])

  if (!content) {
    return children
  }

  return (
    <Fragment>
      {targetElement}
      {isOpen && ref.current && !disabled && (
        <Drop
          noEvents={!allowHoverOnTooltip}
          align={dropProps?.align || dropAlignMap[align]}
          hideShadow
          id={id}
          onClickOutside={close}
          onMouseEnter={() => (onTooltipRef.current = true)}
          onMouseLeave={() => {
            onTooltipRef.current = false
            close()
          }}
          target={ref.current}
          {...dropProps}
          animation={animation}
          onEsc={close}
          zIndex={zIndex}
        >
          {plain ? getContent(content) : <Container align={align}>{getContent(content)}</Container>}
        </Drop>
      )}
    </Fragment>
  )
}

export default Tooltip
