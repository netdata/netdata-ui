import React, { memo, useMemo, useState, forwardRef } from "react"
import useUpdateEffect from "react-use/lib/useUpdateEffect"
import styled from "styled-components"
import useForwardRef from "@/hooks/use-forward-ref"
import Flex from "@/components/templates/flex"

const measurementByDimension = {
  vertical: "height",
  horizontal: "width",
}

const Animated = styled(Flex).attrs(props => ({
  column: true,
  ...props,
}))`
  transition: ${({ duration, measurement }) =>
    `max-${measurement} ${duration}ms ease-out, opacity ${duration}ms ease`};
  ${({ measurement, maxDimension }) => `max-${measurement}: ${maxDimension}`};
`

const Collapsible = forwardRef(
  (
    {
      open = false,
      duration = 150,
      children,
      direction,
      persist = false,
      closedValue = 0,
      ...rest
    },
    parentRef
  ) => {
    duration = process.env.NODE_ENV === "test" ? 0 : duration

    const [dimension, setDimension] = useState(open ? "initial" : `${closedValue}px`)
    const [animatedOpen, setAnimatedOpen] = useState(open)
    const [ref, setRef] = useForwardRef(parentRef)

    useUpdateEffect(() => {
      let nestedRequestId
      const requestId = requestAnimationFrame(() => {
        if (!ref.current) return

        setDimension(!open ? `${ref.current.scrollHeight}px` : `${closedValue}px`)

        nestedRequestId = requestAnimationFrame(() => {
          if (!ref.current) return

          setDimension(open ? `${ref.current.scrollHeight}px` : `${closedValue}px`)
        })
      })

      if (open) {
        setAnimatedOpen(true)
      }

      const timeoutId = setTimeout(
        () => (open ? setDimension("initial") : setAnimatedOpen(false)),
        duration
      )

      return () => {
        cancelAnimationFrame(requestId)
        cancelAnimationFrame(nestedRequestId)
        clearTimeout(timeoutId)
      }
    }, [open])

    const child = useMemo(
      () =>
        (animatedOpen || persist) &&
        (typeof children === "function" ? children(animatedOpen) : children),
      [animatedOpen, persist, children]
    )

    return (
      <Animated
        open={open}
        maxDimension={dimension}
        measurement={measurementByDimension[direction] || measurementByDimension.vertical}
        duration={duration}
        ref={setRef}
        data-testid="collapsible"
        overflow={dimension === "initial" ? "visible" : "hidden"}
        {...rest}
      >
        {child}
      </Animated>
    )
  }
)

export default memo(Collapsible)
