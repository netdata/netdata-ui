import React, { useMemo, Fragment, forwardRef } from "react"
import Drop from "src/components/drops/drop"
import uuid from "src/mixins/uuid"
import useClonedChildren from "src/components/drops/mixins/useClonedChildren"
import useForwardRef from "src/components/drops/mixins/useForwardRef"
import useToggle from "src/hooks/use-toggle"
import Container from "./container"

const getContent = content => (typeof content === "function" ? content() : content)

const dropAlignMap = {
  top: { bottom: "top" },
  left: { right: "left" },
  right: { left: "right" },
  bottom: { top: "bottom" },
}

const Tooltip = forwardRef(
  (
    { plain, open: initialOpen = false, align = "top", dropProps, content, children, ...rest },
    parentRef
  ) => {
    const id = useMemo(() => rest["aria-describedby"] || uuid(), [])
    const [isOpen, , open, close] = useToggle(initialOpen)

    const [ref, setRef] = useForwardRef(parentRef)

    const targetElement = useClonedChildren(children, setRef, {
      onMouseOver: open,
      onMouseLeave: close,
      onFocus: open,
      onBlur: close,
      ...(isOpen && { "aria-describedby": id }),
      ...rest,
    })

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
