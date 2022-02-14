import { useEffect } from "react"
import isAncestor from "src/components/drops/mixins/isAncestor"

export default (dropRef, onClickOutside) => {
  useEffect(() => {
    if (!onClickOutside) return

    const onMousedown = event => {
      if (
        event.target !== dropRef.current &&
        !isAncestor(dropRef.current, event.target)
      ) {
        onClickOutside(event)
      }
    }

    document.addEventListener("mousedown", onMousedown)
    return () => document.removeEventListener("mousedown", onMousedown)
  }, [onClickOutside])
}
