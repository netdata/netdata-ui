import { useCallback, useRef } from "react"

const initialScrollWidth = -1
const initialClientWidth = -1

export default (parentRef, ref, target, callback, deps) => {
  const prevScrollWidthRef = useRef(initialScrollWidth)
  const prevClientWidthRef = useRef(initialClientWidth)

  return useCallback(() => {
    if (!ref.current || !target.current || !parentRef || !parentRef.current) return

    const width = document.body.clientWidth

    const draggableTabs = ref.current
    const draggableLeft = draggableTabs.getBoundingClientRect().left
    const container = parentRef.current
    const { right: containerRight, left: containerLeft } = container.getBoundingClientRect()

    const { right: tabRight, width: tabWidth } = target.current.getBoundingClientRect()

    if (
      prevScrollWidthRef.current === draggableTabs.scrollWidth &&
      prevClientWidthRef.current === width
    )
      return
    prevScrollWidthRef.current = draggableTabs.scrollWidth
    prevClientWidthRef.current = width

    const padRight = width - containerRight
    if (
      tabRight < width - padRight &&
      containerLeft + (draggableLeft - containerLeft) + (tabRight - draggableLeft) + padRight >
        width
    )
      return

    if (tabRight >= containerRight) return callback(true)
    if (tabRight + tabWidth < containerRight) return callback(false)
  }, deps)
}
