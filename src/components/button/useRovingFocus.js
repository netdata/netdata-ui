import { useCallback, useRef, useState } from "react"
import setRef from "@/mixins/set-ref"

import { navigationIndex } from "./listNavigation"

// Toolbar pattern: one tab stop for the whole group; arrows, Home and End move between items.
export const useRovingFocus = ({
  count,
  orientation = "horizontal",
  initialIndex = 0,
  activeIndex: selectedIndex,
  onNavigate,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(initialIndex)
  const nodes = useRef([])
  const activeIndex = selectedIndex ?? focusedIndex
  const setActiveIndex = useCallback(
    index => {
      if (selectedIndex === undefined) setFocusedIndex(index)
    },
    [selectedIndex]
  )
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
        const next = navigationIndex(event.key, index, count, { orientation, wrap: true })
        if (next === null || event.defaultPrevented) return
        event.preventDefault()
        setActiveIndex(next)
        onNavigate?.(next)
        nodes.current[next]?.focus()
      },
    }),
    [reachableIndex, count, orientation, setActiveIndex, onNavigate]
  )

  return { activeIndex: reachableIndex, setActiveIndex, getItemProps }
}

export default useRovingFocus
