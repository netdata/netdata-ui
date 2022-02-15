import { useEffect } from "react"
import isAncestor from "src/components/drops/mixins/isAncestor"

export default (dropRef, onClickOutside, target) => {
  useEffect(() => {
    if (!onClickOutside) return

    const onMousedown = event => {
      if (
        event.target !== dropRef.current &&
        // dont fire when clicking in drop
        !isAncestor(dropRef.current, event.target) &&
        // dont fire when clicking dropdown-button
        !isAncestor(target, event.target)
      ) {
        onClickOutside(event)
      }
    }

    document.addEventListener("mousedown", onMousedown)
    return () => document.removeEventListener("mousedown", onMousedown)
  }, [onClickOutside])
}
