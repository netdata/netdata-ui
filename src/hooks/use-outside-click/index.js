import { useEffect } from "react"
import getAncestors from "src/components/drops/mixins/getAncestors"

export default (targetRef, onClickOutside) =>
  useEffect(() => {
    if (!onClickOutside) return

    const onMousedown = event => {
      if (
        event.target !== targetRef.current &&
        !getAncestors(event.target).some(node => node === targetRef.current)
      ) {
        onClickOutside(event)
      }
    }

    document.addEventListener("mousedown", onMousedown)
    return () => document.removeEventListener("mousedown", onMousedown)
  }, [onClickOutside])
