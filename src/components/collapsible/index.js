import React, { memo, useMemo, useState, forwardRef } from "react"
import styled from "styled-components"
import useUpdateEffect from "@/hooks/useUpdateEffect"
import useForwardRef from "@/hooks/useForwardRef"
import Flex from "@/components/templates/flex"

const measurementByDimension = {
  vertical: "height",
  horizontal: "width",
}

const Animated = styled(Flex).attrs(props => ({
  column: true,
  ...props,
}))`
  transition: ${({ duration, measurement }) => `max-${measurement} ${duration}ms ease-in-out`};
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
      overflow = "visible",
      ...rest
    },
    parentRef
  ) => {
    const measurement = measurementByDimension[direction] || measurementByDimension.vertical
    duration = process.env.NODE_ENV === "test" ? 0 : duration

    const [dimension, setDimension] = useState(open ? "initial" : `${closedValue}px`)
    const [animatedOpen, setAnimatedOpen] = useState(open)
    const [ref, setRef] = useForwardRef(parentRef)

    useUpdateEffect(() => {
      if (!ref.current) return

      setDimension(
        !open
          ? `${
              measurement === measurementByDimension.vertical
                ? ref.current.scrollHeight
                : ref.current.scrollHeight
            }px`
          : `${closedValue}px`
      )

      const requestId = requestAnimationFrame(() => {
        if (!ref.current) return

        setDimension(
          open
            ? `${
                measurement === measurementByDimension.vertical
                  ? ref.current.scrollHeight
                  : ref.current.scrollHeight
              }px`
            : `${closedValue}px`
        )
      })

      if (open) setAnimatedOpen(open)

      const timeoutId = setTimeout(() => {
        cancelAnimationFrame(requestId)
        if (open) {
          setDimension("initial")
          return
        }

        setDimension(`${closedValue}px`)
        setAnimatedOpen(false)
      }, duration)

      return () => {
        cancelAnimationFrame(requestId)
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
        measurement={measurement}
        duration={duration}
        ref={setRef}
        data-testid="collapsible"
        overflow={dimension === "initial" ? overflow : "hidden"}
        {...rest}
      >
        {child}
      </Animated>
    )
  }
)

export default memo(Collapsible)
