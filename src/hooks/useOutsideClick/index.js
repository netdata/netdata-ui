import { useEffect } from "react"
import isAncestor from "@/components/drops/mixins/isAncestor"

export default (dropRef, onClickOutside, target, hasBackdrop, dataDrop = "") => {
  useEffect(() => {
    if (!onClickOutside || hasBackdrop) return

    const onMousedown = event => {
      if (
        event.target !== dropRef.current &&
        // dont fire when clicking in drop
        !isAncestor(dropRef.current, event.target) &&
        // dont fire when clicking dropdown-button
        !isAncestor(target, event.target) &&
        !event.target.closest(`[data-drop="${dataDrop}"]`)
      ) {
        onClickOutside(event)
      }
    }

    document.addEventListener("mousedown", onMousedown)
    return () => document.removeEventListener("mousedown", onMousedown)
  }, [onClickOutside])
}
