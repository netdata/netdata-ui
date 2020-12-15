import React, { memo, useMemo, useState, forwardRef } from "react"
import { useUpdateEffect } from "react-use"
import styled from "styled-components"
import useForwardRef from "src/hooks/use-forward-ref"
import Flex from "src/components/templates/flex"

const Animated = styled(Flex).attrs({
  column: true,
})`
  transition: ${({ duration }) => `max-height ${duration}ms ease-out, opacity ${duration}ms ease`};
  max-height: ${({ maxHeight }) => maxHeight};
`

const Collapsible = forwardRef(({ open = false, duration = 150, children, ...rest }, parentRef) => {
  duration = process.env.NODE_ENV === "test" ? 0 : duration

  const [height, setHeight] = useState(open ? "initial" : 0)
  const [animatedOpen, setAnimatedOpen] = useState(open)
  const [ref, setRef] = useForwardRef(parentRef)

  useUpdateEffect(() => {
    let nestedRequestId
    const requestId = requestAnimationFrame(() => {
      setHeight(!open ? `${ref.current.scrollHeight}px` : 0)
      nestedRequestId = requestAnimationFrame(() => {
        setHeight(open ? `${ref.current.scrollHeight}px` : 0)
      })
    })

    if (open) {
      setAnimatedOpen(true)
    }

    const timeoutId = setTimeout(
      () => (open ? setHeight("initial") : setAnimatedOpen(false)),
      duration
    )

    return () => {
      cancelAnimationFrame(requestId)
      cancelAnimationFrame(nestedRequestId)
      clearTimeout(timeoutId)
    }
  }, [open])

  const child = useMemo(
    () => animatedOpen && (typeof children === "function" ? children() : children),
    [animatedOpen, children]
  )

  return (
    <Animated
      open={open}
      maxHeight={height}
      duration={duration}
      ref={setRef}
      data-testid="collapsible"
      overflow={height === "initial" ? "visible" : "hidden"}
      {...rest}
    >
      {child}
    </Animated>
  )
})

export default memo(Collapsible)
