import { useCallback, useRef, useState } from "react"
import setRef from "@/mixins/set-ref"

const keysByOrientation = {
  horizontal: { next: "ArrowRight", previous: "ArrowLeft" },
  vertical: { next: "ArrowDown", previous: "ArrowUp" },
}

const targetIndex = (key, index, count, keys) => {
  if (key === keys.next) return (index + 1) % count
  if (key === keys.previous) return (index - 1 + count) % count
  if (key === "Home") return 0
  if (key === "End") return count - 1
  return null
}

// Toolbar pattern: one tab stop for the whole group; arrows, Home and End move between items.
export const useRovingFocus = ({ count, orientation = "horizontal", initialIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const nodes = useRef([])
  const keys = keysByOrientation[orientation] || keysByOrientation.horizontal
  const reachableIndex = count > 0 ? Math.min(Math.max(activeIndex, 0), count - 1) : activeIndex

  const getItemProps = useCallback(
    (index, { onKeyDown, onFocus, ref } = {}) => ({
      tabIndex: index === reachableIndex ? 0 : -1,
      ref: node => {
        nodes.current[index] = node
        setRef(ref, node)
      },
      onFocus: event => {
        setActiveIndex(index)
        onFocus?.(event)
      },
      onKeyDown: event => {
        onKeyDown?.(event)
        const next = targetIndex(event.key, index, count, keys)
        if (next === null || event.defaultPrevented) return
        event.preventDefault()
        setActiveIndex(next)
        nodes.current[next]?.focus()
      },
    }),
    [reachableIndex, count, keys]
  )

  return { activeIndex: reachableIndex, setActiveIndex, getItemProps }
}

export default useRovingFocus
