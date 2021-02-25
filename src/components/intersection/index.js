import React from "react"
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
  const [ref, visible] = useIntersection({ root, rootMargin, threshold })

  return (
    <Flex ref={ref} height={{ min: height }} width={width} {...rest}>
      {visible ? children() : fallback}
    </Flex>
  )
}

export default Intersection
