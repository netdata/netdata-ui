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

    if (!content) {
      return children
    }

    useLayoutEffect(() => {
      hasPopUpHovered && clearTimeout(closeWithDelayTimeout.current)
    }, [hasPopUpHovered])

    return (
      <Fragment>
        {targetElement}
        {isOpen && ref.current && !disabled && (
          <Drop
            onMouseLeave={() => {
              setHasPopUpHovered(false)
              close()
            }}
            onMouseEnter={() => setHasPopUpHovered(true)}
            onClickOutside={close}
            target={ref.current}
            id={id}
            {...dropProps}
            align={dropProps?.align || dropAlignMap[align]}
            onEsc={close}
            animation={animation}
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
