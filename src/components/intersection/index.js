import React, { useRef } from "react"
import { usePrevious } from "react-use"
import Flex from "src/components/templates/flex"
import useIntersection from "src/hooks/use-intersection"

const Intersection = ({
  height = "100%",
  width = "100%",
  fallback = null,
  root,
  rootMargin = "0px",
  threshold = 0,
  children,
  ...rest
}) => {
  const [setRef, ref, visible] = useIntersection({ root, rootMargin, threshold })
  const prevVisible = usePrevious(visible)
  const lastHeightRef = useRef(height)

  if (visible !== prevVisible && !visible && ref.current) {
    lastHeightRef.current = `${ref.current.clientHeight}px`
  }

  return (
    <Flex
      ref={setRef}
      width={width}
      {...(!visible && {height: { min: lastHeightRef.current }})}
      {...rest}
    >
      {visible ? children() : fallback}
    </Flex>
  )
}

export default Intersection
