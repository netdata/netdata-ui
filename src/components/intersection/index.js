import React, { forwardRef, useRef } from "react"
import usePrevious from "@/hooks/usePrevious"
import Flex from "@/components/templates/flex"
import useIntersection from "@/hooks/useIntersection"
import setParentRef from "@/mixins/set-ref"

const getContent = value => (typeof value === "function" ? value() : value)

const Intersection = forwardRef(
  (
    {
      height = "100%",
      width = "100%",
      fallback = null,
      root,
      rootMargin = "0px",
      threshold = 0,
      onVisibility,
      children,
      ...rest
    },
    parentRef
  ) => {
    const [setRef, ref, visible] = useIntersection({ root, rootMargin, threshold, onVisibility })
    const prevVisible = usePrevious(visible)
    const lastHeightRef = useRef(height)

    if (visible !== prevVisible && !visible && ref.current) {
      lastHeightRef.current = `${ref.current.clientHeight}px`
    }

    return (
      <Flex
        ref={element => {
          setRef(element)
          setParentRef(parentRef, element)
        }}
        width={width}
        {...{ height: visible ? height : { min: lastHeightRef.current } }}
        {...rest}
      >
        {getContent(visible ? children : fallback)}
      </Flex>
    )
  }
)

export default Intersection
