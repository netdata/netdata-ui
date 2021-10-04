import React, { Fragment, forwardRef, useLayoutEffect } from "react"
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
      zIndex = 80,      children,
      ...rest
    },
    parentRef
  ) => {
    const id = useDescribedId(rest["aria-describedby"])
    const [isOpen, , open, close] = useToggle(false)

    const [ref, setRef] = useForwardRef(parentRef)

    const targetElement = useClonedChildren(children, setRef, {
      onMouseEnter: open,
      onMouseLeave: close,
      onFocus: open,
      onBlur: close,
      ...(isOpen && { "aria-describedby": id }),
      ...rest,
    })

    useLayoutEffect(() => {
      if (ref.current && initialOpen) open()
    }, [])

    return (
      <Fragment>
        {targetElement}
        {isOpen && ref.current && (
          <Drop
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
