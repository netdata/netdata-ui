import React, { forwardRef, Fragment, useLayoutEffect, useState, useRef } from "react"
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
      onClickOutside,
      allowHoverOnTooltip,
      ...rest
    },
    parentRef
  ) => {
    const id = useDescribedId(rest["aria-describedby"])
    const [isOpen, , open, close] = useToggle(false)
    const [hasPopUpHovered, setHasPopUpHovered] = useState(false)
    const closeWithDelayTimeout = useRef()

    const [ref, setRef] = useForwardRef(parentRef)

    const handleCloseWithDelay = () => {
      closeWithDelayTimeout.current = setTimeout(() => {
        close()
      }, 200)
    }

    const targetElement = useClonedChildren(children, setRef, {
      onMouseEnter: open,
      onMouseLeave: allowHoverOnTooltip ? handleCloseWithDelay : close,
      onFocus: open,
      onBlur: close,
      ...(isOpen && { "aria-describedby": id }),
      ...rest,
    })

    useLayoutEffect(() => {
      if (ref.current && initialOpen) open()
    }, [])

    useLayoutEffect(() => {
      if (hasPopUpHovered && closeWithDelayTimeout.current) {
        clearTimeout(closeWithDelayTimeout.current)
      }
    }, [hasPopUpHovered])

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
            onMouseLeave={() => {
              setHasPopUpHovered(false)
              close()
            }}
            onMouseEnter={() => setHasPopUpHovered(true)}
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
