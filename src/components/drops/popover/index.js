import React, { useCallback, Fragment, useRef, useEffect } from "react"
import Drop from "@/components/drops/drop"
import useForwardRef from "@/hooks/useForwardRef"
import useToggle from "@/hooks/useToggle"
import useClonedChildren from "@/components/drops/mixins/useClonedChildren"
import useDescribedId from "@/components/drops/mixins/useDescribedId"
import dropAlignMap from "@/components/drops/mixins/dropAlignMap"
import Container from "@/components/drops/container"

const noop = () => {}
const getContent = content => (typeof content === "function" ? content() : content)

const Popover = ({
  plain,
  open: initialOpen = false,
  align = "top",
  dropProps,
  content,
  animation,
  children,
  zIndex = 70,
  ref: parentRef,
  onHoverChange = noop,
  ...rest
}) => {
  const id = useDescribedId(rest["aria-describedby"])
  const [isOpen, , open, close] = useToggle(initialOpen)
  const dropHoverRef = useRef(false)
  const boxHoverRef = useRef(false)

  const closeDrop = useCallback(
    () => requestAnimationFrame(() => !dropHoverRef.current && !boxHoverRef.current && close()),
    []
  )

  const [ref, setRef] = useForwardRef(parentRef)

  const onTargetElementMouseOver = useCallback(() => {
    open()
    onHoverChange(true)
  }, [open, onHoverChange])

  const onTargetElementMouseLeave = useCallback(() => {
    closeDrop()
    onHoverChange(false)
  }, [closeDrop, onHoverChange])

  const targetElement = useClonedChildren(children, setRef, {
    isOpen,
    onMouseOver: onTargetElementMouseOver,
    onMouseLeave: onTargetElementMouseLeave,
    onFocus: open,
    onBlur: closeDrop,
    ...(isOpen && { "aria-describedby": id }),
    ...rest,
  })

  useEffect(() => {
    if (initialOpen) {
      open()
    } else {
      close()
    }
  }, [initialOpen, open, close])

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
          id={id}
          hideShadow
          {...dropProps}
          align={dropProps?.align || dropAlignMap[align]}
          animation={animation}
          onEsc={close}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          target={ref.current}
          zIndex={zIndex}
        >
          {plain ? (
            getContent(content)
          ) : (
            <Container align={align} background="tooltip" backgroundOpacity={0.9} padding={[2, 4]}>
              {getContent(content)}
            </Container>
          )}
        </Drop>
      )}
    </Fragment>
  )
}

export default Popover
