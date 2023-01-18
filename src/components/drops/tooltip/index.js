import React, { useRef, forwardRef, Fragment, useLayoutEffect } from "react"
import Drop from "src/components/drops/drop"
import useForwardRef from "src/hooks/use-forward-ref"
import useToggle from "src/hooks/use-toggle"
import useClonedChildren from "src/components/drops/mixins/useClonedChildren"
import useDescribedId from "src/components/drops/mixins/useDescribedId"
import dropAlignMap from "src/components/drops/mixins/dropAlignMap"
import Container from "src/components/drops/container"

const getContent = content => (typeof content === "function" ? content() : content)

const Tooltip = forwardRef(
  (
    {
      plain,
      open: initialOpen = false,
      align = "top",
      dropProps,
      content,
      animation,
      disabled,
      zIndex = 80,
      children,
      allowHoverOnTooltip,
      ...rest
    },
    parentRef
  ) => {
    const id = useDescribedId(rest["aria-describedby"])
    const [isOpen, , open, close] = useToggle(false)

    const [ref, setRef] = useForwardRef(parentRef)

    const targetElement = useClonedChildren(children, setRef, {
      onMouseEnter: open,
      onMouseLeave: !allowHoverOnTooltip
        ? close
        : () =>
            setTimeout(() => {
              if (onTooltipRef.current) return
              close()
            }, 300),
      onFocus: open,
      onBlur: close,
      ...(isOpen && { "aria-describedby": id }),
      ...rest,
    })

    const onTooltipRef = useRef(false)

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
            {plain ? (
              getContent(content)
            ) : (
              <Container align={align}>{getContent(content)}</Container>
            )}
          </Drop>
        )}
      </Fragment>
    )
  }
)

export default Tooltip
