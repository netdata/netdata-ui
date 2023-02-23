import React, { useCallback, Fragment, forwardRef, useRef } from "react"
import Drop from "src/components/drops/drop"
import useForwardRef from "src/hooks/use-forward-ref"
import useToggle from "src/hooks/use-toggle"
import useClonedChildren from "src/components/drops/mixins/useClonedChildren"
import useDescribedId from "src/components/drops/mixins/useDescribedId"
import dropAlignMap from "src/components/drops/mixins/dropAlignMap"
import Container from "src/components/drops/container"

const getContent = content => (typeof content === "function" ? content() : content)

const Popover = forwardRef(
  (
    {
      align = "top",
      animation,
      children,
      content,
      dropProps,
      open: initialOpen = false,
      plain,
      zIndex = 70,
      ...rest
    },
    parentRef
  ) => {
    const id = useDescribedId(rest["aria-describedby"])
    const [isOpen, , open, close] = useToggle(initialOpen)
    const dropHoverRef = useRef(false)
    const boxHoverRef = useRef(false)

    const closeDrop = useCallback(
      () => requestAnimationFrame(() => !dropHoverRef.current && !boxHoverRef.current && close()),
      []
    )

    const [ref, setRef] = useForwardRef(parentRef)

    const targetElement = useClonedChildren(children, setRef, {
      isOpen,
      onMouseOver: open,
      onMouseLeave: closeDrop,
      onFocus: open,
      onBlur: closeDrop,
      ...(isOpen && { "aria-describedby": id }),
      ...rest,
    })

    const onMouseEnter = useCallback(() => {
      dropHoverRef.current = true
    }, [])

    const onMouseLeave = useCallback(() => {
      dropHoverRef.current = false
      closeDrop()
    }, [])

    return (
      <Fragment>
        {targetElement}
        {isOpen && ref.current && (
          <Drop
            align={dropProps?.align || dropAlignMap[align]}
            animation={animation}
            id={id}
            hideShadow
            onEsc={close}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            target={ref.current}
            zIndex={zIndex}
            {...dropProps}
          >
            {plain ? (
              getContent(content)
            ) : (
              <Container align={align} background={["transparent", "popover"]} padding={[2, 4]}>
                {getContent(content)}
              </Container>
            )}
          </Drop>
        )}
      </Fragment>
    )
  }
)

export default Popover
