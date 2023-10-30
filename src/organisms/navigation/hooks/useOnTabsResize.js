import { useCallback, useRef } from "react"

const initialRect = {
  width: -1,
  tabRight: -1,
}

const hasChanged = (prevValues, values) => {
  if (prevValues.width === initialRect.width) return true
  if (prevValues.width === values.width && prevValues.tabRight !== values.tabRight) return true
  return prevValues.width !== values.width
}

export default (parentRef, ref, target, callback, deps) => {
  const prevValuesRef = useRef(initialRect)

  return useCallback(() => {
    if (!ref.current || !target.current || !parentRef || !parentRef.current) return

    const width = document.body.clientWidth

    const draggableTabs = ref.current
    const draggableLeft = draggableTabs.getBoundingClientRect().left
    const container = parentRef.current
    const { right: containerRight, left: containerLeft } = container.getBoundingClientRect()

    if (!prevValuesRef.current.expandedStaticWidth) {
      prevValuesRef.current.expandedStaticWidth = draggableLeft - containerLeft
    }

    const { right: tabRight, width: tabWidth } = target.current.getBoundingClientRect()

    if (!hasChanged(prevValuesRef.current, { width, tabRight })) return

    const padRight = width - containerRight
    if (
      tabRight < width - padRight &&
      containerLeft +
        prevValuesRef.current.expandedStaticWidth +
        (tabRight - draggableLeft) +
        padRight >
        width
    )
      return

    prevValuesRef.current = {
      ...prevValuesRef.current,
      width,
      tabRight,
      containerRight,
    }

    if (tabRight >= containerRight && !prevValuesRef.current.collapse) {
      prevValuesRef.current.collapse = true
      return callback(true)
    }
    if (
      tabRight + tabWidth < containerRight &&
      (prevValuesRef.current.collapse || typeof prevValuesRef.current.collapse === "undefined")
    ) {
      prevValuesRef.current.collapse = false
      return callback(false)
    }
  }, deps)
}
