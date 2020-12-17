import { useRef, useCallback } from "react"
import setRef from "src/mixins/set-ref"

export default ref => {
  const innerRef = useRef()

  const forwardRef = useCallback(node => {
    innerRef.current = node
    setRef(ref, node)
  }, [])

  return [innerRef, forwardRef]
}
