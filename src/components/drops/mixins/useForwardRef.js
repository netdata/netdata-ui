import { useRef, useCallback } from "react"
import setRef from "./setRef"

export default ref => {
  const innerRef = useRef(null)

  const forwardRef = useCallback(node => {
    innerRef.current = node
    setRef(ref, node)
  }, [])

  return [innerRef, forwardRef]
}
